<?php

namespace AppBundle\Controller;


use AppBundle\Entity\Content;
use AppBundle\Entity\ContentFilter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\ContentService;
use Symfony\Component\HttpFoundation\JsonResponse;

class BuyController extends Controller
{

    /**
     * @Route("/buy", name="buy")
     */
    public function buyAction(Request $request)
    {

        $user = $this->getUser();
        $contents =  $this->getDoctrine()->getRepository('AppBundle:Content')->findBy(['draft'=>false], ['createdAt' => 'DESC']);
        $territories = $this->getDoctrine()->getRepository('AppBundle:Territory')->findAll();
        $countries = $this->getDoctrine()->getRepository('AppBundle:Country')->findAll();
        $rights = $this->getDoctrine()->getRepository('AppBundle:RightsPackage')->findAll();

        if($request->isMethod('GET') && $request->query->get('inputSearch')){
            $contents = $this->getDoctrine()
                ->getRepository(Content::class)
                ->getSearchContent($request->query->get('inputSearch'),null);
        }elseif($request->isMethod('POST')){
           if(!empty($request->request->get('save-result')) && !empty($request->request->get('search-name'))){
               $contentFilter = new ContentFilter();
               $this->getDoctrine()->getRepository(ContentFilter::class)
                   ->saveNewFilter(
                       $contentFilter,
                       $request->request->get('save-result'),
                       $request->request->get('search-name'),
                       $user->getId()
                        );

                return $this->redirect('buy');
           }elseif(!empty($request->request->get('searchList'))){

               $filters = json_decode($request->request->get('searchList'));
               $contents = $this->getDoctrine()
                   ->getRepository(Content::class)
                   ->getSearchContent(null,$filters);
           }

        }
        $searchList = $this->getDoctrine()->getRepository('AppBundle:ContentFilter')->findBy(['user'=>$user]);
        $paginator  = $this->get('knp_paginator');
        $contents = $paginator->paginate($contents,$request->query->getInt('page',1),10);

        return $this->render('buy/buy.html.twig', [
            'user' => $user,
            'contents' => $contents,
            'territories' => $territories,
            'countries' =>  $countries,
            'rights'=>$rights,
            'lists'=>$searchList,
            'showMoreInfo' => true
        ]);

    }

    /**
     * @Route("/buy/search", name="buySearch")
     */
    public function buySearchAction(Request $request, ContentService $contentService)
    {
        $user = $this->getUser();
        $contents = $contentService->getContent($request);
        $paginator  = $this->get('knp_paginator');
        $contents = $paginator->paginate($contents,$request->query->getInt('page',1),10);

        return $this->render('@App/content/contentItemList.html.twig', [
            'contents' => $contents,
            'user' => $user,
            'showMoreInfo' => true
        ]);

    }

    /**
     * @Route("/buy/filter/save", name="buyFilterSave")
     */
    public function buyFilterSaveAction(Request $request, ContentService $contentService)
    {
        $user = $this->getUser();
        $filter=  $contentService->saveFilter($request, $user);

        return new JsonResponse(array("success"=>true));

    }


}
<?php

namespace AppBundle\Controller;

use AppBundle\Service\BidService;
use AppBundle\Service\ContentService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;


class ContentController extends Controller
{


    /**
     * @Route("/content/place_bid", name="contentPlaceBid")
     */
    public function contentPlaceBid(Request $request, BidService $bidService)
    {
        if (!empty(json_decode($request->request->get('content-data')))) {

            $user = $this->getUser();

            /**
             * saving data into Bid entity by using bidService class
             */

            if($bidService->saveBidsData($request,$user)){
                $this->addFlash('success', 'Data was saved successfully');
            }

            return $this->redirectToRoute('showContent', ['customId' => $request->request->get('custom-id')]);
        }
        return $this->redirectToRoute('showContent', ['customId' => $request->request->get('custom-id')]);

    }

    /**
     * @Route("/content/{customId}", name="showContent")
     */
    public function show(Request $request)
    {

        $user = $this->getUser();
        $content = $this->getDoctrine()->getRepository('AppBundle:Content')->findOneBy(['customId' => $request->get("customId")]);
        $buyPackages = $this->getDoctrine()->getRepository('AppBundle:Content')->getBuyPackages($content->getSalesPackages());
        $countries = $this->getDoctrine()
            ->getRepository('AppBundle:Content')
            ->getTerritoryInfo($request->get("customId"));

        return $this->render('content/content.html.twig', [
            'user' => $user,
            'content' => $content,
            'countries' => $countries,
            'custom_id' => $request->get("customId"),
            'buyPackages' => $buyPackages,
        ]);
    }

    /**
     * @Route("/content/details/", name="getContentDetails")
     */

    public function getContentDetails(Request $request){

        //get info by requested custom_id
        $content = $this->getDoctrine()->getRepository('AppBundle:Content')->findOneBy(['id'=>$request->request->get('id')]);
        $user = $this->getUser();
        $countries = $this->getDoctrine()
            ->getRepository('AppBundle:Content')
            ->getTerritoryInfo($content->getCustomId());
        $buyPackages = $this->getDoctrine()->getRepository('AppBundle:Content')->getBuyPackages($content->getSalesPackages());

        return $this->render('@App/content/contentDetails.html.twig', [
            'content' => $content,
            'user'=>$user,
            'countries'=>$countries,
            'buyPackages'=>$buyPackages,
        ]);
    }

    /**
     * @Route("/content/draft/save", name="saveContentAsDraft")
     * @param Request $request
     * @param ContentService $contentService
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function saveContentAsDraft(Request $request, ContentService $contentService  )
    {
        $user = $this->getUser();
        $content = $contentService->saveContentAsDraft($user, $request);
        return new JsonResponse(array("success"=>true, "contentId"=> $content->getId(), "customId" => $content->getCustomId()));
    }


    /**
     * @Route("/content/pending-listings/", name="pendingListings")
     */
    public function pendingListingsAction(Request $request){
        //get info by requested custom_id
        $content = $this->getDoctrine()->getRepository('AppBundle:Bid')->findBy(['content'=>$request->request->get('id')]);
        $user = $this->getUser();

        return $this->render('@App/sell/sell.pending.fees.html.twig', [
            'bids' => $content,
            'user'=>$user
        ]);
    }

}
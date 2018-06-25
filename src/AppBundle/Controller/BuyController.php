<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Content;
use AppBundle\Entity\ContentFilter;
use AppBundle\Service\SportRadarService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\ContentService;
use Symfony\Component\HttpFoundation\JsonResponse;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;


class BuyController extends Controller
{

    /**
     * @Route("/buy", name="buy")
     */
    public function buyAction(Request $request)
    {

        $user = $this->getUser();
        $rights = $this->getDoctrine()->getRepository('AppBundle:RightsPackage')->findAll();
        /**
         * Strategy to keep camel case on property names
         */
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();

        return $this->render('buy/buy.html.twig', [
            'user' => $user,
            'rights' => $serializer->serialize($rights, 'json',SerializationContext::create()->enableMaxDepthChecks())
        ]);

    }

    /**
     * @Route("/marketplace/listing/{customId}", name="marketplaceListing")
     */
    public function marketplaceListingAction(Request $request)
    {

        $user = $this->getUser();
        $rights = $this->getDoctrine()->getRepository('AppBundle:RightsPackage')->findAll();
        /**
         * Strategy to keep camel case on property names
         */
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();

        return $this->render('@App/marketplace/content.listing.html.twig', [
            'user' => $user,
            'customId' => $request->get('customId'),
            'rights' => $serializer->serialize($rights, 'json',SerializationContext::create()->enableMaxDepthChecks())
        ]);

    }

    /**
     * @Route("/buy/search", name="buySearch")
     */
    public function buySearchAction(Request $request, ContentService $contentService, SportRadarService $sportRadarService)
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
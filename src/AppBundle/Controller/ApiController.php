<?php

namespace AppBundle\Controller;

use AppBundle\Service\ContentService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Service\BidService;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;

class ApiController extends BaseController
{

    /**
     * @Route("/api/listing/save", name="saveListingAsInactive")
     * @param Request $request
     * @param ContentService $contentService
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function saveListingAsInactive(Request $request, ContentService $contentService  )
    {
        $user = $this->getUser();
        $content = $contentService->saveContentAsInactive($user, $request);
        return new JsonResponse(array("success"=>true, "contentId"=> $content->getId(), "customId" => $content->getCustomId()));
    }

    /**
     * @Route("/api/listing/publish", name="saveContentAsActive")
     * @param Request $request
     * @param ContentService $contentService
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function saveContentAsActive(Request $request, ContentService $contentService  )
    {
        $user = $this->getUser();
        $content = $contentService->saveContentAsActive($user, $request);
        return new JsonResponse(array("success"=>true, "contentId"=> $content->getId(), "customId" => $content->getCustomId()));
    }

    /**
     * @Route("/api/listings/watchlist", name="apiListingsWatchlist")
     */
    public function apiListingsWatchlist(Request $request){

        $user = $this->getUser();
        $watchlists = $this->getDoctrine()->getRepository('AppBundle:Watchlist')->findBy(['user'=>$user]);


        $contents = [];

        foreach ($watchlists as $watchlist){
            $contents[] = $watchlist->getContent();
        }


        $paginator  = $this->get('knp_paginator');
        $contents = $paginator->paginate($contents,$request->query->getInt('page',1),50);

        /**
         * Strategy to keep camel case on property names
         */
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($contents->getItems(), 'json',SerializationContext::create()->setGroups(array('listing')));

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;


    }

    /**
     * @Route("/api/listings/remove", name="apiListingsRemove")
     */
    public function apiListingsRemove(Request $request, ContentService $contentService){

        $response = $contentService->removeListing($request->get('customId'));
        return new JsonResponse(array("success"=>$response));
    }

    /**
     * @Route("/listings/marketplace", name="marketplaceListings")
     */
    public function marketplaceListings(Request $request, ContentService $contentService)
    {
        $contents = $contentService->getContent($request);
        $paginate = $this->get('knp_paginator');
        $contents = $paginate->paginate($contents,$request->query->getInt('page',1),50);
        $context = SerializationContext::create()->setGroups(array('listing'));

        $data = $this->serialize($contents->getItems(),$context);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/listings/draft", name="listingsDrafts")
     */
    public function listingsDrafts(Request $request, ContentService $contentService)
    {
        $user = $this->getUser();
        $listings = $contentService->getDrafts($user);
        $context = SerializationContext::create()->setGroups(array('board'));

        $data = $this->serialize($listings,$context);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/listings/inactive", name="listingsInactive")
     */
    public function listingsInactive(Request $request, ContentService $contentService)
    {
        $user = $this->getUser();
        $listings = $contentService->getInactive($user);
        $context = SerializationContext::create()->setGroups(array('board'));

        $data = $this->serialize($listings,$context);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/listings/active", name="listingsActive")
     */
    public function listingsActive(Request $request, ContentService $contentService, BidService $bidService)
    {
        $user = $this->getUser();
        $listings = $contentService->getActive($user);

        foreach ( $listings as $listing ) {
            $bids = $bidService->getPendingBidsByContent($listing);

            if ( $bids != null ) $listing->setEditable(false);
        }


        $context = SerializationContext::create()->setGroups(array('board'));

        $data = $this->serialize($listings,$context);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/listings/expired", name="listingsExpired")
     */
    public function listingsExpired(Request $request, ContentService $contentService)
    {
        $user = $this->getUser();
        $listings = $contentService->getExpired($user);
        $context = SerializationContext::create()->setGroups(array('board'));

        $data = $this->serialize($listings,$context);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/listings/duplicate", name="apiListingsDuplicate")
     */
    public function apiListingsDuplicate(Request $request, ContentService $contentService){

        $user = $this->getUser();
        $listing = $contentService->duplicateListing($request->get('customId'), $user);
        $context = SerializationContext::create()->setGroups(array('board'));
        $data = array('success'=>true, 'listing' => $listing);
        $serialized = $this->serialize($data,$context);
        $response = new Response($serialized);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/listings/deactivate", name="apiListingsDeactivate")
     */
    public function apiListingsDeactivate(Request $request, ContentService $contentService){

        $user = $this->getUser();
        $listing = $contentService->deactivateListing($request->get('customId'), $user);
        $context = SerializationContext::create()->setGroups(array('board'));
        $data = array('success'=>true, 'listing' => $listing);
        $serialized = $this->serialize($data,$context);
        $response = new Response($serialized);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/bid/place", name="apiPlaceBid")
     */
    public function contentPlaceBid(Request $request, BidService $bidService)
    {
        $user = $this->getUser();
        $success = $bidService->saveBidsData($request,$user);
        return new JsonResponse(array("success"=>$success));
    }

    /**
     * @Route("/api/bid/closed", name="apiClosedBids")
     */
    public function apiClosedBids(Request $request)
    {
        $user = $this->getUser();
        $bids = $this->getDoctrine()->getRepository('AppBundle:Bid')->getClosedBids($user);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($bids, 'json',SerializationContext::create()->setGroups(array('closed')));

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/bid/pending", name="apiPendingBids")
     */
    public function apiPendingBids(Request $request)
    {
        $user = $this->getUser();
        $bids = $this->getDoctrine()->getRepository('AppBundle:Bid')->getPendingBids($user);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($bids, 'json',SerializationContext::create()->setGroups(array('closed', 'listing')));

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/bid/rejected", name="apiRejectedBids")
     */
    public function apiRejectedBids(Request $request)
    {
        $user = $this->getUser();
        $bids = $this->getDoctrine()->getRepository('AppBundle:Bid')->getRejectedBids($user);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($bids, 'json',SerializationContext::create()->setGroups(array('closed', 'listing')));

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

}
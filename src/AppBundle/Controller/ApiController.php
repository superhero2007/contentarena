<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Content;
use AppBundle\Entity\SalesPackage;
use AppBundle\Service\ContentService;
use AppBundle\Service\MessageService;
use AppBundle\Service\UserService;
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
     * @param Request $request
     * @param BidService $bidService
     * @param ContentService $contentService
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function contentPlaceBid(Request $request, BidService $bidService, ContentService $contentService)
    {
        $user = $this->getUser();
        $success = $bidService->saveBidsData($request,$user);
        $soldOut = false;

        if ($success){
            $soldOut = $contentService->checkIfSoldOut($request);
        }

        return new JsonResponse(array("success"=>$success, "soldOut"=>$soldOut));
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

    /**
     * @Route("/api/bid/all", name="apiBids")
     */
    public function apiBids(Request $request, BidService $bidService, ContentService $contentService)
    {
        $user = $this->getUser();

        $listings = $contentService->getActiveAndExpired($user);

        foreach ( $listings as $listing ){

            /* @var $listing Content */
            foreach ($listing->getSalesPackages() as $salesBundle){

                /* @var $salesBundle SalesPackage */
                $salesBundle->setBids($bidService->getAllBidsBySalesBundle($salesBundle));
            }
        }

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($listings, 'json',SerializationContext::create()->setGroups(array('commercial')));

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/bid/accept", name="acceptBids")
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function acceptBids(Request $request, BidService $bidService, ContentService $contentService)
    {
        $user = $this->getUser();

        $success = $bidService->acceptBid($request);
        $soldOut = false;

        if ($success){
            $soldOut = $contentService->checkIfSoldOut($request);
        }

        return new JsonResponse(array("success"=>$success, "soldOut"=>$soldOut));

    }

    /**
     * @Route("/api/bid/reject", name="rejectBid")
     */
    public function rejectBid(Request $request, BidService $bidService)
    {
        $user = $this->getUser();

        $bundle = $bidService->rejectBid($request);

        return new JsonResponse(array("success"=>true, "salesBundle" => $bundle));

    }

    /**
     * @Route("/api/bid/remove", name="removeBid")
     */
    public function removeBid(Request $request, BidService $bidService)
    {
        $user = $this->getUser();

        $success = $bidService->removeBid($request, $user);

        return new JsonResponse(array("success"=>$success));

    }

    /**
     * @Route("/api/messages/threads", name="getThreads")
     */
    public function getThreads(Request $request, MessageService $messageService)
    {
        $user = $this->getUser();

        $threads = $messageService->getAllThreads($request, $user);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($threads, 'json',SerializationContext::create());
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/messages/thread", name="getThread")
     */
    public function getThread(Request $request, MessageService $messageService)
    {
        $threads = $messageService->getThread($request);
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($threads, 'json',SerializationContext::create());
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/messages/send", name="sendMessage")
     */
    public function sendMessage(Request $request, MessageService $messageService)
    {
        $user = $this->getUser();

        $message = $messageService->sendMessage($request, $user);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($message, 'json',SerializationContext::create());
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/user/info", name="getUserInfo")
     */
    public function getUserInfo(Request $request)
    {
        $user = $this->getUser();
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($user, 'json',SerializationContext::create()->setGroups(array('settings')));
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/company/users", name="getCompanyUsers")
     */
    public function getCompanyUsers(Request $request)
    {
        $user = $this->getUser();
        $users = $user->getCompany()->getUsers();

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($users, 'json',SerializationContext::create()->setGroups(array('settings')));
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/user/update", name="updateUser")
     */
    public function updateUser(Request $request, UserService $userService)
    {
        $user = $this->getUser();
        $userData = $request->get("user");

        if ($userData['id'] !== $user->getId()) return false;

        $user = $userService->updateUser($userData);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($user, 'json',SerializationContext::create()->setGroups(array('settings')));
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/user/password", name="updatePassword")
     */
    public function updatePassword(Request $request, UserService $userService)
    {
        $user = $this->getUser();

        if ($request->get("id") !== $user->getId()) return false;

        $user = $userService->updatePassword($request);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($user, 'json',SerializationContext::create()->setGroups(array('settings')));
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/company/update", name="updateCompany")
     */
    public function updateCompany(Request $request, UserService $userService)
    {
        $user = $this->getUser();

        $company = $userService->updateCompany($request->get("company"), $user);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($company, 'json',SerializationContext::create()->setGroups(array('settings')));
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

}
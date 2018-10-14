<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Bid;
use AppBundle\Entity\Content;
use AppBundle\Entity\LicenseAgreement;
use AppBundle\Entity\SalesPackage;
use AppBundle\Service\ContentService;
use AppBundle\Service\EmailService;
use AppBundle\Service\MessageService;
use AppBundle\Service\NotificationService;
use AppBundle\Service\UserService;
use PDFMerger;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Service\BidService;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;
use AppBundle\Service\WatchlistService;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

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
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        return new JsonResponse(array(
            "success"=>true,
            "contentId"=> $content->getId(),
            "customId" => $content->getCustomId(),
            "status" => $content->getStatus()->getName(),
            "salesPackages" => ($content->getSalesPackages() != null) ? $serializer->toArray($content->getSalesPackages()) : array()
        ));
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
     * @Route("/api/listing/republish", name="republishListing")
     * @param Request $request
     * @param ContentService $contentService
     * @return Response
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function republishListing(Request $request, ContentService $contentService  )
    {
        $user = $this->getUser();
        $listing = $contentService->republishListing($user, $request->get('customId'));
        $context = SerializationContext::create()->setGroups(array('board'));
        $data = array('success'=>true, 'listing' => $listing);
        $serialized = $this->serialize($data,$context);
        $response = new Response($serialized);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/api/listings/watchlist", name="apiListingsWatchlist")
     */
    public function apiListingsWatchlist(Request $request){

        $user = $this->getUser();
        $watchlists = $this->getDoctrine()->getRepository('AppBundle:Watchlist')->findBy(['company'=>$user->getCompany()], array('id' => 'DESC'));

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
            /* @var Content $listing*/
            $bids = $bidService->getAllBidsByContent($listing);
            $pendingBid = $bidService->getPendingBidsByContent($listing);

            if ( $pendingBid != null ) $listing->setHasPendingBids(true);
            if ( $bids != null ) $listing->setHasActivity(true);
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
    public function listingsExpired(Request $request, ContentService $contentService, BidService $bidService)
    {
        $user = $this->getUser();
        $listings = $contentService->getExpired($user);
        $context = SerializationContext::create()->setGroups(array('board'));

        foreach ( $listings as $listing ) {
            /* @var Content $listing*/
            $bids = $bidService->getAllBidsByContent($listing);

            if ( $bids != null ) $listing->setHasActivity(true);
        }

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
     * @Route("/api/listings/archive", name="apiListingsArchive")
     */
    public function apiListingsArchive(Request $request, ContentService $contentService){

        $user = $this->getUser();
        $listing = $contentService->archiveListing($request->get('customId'), $user);
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
     * @param EmailService $emailService
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     * @throws \exception
     */
    public function contentPlaceBid(Request $request, BidService $bidService, ContentService $contentService, EmailService $emailService)
    {
        $user = $this->getUser();
        $bid = $bidService->saveBidsData($request,$user);
        $content = $bid->getContent();
        $soldOut = false;
        $success = false;
        if ($bid != null){
            $soldOut = $contentService->checkIfSoldOut($request);
            $success = true;
            if ($bid->getStatus()->getName() == 'APPROVED'){
                $license_service = $this->get('license_service');
                $viewElements = array(
                    'user' => $user,
                    'bid' => $bid,
                    'watermark' => false,
                    'bundle' => $bid->getSalesPackage(),
                    'content' => $content,
                    'rightDefinitions' => $license_service->getRightDefinitions($content),
                    'exclusiveRights' => $license_service->getExclusiveRights($content),
                    'hostUrl' => $this->container->getParameter("carena_host_url")
                );

                $this->mergeAndSave($content, $viewElements);
                $emailService->dealClosed($content, $bid);
                $emailService->closedDealBuyer($content, $bid);
            } else {
                $emailService->bidReceived($content, $bid);
                $emailService->bidPlaced($content, $bid);
            }

            if ($soldOut) $emailService->soldOut($content);
        }



        return new JsonResponse(array("success"=>$success, "soldOut"=>$soldOut));
    }

    /**
     * @param $content
     * @param $viewElements
     * @throws \exception
     */
    public function mergeAndSave($content, $viewElements ){

        /* @var Content $content  */
        /* @var Bid $bid  */

        // Create an instance of PDFMerger
        $pdf = new PDFMerger();
        $bid = $viewElements["bid"];

        if ( isset($bid)){
            $license = $this->getDoctrine()
                ->getRepository('AppBundle:LicenseAgreement')
                ->findOneBy([
                    'bid' => $viewElements["bid"],
                    'company' => $bid->getBuyerUser()->getCompany(),
                ]);
        }

        if ( isset($license) && $license != null ){
            return;
        }

        $time = new \DateTime();
        $html = $this->renderView('contract/layout.html.twig', $viewElements);
        $htmlGeneralTerms = $this->renderView('contract/la-general-terms-base.html.twig', $viewElements);

        $this->get('knp_snappy.pdf')->generateFromHtml(
            $htmlGeneralTerms,
            $this->container->getParameter("uploads_main_folder") . "/general-terms.pdf",
            array(),
            true
        );

        $fileName = 'License_Agreement_' . $content->getCompany()->getDisplayName(). '_' . $time->getTimestamp()  . '.pdf';

        $this->get('knp_snappy.pdf')->generateFromHtml(
            $html,
            $this->container->getParameter("uploads_main_folder") . "/" . $fileName
        );

        // Add 2 PDFs to the final PDF
        $pdf->addPDF($this->container->getParameter("uploads_main_folder") . "/" . $fileName, 'all');

        if ( $content->getAnnex() != null ){
            foreach ($content->getAnnex() as $annex){
                $pdf->addPDF($this->container->getParameter("main_folder") . "/" . $annex->file, 'all');
            }
        }

        $pdf->addPDF($this->container->getParameter("uploads_main_folder") . "/general-terms.pdf", 'all');

        $pathForTheMergedPdf = $this->container->getParameter("uploads_main_folder") . "/" . $fileName;
        $pdf->merge('file', $pathForTheMergedPdf);

        if ( isset($bid)){
            $license = new LicenseAgreement();
            $license->setCompany($bid->getBuyerUser()->getCompany());
            $license->setBid($bid);
            $license->setFile($pathForTheMergedPdf);
            $this->getDoctrine()->getManager()->persist($license);
            $this->getDoctrine()->getManager()->flush();
        }
    }

    /**
     * @Route("/api/bid/closed", name="apiClosedBids")
     */
    public function apiClosedBids(Request $request)
    {
        $user = $this->getUser();
        $company = $user->getCompany();
        $bids = $this->getDoctrine()->getRepository('AppBundle:Bid')->getClosedBids($company);

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
        $company = $user->getCompany();
        $bids = $this->getDoctrine()->getRepository('AppBundle:Bid')->getPendingBids($company);

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
        $company = $user->getCompany();
        $bids = $this->getDoctrine()->getRepository('AppBundle:Bid')->getRejectedBids($company);

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

        $listings = $contentService->getForCommercialActivity($user);

        foreach ( $listings as $key => $listing ){

            $totalBids = 0;

            /* @var $listing Content */
            foreach ($listing->getSalesPackages() as $salesBundle){

                $bids = ($listing->getStatus()->getName() == "EXPIRED") ?
                    $bidService->getClosedDealsBySalesBundle($salesBundle) :
                    $bidService->getAllBidsBySalesBundle($salesBundle);
                $totalBids += count( $bids );

                /* @var $salesBundle SalesPackage */
                $salesBundle->setBids($bids);
            }

            if ( $totalBids == 0 && $listing->getStatus()->getName() == "EXPIRED" ) unset($listings[$key]);
        }

        $listings = array_values($listings);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($listings, 'json',SerializationContext::create()->setGroups(array('commercial')));

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/bid/accept", name="acceptBids")
     * @param Request $request
     * @param BidService $bidService
     * @param ContentService $contentService
     * @param EmailService $emailService
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function acceptBids(Request $request, BidService $bidService, ContentService $contentService, EmailService $emailService)
    {
        $user = $this->getUser();

        $bid = $bidService->acceptBid($request);
        $content = $bid->getContent();
        $soldOut = false;
        $success = false;

        if ($bid != null){
            $soldOut = $contentService->checkIfSoldOut($request);
            $success = true;
            $license_service = $this->get('license_service');
            $viewElements = array(
                'user' => $user,
                'bid' => $bid,
                'watermark' => false,
                'bundle' => $bid->getSalesPackage(),
                'content' => $content,
                'rightDefinitions' => $license_service->getRightDefinitions($content),
                'exclusiveRights' => $license_service->getExclusiveRights($content),
                'hostUrl' => $this->container->getParameter("carena_host_url")
            );

            try {
                $this->mergeAndSave($content, $viewElements);
                $emailService->bidAccepted($content, $bid);
                if ($soldOut) $emailService->soldOut($content);
            }
            catch (\Exception $exception){

            }



        }

        return new JsonResponse(array("success"=>$success, "soldOut"=>$soldOut));

    }

    /**
     * @Route("/api/bid/reject", name="rejectBid")
     * @param Request $request
     * @param BidService $bidService
     * @param EmailService $emailService
     * @return JsonResponse
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function rejectBid(Request $request, BidService $bidService, EmailService $emailService)
    {
        $user = $this->getUser();

        $bid= $bidService->rejectBid($request, $user);
        $listing = $bid->getContent();
        $bundle = $bid->getSalesPackage();
        $emailService->bidDeclined($listing, $bid);

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
        $data = $serializer->serialize($threads, 'json',SerializationContext::create()->setGroups(array('messages')));
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
     * @Route("/api/user/code", name="getUserInfoByActivationCode")
     */
    public function getUserInfoByActivationCode(Request $request, UserService $userService)
    {
        $user = $userService->getUserByActivationCode($request->get("activationCode"));
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
     * @Route("/api/user/activate", name="activateUser")
     */
    public function activateUser(Request $request, UserService $userService)
    {
        $user = $userService->activateUser($request);

        $token = new UsernamePasswordToken($user, $user->getPassword(), "main", $user->getRoles());

        // For older versions of Symfony, use security.context here
        $this->get("security.token_storage")->setToken($token);
        $this->get('session')->set('_security_main',serialize($token));

        // Fire the login event
        // Logging the user in above the way we do it doesn't do this automatically
        $event = new InteractiveLoginEvent($request, $token);
        $this->get("event_dispatcher")->dispatch("security.interactive_login", $event);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($user, 'json',SerializationContext::create()->setGroups(array('settings')));
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/user/profile", name="updateUserProfile")
     */
    public function updateUserProfile(Request $request, UserService $userService)
    {
        $user = $this->getUser();
        $profile = $request->get("profile");

        if ( $profile == null ) return false;

        $user = $userService->updateUserProfile($user, $profile);

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

    /**
     * @Route("/api/watchlist/add", name="addToWatchlist")
     * @param Request $request
     * @param WatchlistService $watchlistService
     * @return JsonResponse
     */
    public function addToWatchlist(Request $request, WatchlistService $watchlistService){

        $user = $this->getUser();
        $content = $this->getDoctrine()->getRepository('AppBundle:Content')->findOneBy(['customId'=>$request->request->get('id')]);

        $watchlist = $watchlistService->newOrRemove($user, $content);

        return new JsonResponse(array("success"=>true, 'state'=>$watchlist));
    }

    /**
     * @Route("/api/notifications/", name="getNotifications")
     * @param Request $request
     * @return JsonResponse
     */
    public function getNotifications(Request $request, NotificationService $notificationService){

        $user = $this->getUser();
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($notificationService->getNotifications($user), 'json',SerializationContext::create()->setGroups(array('notification')));
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/api/notifications/seen", name="markNotificationAsSeen")
     * @param Request $request
     * @return JsonResponse
     */
    public function markNotificationAsSeen(Request $request, NotificationService $notificationService){
        $id = $request->request->get('id');
        $notificationService->markNotificationAsSeen($id);

        return new JsonResponse(array("success"=>true));
    }


}
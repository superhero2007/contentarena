<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Bid;
use AppBundle\Entity\Content;
use AppBundle\Entity\LicenseAgreement;
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\User;
use AppBundle\Service\BundleService;
use AppBundle\Service\ContentService;
use AppBundle\Service\EmailService;
use AppBundle\Service\JobService;
use AppBundle\Service\MessageService;
use AppBundle\Service\NotificationService;
use AppBundle\Service\TermsService;
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
    public function contentPlaceBid(Request $request, BidService $bidService, ContentService $contentService, EmailService $emailService, TermsService $termsService)
    {
        $user = $this->getUser();
        $bid = $bidService->saveBidsData($request,$user);
        $content = $bid->getContent();
        $soldOut = false;
        $success = false;
        $terms = $termsService->getCompanyTerms();
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

                $this->saveLicenseAgreement($content, $viewElements);
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
     * @Route("/api/bids/place", name="apiPlaceBids")
     * @param Request $request
     * @param BidService $bidService
     * @param BundleService $bundleService
     * @param ContentService $contentService
     * @param EmailService $emailService
     * @param TermsService $termsService
     * @param NotificationService $notificationService
     * @return JsonResponse
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     * @throws \exception
     */
    public function contentPlaceBids(
        Request $request,
        BidService $bidService,
        BundleService $bundleService,
        ContentService $contentService,
        EmailService $emailService,
        TermsService $termsService,
        NotificationService $notificationService
    )
    {
        $user = $this->getUser();
        $bidsData = $request->get("bids");
        $multiple = $request->get("multiple");
        $content = $contentService->findContent($request);
        $soldOut = false;
        $success = true;
        $bids = [];
        $bundles = [];
        $isMultiple = count($bidsData) > 1 && $multiple;
        $salesMethod = $bidService->findBidType($bidsData[0]['salesMethod']);

        if ($isMultiple) {
            $fee = $request->get("totalFee")["fee"];
            $bundle = $bundleService->getCustomBundle($bidsData, $fee);
            $bid = $bidService->saveBidsData($bidsData[0], $request, $user, $content, $salesMethod, $bundle, $multiple);
            $bids[] = $bid;
            foreach ($bidsData as $bidData){
                $bundle = $bundleService->findBundle($bidData['salesPackage']);

                if ($bundle->getSalesMethod() === "FIXED"){
                    $bid = $bidService->saveBidsData($bidData, $request, $user, $content, $bundle->getSalesMethod(), $bundle, $multiple);
                    $bids[] = $bid;
                }
                $bundles[] = $bundle;
            }

        } else {
            foreach ($bidsData as $bidData){
                $bundle = $bundleService->findBundle($bidData['salesPackage']);
                $bid = $bidService->saveBidsData($bidData, $request, $user, $content, $bundle->getSalesMethod(), $bundle, $multiple);
                $bids[] = $bid;
            }
        }

        foreach ($bids as $bid){
            if ($bid != null){

                $definitions = $termsService->getBidDefinitions($bid, $content->getCompany());
                $terms = $termsService->getBidTerms($bid, $content->getCompany());

                if ($bid->getStatus()->getName() == 'APPROVED'){
                    if ($isMultiple) $bundleService->setSoldCustomBundles($bundles, $content);
                    $license_service = $this->get('license_service');
                    $viewElements = array(
                        'user' => $user,
                        'bid' => $bid,
                        'terms' => $terms,
                        'definitions' => $definitions,
                        'watermark' => false,
                        'bundle' => $bid->getSalesPackage(),
                        'content' => $content,
                        'rightDefinitions' => $license_service->getRightDefinitions($content),
                        'exclusiveRights' => $license_service->getExclusiveRights($content),
                        'hostUrl' => $this->container->getParameter("carena_host_url")
                    );
                    $this->saveLicenseAgreement($content, $viewElements);
                    $emailService->dealClosed($content, $bid);
                    $emailService->closedDealBuyer($content, $bid);
                    $notificationService->listingBidClosedNotifications($content);
                    $notificationService->listingBidClosedBuyerNotifications($content, $user);

                    //Notify admins
                    $emailService->internalUserFixedClose($user, $bid);

                } else {
                    // Notify Seller
                    $emailService->bidReceived($content, $bid);
                    $notificationService->listingBidReceivedNotifications($content);

                    // Notify Buyer
                    $emailService->bidPlaced($content, $bid);
                    $notificationService->listingBidPlacedNotifications($content, $user);

                    // Notify admins
                    $emailService->internalUserBidPlace($user, $bid);
                }

                $soldOut = $contentService->listingIsSoldOut($content);
                if ($soldOut) {
                    $emailService->soldOut($content);
                    $notificationService->listingSoldOutNotifications($content);
                }
            } else {
                $success = false;
            }
        }

        return new JsonResponse(array("success"=>$success, "soldOut"=>$soldOut));
    }

    /**
     * @param $content
     * @param $viewElements
     * @throws \exception
     */
    public function saveLicenseAgreement($content, $viewElements, $override = true ){

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
        //$htmlGeneralTerms = $this->renderView('contract/la-general-terms-base.html.twig', $viewElements);

       /* $this->get('knp_snappy.pdf')->generateFromHtml(
            $htmlGeneralTerms,
            $this->container->getParameter("uploads_main_folder") . "/general-terms.pdf",
            array(),
            true
        );*/

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

        //$pdf->addPDF($this->container->getParameter("uploads_main_folder") . "/general-terms.pdf", 'all');

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

            $customBids = $bidService->getAllCustomBidsByContent($listing);

            foreach ($customBids as $customBid){
                /* @var Bid $customBid */
                /* @var SalesPackage $bundle */
                $bundle = $customBid->getSalesPackage();
                $bundle->setBids(array($customBid));
                $listing->addSalesPackage($bundle);
                $totalBids += 1;
            }

            if ( $totalBids == 0 && $listing->getStatus()->getName() == "EXPIRED" ) unset($listings[$key]);
        }

        $listings = array_values($listings);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($listings, 'json',SerializationContext::create()->enableMaxDepthChecks()->setGroups(array('commercial')));

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
     * @param TermsService $termsService
     * @param NotificationService $notificationService
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function acceptBids(
        Request $request, BidService $bidService,
        ContentService $contentService,
        EmailService $emailService,
        TermsService $termsService,
        NotificationService $notificationService
    )
    {
        $user = $this->getUser();

        $bid = $bidService->acceptBid($request);
        $content = $bid->getContent();
        $soldOut = false;
        $success = false;
        $terms = $termsService->getCompanyTerms($user->getCompany());
        $definitions = $termsService->getCompanyDefinitions($user->getCompany());

        if ($bid != null){
            $soldOut = $contentService->checkIfSoldOut($request);
            $success = true;
            $license_service = $this->get('license_service');
            $viewElements = array(
                'user' => $user,
                'bid' => $bid,
                'watermark' => false,
                'terms' => $terms,
                'definitions' => $definitions,
                'bundle' => $bid->getSalesPackage(),
                'content' => $content,
                'rightDefinitions' => $license_service->getRightDefinitions($content),
                'exclusiveRights' => $license_service->getExclusiveRights($content),
                'hostUrl' => $this->container->getParameter("carena_host_url")
            );

            try {
                $this->saveLicenseAgreement($content, $viewElements);

                // Notify Buyer
                $emailService->bidAccepted($content, $bid);
                $notificationService->listingBidAcceptedBuyerNotifications($content, $bid);

                // Notify Seller
                $emailService->dealClosed($content, $bid);
                $notificationService->listingBidClosedNotifications($content);

                // Notify admins
                $emailService->internalUserBidAccept($user, $bid);

                if ($soldOut) {
                    $emailService->soldOut($content);
                    $notificationService->listingSoldOutNotifications($content);
                }
            }
            catch (\Exception $exception){
                $success = false;
            }
        }

        return new JsonResponse(array("success"=>$success, "soldOut"=>$soldOut));

    }

    /**
     * @Route("/api/bid/reject", name="rejectBid")
     * @param Request $request
     * @param BidService $bidService
     * @param EmailService $emailService
     * @param NotificationService $notificationService
     * @return JsonResponse
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function rejectBid(
        Request $request,
        BidService $bidService,
        EmailService $emailService,
        NotificationService $notificationService
    )
    {
        $user = $this->getUser();

        $bid= $bidService->rejectBid($request, $user);
        $listing = $bid->getContent();
        $bundle = $bid->getSalesPackage();
        $emailService->bidDeclined($listing, $bid);
        $notificationService->listingBidDeclinedBuyerNotifications($listing, $bid);

        // Notify admins
        $emailService->internalUserBidDecline($user, $bid);

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
        $data = $serializer->serialize($threads, 'json',SerializationContext::create()->setGroups(array('thread')));
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/messages/unread", name="getUnreadThreads")
     */
    public function getUnreadThreads(Request $request, MessageService $messageService)
    {
        $user = $this->getUser();

        $threads = $messageService->getUnreadThreads($request, $user);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($threads, 'json',SerializationContext::create()->setGroups(array('unread')));
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/messages/thread", name="getThread")
     */
    public function getThread(Request $request, MessageService $messageService)
    {
        $user = $this->getUser();
        $threads = $messageService->getThread($request, $user);
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($threads, 'json',SerializationContext::create()->setGroups(array('messages')));
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/messages/send", name="sendMessage")
     * @param Request $request
     * @param MessageService $messageService
     * @return Response
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Exception
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
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
    public function getUserInfoByActivationCode(Request $request, UserService $userService, JobService $jobService)
    {
        $user = $userService->getUserByActivationCode($request->get("activationCode"));
        $jobService->createAccountIncompleteJob($user);
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($user, 'json',SerializationContext::create()->setGroups(array('settings')));
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
     * @param Request $request
     * @param UserService $userService
     * @param EmailService $emailService
     * @return Response
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function activateUser(Request $request, UserService $userService, EmailService $emailService )
    {
        $user = $userService->activateUser($request);

        // Notify user
        $emailService->accountActivated( $user );

        // Notify administration team
        $emailService->internalUserRegisters( $user );

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

}

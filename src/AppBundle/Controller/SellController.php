<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Service\FileUploader;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\ContentService;

class SellController extends Controller
{

    /**
     * @Route("/sell", name="sell")
     */
    public function sellAction(Request $request)
    {
        /**
         * @var User
         */
        $user = $this->getUser();

        $criteria = array(
            'company' => $user->getCompany()
        );

        $contents =  $this->getDoctrine()->getRepository('AppBundle:Content')->findBy($criteria, ['createdAt' => 'DESC']);

        return $this->render('sell/sell.html.twig', [
            'user' => $user,
            'contents' => $contents
        ]);

    }

    /**
     * @Route("/sell/published", name="sellPublished")
     */
    public function sellPublishedAction(Request $request, ContentService $contentService, FileUploader $fileUploader)
    {
        $user = $this->getUser();
        $contentService->createContent($user, $request);

        return $this->render('@App/sell/contentUploaded.html.twig', [
            'user' => $user,
        ]);

    }

    /**
     * @Route("/test/sell/published", name="testSellPublished")
     */
    public function testSellPublishedAction(){

        $user = $this->getUser();

        return $this->render('sell/contentUploaded.html.twig', [
            'user' => $user,
        ]);

    }

    /**
     * @Route("/sell/new", name="newListing")
     */
    public function newListingAction(Request $request)
    {

        $user = $this->getUser();

        $packages = $this->getDoctrine()
            ->getRepository('AppBundle:RightsPackage')
            ->findAll();

        $rights = $this->getDoctrine()
            ->getRepository('AppBundle:Rights')
            ->findAll();

        // replace this example code with whatever you need
        return $this->render('@App/sell/sell.new.html.twig', [
            'user' => $user,
            'packages' => $packages,
            'rights' => $rights,
            'price' => 4
        ]);

    }

    /**
     * @Route("/sell/listings", name="sellListings")
     */
    public function sellListingsAction(Request $request)
    {

        return $this->redirectToRoute('sellListingsActive', array(
        ));

    }

    /**
     * @Route("/sell/content/data", name="get_content_data")
     */

    public function sellContentDataAction(Request $request){

        //get info by requested custom_id
        $content = $this->getDoctrine()->getRepository('AppBundle:Content')->findOneBy(['customId'=>$request->request->get('id')]);
        $user = $this->getUser();
        $countries = $this->getDoctrine()
            ->getRepository('AppBundle:Content')
            ->getTerritoryInfo($request->request->get('id'));
        $buyPackages = $this->getDoctrine()->getRepository('AppBundle:Content')->getBuyPackages($content->getSalesPackages());

        return $this->render('content/content.html.twig', [
            'content' => $content,
            'user'=>$user,
            'countries'=>$countries,
            'buyPackages'=>$buyPackages,
            'custom_id' => $request->get("id"),
            'test'=>11
        ]);
    }


    /**
     * @Route("/sell/active/listings", name="get_active_listings")
     */

    public function sellAllActiveListingsAction(Request $request){

        //fetch active contents and paginate them
        $contents =  $this->getDoctrine()->getRepository('AppBundle:Content')->findBy(['approved'=>true], ['createdAt' => 'DESC']);
        $paginator  = $this->get('knp_paginator');
        $contents = $paginator->paginate($contents,$request->query->getInt('page',1),10);
        $user = $this->getUser();

        return $this->render('@App/sell/sell.listings.active.html.twig', [
            'user' => $user,
            'contents' => $contents
        ]);
    }

    /**
     * @Route("/sell/listings/active", name="sellListingsActive")
     */
    public function sellListingsActiveAction(Request $request)
    {

        $user = $this->getUser();
        $contents =  $this->getDoctrine()->getRepository('AppBundle:Content')->findBy(['approved'=>true], ['createdAt' => 'DESC']);
        $paginator  = $this->get('knp_paginator');
        $contents = $paginator->paginate($contents,$request->query->getInt('page',1),10);

        return $this->render('@App/sell/sell.listings.active.html.twig', [
            'user' => $user,
            'contents' => $contents
        ]);

    }

    /**
     * @Route("/sell/listings/drafts", name="sellListingsDrafts")
     */
    public function sellListingsDraftsAction(Request $request)
    {

        $user = $this->getUser();
        $contents =  $this->getDoctrine()->getRepository('AppBundle:Content')->findBy([], ['createdAt' => 'DESC']);
        $paginator  = $this->get('knp_paginator');
        $contents = $paginator->paginate($contents,$request->query->getInt('page',1),10);


        return $this->render('@App/sell/sell.listings.active.html.twig', [
            'user' => $user,
            'contents' => $contents
        ]);

    }

    /**
     * @Route("/sell/listings/expired", name="sellListingsExpired")
     */
    public function sellListingsExpiredAction(Request $request)
    {

        $user = $this->getUser();
        $contents =  $this->getDoctrine()->getRepository('AppBundle:Content')->getExpiredData();
        $paginator  = $this->get('knp_paginator');
        $contents = $paginator->paginate($contents,$request->query->getInt('page',1),10);

        return $this->render('@App/sell/sell.listings.expired.html.twig', [
            'user' => $user,
            'contents' => $contents
        ]);

    }

    /**
     * @Route("/sell/listings/pending", name="sellListingsPending")
     */
    public function sellListingsPendingAction(Request $request)
    {

        $user = $this->getUser();
        $contents =  $this->getDoctrine()->getRepository('AppBundle:Content')->findBy(['approved'=>false], ['createdAt' => 'DESC']);
        $paginator  = $this->get('knp_paginator');
        $contents = $paginator->paginate($contents,$request->query->getInt('page',1),10);


        return $this->render('@App/sell/sell.listings.pending.html.twig', [
            'user' => $user,
            'contents' => $contents
        ]);

    }

    /**
     * @Route("/sell/listings/packages", name="sellListingsPackages")
     */
    public function sellListingsPackagesAction(Request $request)
    {

        $user = $this->getUser();
        $contents =  $this->getDoctrine()->getRepository('AppBundle:Content')->findBy([], ['createdAt' => 'DESC']);
        $paginator  = $this->get('knp_paginator');
        $contents = $paginator->paginate($contents,$request->query->getInt('page',1),10);


        return $this->render('@App/sell/sell.listings.active.html.twig', [
            'user' => $user,
            'contents' => $contents
        ]);

    }

    /**
     * @Route("/sell/contracts", name="sellContracts")
     */
    public function sellContractsAction(Request $request)
    {

        return $this->redirectToRoute('sellContractsActive', array(
        ));

    }

    /**
     * @Route("/sell/contracts/expired", name="sellContractsExpired")
     */
    public function sellContractsExpiredAction(Request $request)
    {

        $user = $this->getUser();
        return $this->render('@App/sell/sell.contracts.expired.html.twig', [
            'user' => $user,
        ]);

    }

    /**
     * @Route("/sell/contracts/active", name="sellContractsActive")
     */
    public function sellContractsActiveAction(Request $request)
    {

        $user = $this->getUser();
        return $this->render('@App/sell/sell.contracts.active.html.twig', [
            'user' => $user,
        ]);

    }

    /**
     * @Route("/sell/schedule", name="sellSchedule")
     */
    public function sellScheduleAction(Request $request)
    {

        $user = $this->getUser();
        return $this->render('@App/sell/sell.schedule.html.twig', [
            'user' => $user,
        ]);

    }

}
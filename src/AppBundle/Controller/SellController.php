<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Service\FileUploader;
use JMS\Serializer\SerializerBuilder;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\ContentService;
use JMS\Serializer\SerializationContext;
use AppBundle\Entity\Content;

class SellController extends Controller
{

    /**
     * @Route("/sell", name="sell")
     */
    public function sellAction(Request $request)
    {
        return $this->redirectToRoute('newListing', array(
        ));

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

        /*$rights = $this->getDoctrine()
            ->getRepository('AppBundle:Rights')
            ->findAll();*/

        $serializer = SerializerBuilder::create()->build();
        $content = new Content();

        // replace this example code with whatever you need
        return $this->render('@App/sell/sell.new.html.twig', [

            'content' =>  $serializer->serialize($content, 'json'),
            'user' => $user,
            'packages' => $serializer->serialize($packages, 'json'),
            'rights' => $user
            //'rights' => $serializer->serialize($rights, 'json',SerializationContext::create()->enableMaxDepthChecks())
        ]);

    }

    /**
     * @Route("/sell/edit/{customId}", name="editListing")
     */
    public function newEditAction(Request $request)
    {

        $user = $this->getUser();
        $content = $this->getDoctrine()->getRepository('AppBundle:Content')->findOneBy(['customId' => $request->get("customId")]);

        $packages = $this->getDoctrine()
            ->getRepository('AppBundle:RightsPackage')
            ->findAll();

        $rights = $this->getDoctrine()
            ->getRepository('AppBundle:Rights')
            ->findAll();

        $serializer = SerializerBuilder::create()->build();
        $jsonContent = $serializer->serialize($content, 'json');

        // replace this example code with whatever you need
        return $this->render('@App/sell/sell.new.html.twig', [
            'content' =>  $jsonContent,
            'user' => $user,
            'packages' => $serializer->serialize($packages, 'json'),
            'rights' => $serializer->serialize($rights, 'json')
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
     * @Route("/sell/listings/active", name="sellListingsActive")
     */
    public function sellListingsActiveAction(Request $request)
    {

        $user = $this->getUser();
        $contents =  $this->getDoctrine()->getRepository('AppBundle:Content')->getActiveContent();
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
        $contents =  $this->getDoctrine()->getRepository('AppBundle:Content')->findBy(['approved'=>false, 'draft'=>true], ['createdAt' => 'DESC']);
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
        $contents =  $this->getDoctrine()->getRepository('AppBundle:Content')->findBy(['approved'=>false, 'draft'=>false], ['createdAt' => 'DESC']);
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
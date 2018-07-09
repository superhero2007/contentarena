<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Content;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\ContentService;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;


class MainController extends BaseController
{

    /**
     * @Route("/marketplace", name="marketplace")
     */
    public function buyAction(Request $request)
    {

        $user = $this->getUser();
        $rights = $this->getDoctrine()->getRepository('AppBundle:RightsPackage')->findAll();

        return $this->render('@App/marketplace.html.twig', [
            'user' => $user,
            'company' => $this->serialize($user->getCompany()),
            'rights' => $this->serialize($rights)
        ]);

    }

    /**
     * @Route("/listing/{customId}", name="listing")
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

        return $this->render('@App/marketplace.listing.html.twig', [
            'user' => $user,
            'company' => $serializer->serialize($user->getCompany(), 'json',SerializationContext::create()->enableMaxDepthChecks()),
            'customId' => $request->get('customId'),
            'salesPackage' => null,
            'rights' => $serializer->serialize($rights, 'json',SerializationContext::create()->enableMaxDepthChecks())
        ]);

    }

    /**
     * @Route("/listing/{customId}/buy/{salesPackage}", name="buyListing")
     */
    public function buyListing(Request $request)
    {

        $user = $this->getUser();
        $rights = $this->getDoctrine()->getRepository('AppBundle:RightsPackage')->findAll();
        /**
         * Strategy to keep camel case on property names
         */
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();

        return $this->render('@App/marketplace.listing.html.twig', [
            'user' => $user,
            'company' => $serializer->serialize($user->getCompany(), 'json',SerializationContext::create()->enableMaxDepthChecks()),
            'customId' => $request->get('customId'),
            'salesPackage' => $request->get('salesPackage'),
            'rights' => $serializer->serialize($rights, 'json',SerializationContext::create()->enableMaxDepthChecks())
        ]);

    }

    /**
     * @Route("/managelistings", name="manageListings")
     */
    public function manageListings(Request $request)
    {
        $user = $this->getUser();
        return $this->render('@App/manage.html.twig', [
            'user' => $user,
            'profile' => "SELLER",
            'tab' => "MANAGE_LISTINGS",
            'company' => null,
        ]);
    }

    /**
     * @Route("/managelistings/buyer", name="manageListingsBuyer")
     */
    public function manageBuyer(Request $request)
    {
        $user = $this->getUser();
        return $this->render('@App/manage.html.twig', [
            'user' => $user,
            'company' => $this->serialize($user->getCompany()),
            'profile' => "BUYER"
        ]);

    }

    /**
     * @Route("/watchlist", name="manageWatchlist")
     */
    public function manageWatchlist(Request $request)
    {
        $user = $this->getUser();
        return $this->render('@App/manage.html.twig', [
            'user' => $user,
            'company' => $this->serialize($user->getCompany()),
            'profile' => "BUYER",
            'tab' => "WATCHLIST"
        ]);

    }

    /**
     * @Route("/closeddeals", name="manageClosedDeals")
     */
    public function manageClosedDeals(Request $request)
    {
        $user = $this->getUser();
        return $this->render('@App/manage.html.twig', [
            'user' => $user,
            'company' => $this->serializer->serialize($user->getCompany(), 'json',SerializationContext::create()->enableMaxDepthChecks()),
            'profile' => "BUYER",
            'tab' => "CLOSED_DEALS"
        ]);

    }

    /**
     * @Route("/activebids", name="manageActiveBids")
     */
    public function manageActiveBids(Request $request)
    {
        $user = $this->getUser();
        return $this->render('@App/manage.html.twig', [
            'user' => $user,
            'company' => $this->serializer->serialize($user->getCompany(), 'json',SerializationContext::create()->enableMaxDepthChecks()),
            'profile' => "BUYER",
            'tab' => "BIDS"
        ]);

    }


    /**
     * @Route("/listings/marketplace", name="marketplaceListings")
     */
    public function marketplaceListings(Request $request, ContentService $contentService)
    {
        $contents = $contentService->getContent($request);
        $paginate = $this->get('knp_paginator');
        $contents = $paginate->paginate($contents,$request->query->getInt('page',1),10);
        $context = SerializationContext::create()->setGroups(array('listing'));

        $data = $this->serialize($contents->getItems(),$context);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/settings", name="settings")
     */
    public function settings(Request $request)
    {
        $user = $this->getUser();
        return $this->render('@App/manage.html.twig', [
            'user' => $user,
            'tab' => "SETTINGS",
            'company' => null,
            'profile' => $request->get("profile")
        ]);
    }

    /**
     * @Route("/messages", name="messages")
     */
    public function messages(Request $request)
    {
        $user = $this->getUser();
        return $this->render('@App/manage.html.twig', [
            'user' => $user,
            'tab' => "MESSAGES",
            'company' => null,
            'profile' => $request->get("profile")
        ]);
    }

    /**
     * @Route("/managelistings/new", name="manageNewListing")
     */
    public function manageNewListing(Request $request)
    {

        $user = $this->getUser();

        $packages = $this->getDoctrine()
            ->getRepository('AppBundle:RightsPackage')
            ->findAll();

        $rights = $this->getDoctrine()
            ->getRepository('AppBundle:Rights')
            ->findAll();

        /**
         * Strategy to keep camel case on property names
         */
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();


        $content = new Content();
        $content->setCompany($user->getCompany());

        return $this->render('@App/sell/sell.new.html.twig', [

            'content' =>  $serializer->serialize($content, 'json'),
            'user' => $user,
            'packages' => $serializer->serialize($packages, 'json',SerializationContext::create()->setGroups(array('common'))),
            'rights' => $serializer->serialize($rights, 'json',SerializationContext::create()->enableMaxDepthChecks())
        ]);

    }

    /**
     * @Route("/managelistings/edit/{customId}", name="manageEditListing")
     */
    public function manageEditListing(Request $request)
    {

        $user = $this->getUser();
        $content = $this->getDoctrine()->getRepository('AppBundle:Content')->findOneBy(['customId' => $request->get("customId")]);

        $packages = $this->getDoctrine()
            ->getRepository('AppBundle:RightsPackage')
            ->findAll();

        $rights = $this->getDoctrine()
            ->getRepository('AppBundle:Rights')
            ->findAll();

        /**
         * Strategy to keep camel case on property names
         */
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();

        /**
         * Serialization
         */
        $jsonContent = $serializer->serialize($content, 'json');

        // replace this example code with whatever you need
        return $this->render('@App/sell/sell.new.html.twig', [
            'content' =>  $jsonContent,
            'user' => $user,
            'packages' => $serializer->serialize($packages, 'json'),
            'rights' => $serializer->serialize($rights, 'json')
        ]);

    }


}
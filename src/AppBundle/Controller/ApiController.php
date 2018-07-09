<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Service\BidService;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;




class ApiController extends Controller
{
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
        $contents = $paginator->paginate($contents,$request->query->getInt('page',1),10);

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
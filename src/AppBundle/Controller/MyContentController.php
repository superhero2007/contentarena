<?php

namespace AppBundle\Controller;


use AppBundle\Entity\User;
use AppBundle\Service\FileUploader;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Service\ContentService;
use AppBundle\Entity\Watchlist;
use AppBundle\Service\WatchlistService;

class MyContentController extends Controller
{

    /**
     * @Route("/mycontent", name="myContent")
     */
    public function myContentAction(Request $request)
    {
        return $this->redirectToRoute('myContentListings', array(
        ));
    }

    /**
     * @Route("/mycontent/listings", name="myContentListings")
     */
    public function myContentListingsAction(Request $request)
    {
        $user = $this->getUser();
        return $this->redirectToRoute('myContentPending', array(
        ));
    }

    /**
     * @Route("/mycontent/listings/watchlist", name="myContentWatchlist")
     */
    public function myContentWatchlistdAction(){

        $user = $this->getUser();
        $watchlists = $this->getDoctrine()->getRepository('AppBundle:Watchlist')->findBy(['user'=>$user]);

        return $this->render('@App/myContent/myContent.listings.watchlist.html.twig', [
            'user' => $user,
            'watchlists' => $watchlists,
        ]);

    }

    /**
     * @Route("/mycontent/listings/pending", name="myContentPending")
     */
    public function myContentPendingAction(Request $request)
    {

        $user = $this->getUser();
        $bids = $this->getDoctrine()->getRepository('AppBundle:Bid')->findBy(['buyerUser'=>$user, 'status'=>1]);

        $rights = $this->getDoctrine()->getRepository('AppBundle:RightsPackage')->findAll();
        return $this->render('@App/myContent/myContent.listings.pending.html.twig', [
            'user' => $user,
            'bids' => $bids,
            'rights' => $rights
        ]);

    }

    /**
     * @Route("/mycontent/listings/acquired", name="myContentAcquired")
     */
    public function myContentAcquiredAction(Request $request)
    {
        $user = $this->getUser();
        return $this->render('@App/myContent/myContent.listings.acquired.html.twig', [
            'user' => $user,
        ]);

    }

    /**
     * @Route("/mycontent/listings/expired", name="myContentExpired")
     */
    public function myContentExpiredAction(Request $request)
    {

        $user = $this->getUser();
        return $this->render('@App/myContent/myContent.listings.expired.html.twig', [
            'user' => $user,
        ]);

    }

    /**
     * @Route("/mycontent/contracts", name="myContentContracts")
     */
    public function myContentContractsAction(Request $request)
    {

        return $this->redirectToRoute('myContentContractsActive', array(
        ));

    }

    /**
     * @Route("/mycontent/contracts/expired", name="myContentContractsExpired")
     */
    public function myContentContractsExpireddAction(Request $request)
    {

        $user = $this->getUser();
        return $this->render('@App/myContent/myContent.contracts.expired.html.twig', [
            'user' => $user,
        ]);

    }

    /**
     * @Route("/mycontent/contracts/active", name="myContentContractsActive")
     */
    public function myContentContractsActiveAction(Request $request)
    {

        $user = $this->getUser();
        return $this->render('@App/myContent/myContent.contracts.active.html.twig', [
            'user' => $user,
        ]);

    }

    /**
     * @Route("/mycontent/schedule", name="myContentSchedule")
     */
    public function myContentScheduleAction(Request $request)
    {

        $user = $this->getUser();
        return $this->render('@App/myContent/myContent.schedule.html.twig', [
            'user' => $user,
        ]);

    }

    /**
     * @Route("/mycontent/watchlist/", name="watchlist")
     * @param Request $request
     * @param WatchlistService $watchlistService
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function watchlist(Request $request, WatchlistService $watchlistService){

        $user = $this->getUser();
        $content = $this->getDoctrine()->getRepository('AppBundle:Content')->findOneBy(['customId'=>$request->request->get('id')]);

        $watchlist = $watchlistService->newOrRemove($user, $content);

        return new JsonResponse(array("success"=>true, 'state'=>$watchlist));
    }


}
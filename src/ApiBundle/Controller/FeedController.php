<?php

namespace ApiBundle\Controller;

use AppBundle\Entity\Company;
use AppBundle\Service\SportRadarService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;

class FeedController extends FOSRestController
{
    use \ApiBundle\Helper\ControllerHelper;

    private $sportRadarService;

    /**
     * FeedController constructor.
     * @param SportRadarService $sportRadarService
     */
    public function __construct (SportRadarService $sportRadarService)
    {
        $this->sportRadarService = $sportRadarService;
    }

    public function getTestAction()
    {

        $path = $this->get('kernel')->getRootDir() . '/../web/bundles/app/data/regions.json';
        $content = file_get_contents($path);
        $json = json_decode($content, true);
        $view = $this->view($json);
        return $this->handleView($view);
    }

    public function getCompanyAction()
    {
        $user = $this->getUser();

        /**
         * @var Company $company;
         */
        $company = $user->getCompany();
        $view = $this->view($company->getUsers());

        return $this->handleView($view);
    }

    public function getSportsAction()
    {
        $ttl = $this->getParameter('sportradar_api_cache_ttl');
        $cached = $this->get('cache.app')->getItem('sports');

        if (!$cached->isHit()) {
            $response = $this->sportRadarService->makeRequest('/sports/en/sports.xml');
            $cached->set($response);
            $cached->expiresAfter($ttl);
            $this->get('cache.app')->save($cached);
        } else {
            $response = $cached->get();
        }

        $view = $this->view($response);
        return $this->handleView($view);
    }

    public function getAllTournamentsAction()
    {
        $response = $this->sportRadarService->syncAllTournaments();
        $view = $this->view($response);
        return $this->handleView($view);
    }

    /**
     * Returns the list of tournaments available for a sport from the SportRadar API
     * @param Request $request
     * @return Response
     */
    public function postTournamentAction(Request $request)
    {

        $id = $request->get('id');
        $ttl = $this->getParameter('sportradar_api_cache_ttl');

        $parsedId = str_replace(":", "", $id);
        $cached = $this->get('cache.app')->getItem('tournaments-'.$parsedId);

        if (!$cached->isHit()) {
            $response = $this->sportRadarService->makeRequest('/sports/en/sports/'.$id.'/tournaments.xml');
            $cached->set($response);
            $cached->expiresAfter($ttl);
            $this->get('cache.app')->save($cached);
        } else {
            $response = $cached->get();
        }

        $view = $this->view($response);
        return $this->handleView($view);
    }

    /**
     * For SportRadar API Categories is the denomination for countries
     *
     * @param Request $request
     * @return Response
     */
    public function postCategoriesAction(Request $request)
    {
        $id = $request->get('id');
        $ttl = $this->getParameter('sportradar_api_cache_ttl');

        $parsedId = str_replace(":", "", $id);
        $cachedCategories = $this->get('cache.app')->getItem('categories-'.$parsedId);

        if (!$cachedCategories->isHit()) {
            $response = $this->sportRadarService->makeRequest('/sports/en/sports/'.$id.'/categories.xml');
            $cachedCategories->set($response);
            $cachedCategories->expiresAfter($ttl);
            $this->get('cache.app')->save($cachedCategories);
        } else {
            $response = $cachedCategories->get();
        }

        $view = $this->view($response);
        return $this->handleView($view);
    }

    /**
     * For SportRadar API Seasons for a tournament
     *
     * @param Request $request
     * @return Response
     */
    public function postSeasonsAction(Request $request)
    {
        $id = $request->get('id');
        $ttl = $this->getParameter('sportradar_api_cache_ttl');

        $parsedId = str_replace(":", "", $id);
        $cachedCategories = $this->get('cache.app')->getItem('seasons-'.$parsedId);

        if (!$cachedCategories->isHit()) {
            $response = $this->sportRadarService->makeRequest('/sports/en/tournaments/'.$id.'/seasons.xml');
            $cachedCategories->set($response);
            $cachedCategories->expiresAfter($ttl);
            $this->get('cache.app')->save($cachedCategories);
        } else {
            $response = $cachedCategories->get();
        }

        $view = $this->view($response);
        return $this->handleView($view);
    }

    /**
     * For SportRadar API schedule for a season
     *
     * @param Request $request
     * @return Response
     */
    public function postScheduleAction(Request $request)
    {
        $id = $request->get('id');
        $ttl = $this->getParameter('sportradar_api_cache_ttl');

        $parsedId = str_replace(":", "", $id);
        $cachedCategories = $this->get('cache.app')->getItem('schedule-'.$parsedId);

        if (!$cachedCategories->isHit()) {
            $response = $this->sportRadarService->makeRequest('/sports/en/tournaments/'.$id.'/schedule.xml');
            $cachedCategories->set($response);
            $cachedCategories->expiresAfter($ttl);
            $this->get('cache.app')->save($cachedCategories);
        } else {
            $response = $cachedCategories->get();
        }

        $view = $this->view($response);
        return $this->handleView($view);
    }


}


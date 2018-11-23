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

    public function makeRequest($url, $method = 'GET', $params = array())
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
        $api_response = curl_exec($ch);
        return json_decode($api_response, true);
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
        $externalApi = 'http://api.contentarena.com/';

        $parsedId = str_replace(":", "", $id);
        $cached = $this->get('cache.app')->getItem('tournaments-'.$parsedId);
        $env = $this->container->get('kernel')->getEnvironment();

        if (!$cached->isHit() || $env == "dev") {

            if ( $env == "dev"){
                /**
                 * If dev environment we should call content arena instead of sport radar
                 */
                $response = $this->makeRequest($externalApi. 'v1/feed/tournaments', "POST", array( "id"=> $id) );
            } else {
                $response = $this->sportRadarService->makeRequest('/sports/en/sports/'.$id.'/tournaments.xml');
            }

            if ($response){
                $cached->set($response);
                $cached->expiresAfter($ttl);
                $this->get('cache.app')->save($cached);
            }

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
        $env = $this->container->get('kernel')->getEnvironment();
        $parsedId = str_replace(":", "", $id);
        $cachedCategories = $this->get('cache.app')->getItem('seasons-'.$parsedId);
        $externalApi = 'http://api.contentarena.com/';

        if (!$cachedCategories->isHit() || $env == "dev") {

            if ( $env == "dev"){
                /**
                 * If dev environment we should call content arena instead of sport radar
                 */
                $response = $this->makeRequest($externalApi. 'v1/feed/seasons', "POST", array( "id"=> $id) );
            } else {
                $response = $this->sportRadarService->makeRequest('/sports/en/tournaments/'.$id.'/seasons.xml');
            }


            $cachedCategories->set($response);
            $cachedCategories->expiresAfter($ttl);
            $this->get('cache.app')->save($cachedCategories);
        } else {
            $response = $cachedCategories->get();
        }


        /**
         * After getting SportRadar response we attempt to merge seasons stored in our database.
         * Season year and tournament id are used to compare
         */
        $tournamentsRepo = $this->getDoctrine()->getRepository("AppBundle:Tournament");
        $tournament = $tournamentsRepo->findOneBy(array("externalId"=>$id));

        if ( $tournament != null && $response != null && $response["seasons"] != null && $response["seasons"]["season"] != null ){
            $seasonYears = array();

            foreach ( $response["seasons"]["season"] as $season){
                $seasonYears[] = $season["@attributes"]["year"];
            }
            $seasonsRepo = $this->getDoctrine()->getRepository("AppBundle:Season");
            $caSeasons = $seasonsRepo->findBy(array("tournament"=>$tournament, "userSeason"=>false));

            usort($caSeasons, array($this,'caSeasonSort'));
            array_reverse($caSeasons);

            if (  $caSeasons != null ){
                foreach ($caSeasons as $caSeason ){
                    if (!in_array($caSeason->getYear(), $seasonYears)) {
                        $response["seasons"]["season"][] = array("@attributes" => array(
                            "id" => $caSeason->getExternalId(),
                            "name" => $caSeason->getName(),
                            "year" => $caSeason->getYear(),
                            "tournament_id" => $caSeason->getTournament()->getId(),
                            "start_date" => $caSeason->getStartDate(),
                            "end_date" => $caSeason->getEndDate(),
                        ));
                    }
                }
            }
        }

        $view = $this->view($response);
        return $this->handleView($view);
    }

    private function caSeasonSort($a, $b)
    {
        return strcmp($a->getYear(), $b->getYear());
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


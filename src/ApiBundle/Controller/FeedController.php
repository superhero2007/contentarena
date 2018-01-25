<?php

namespace ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Intl\Intl;
use FOS\RestBundle\Controller\FOSRestController;

class FeedController extends FOSRestController
{
    use \ApiBundle\Helper\ControllerHelper;

    static $agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';

    /**
     * Makes a request to the SportRadar API. The response is an XML to be parsed to JSON
     *
     * @param $url
     * @param string $method
     * @param array $params
     * @return mixed
     */
    private function makeRequest($url, $method = 'GET', $params = array() )
    {
        $ch = curl_init();
        $token = $this->getParameter('sportradar_api_token');
        $host = $this->getParameter('sportradar_api_host');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        if ($method == 'POST')
        {
            curl_setopt($ch, CURLOPT_POST, TRUE);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
        }

        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/xml', 'X-Access-Token: '.$token ));
        curl_setopt($ch, CURLOPT_URL, $host.$url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT, $this::$agent);
        $api_response = curl_exec($ch);
        curl_close($ch);
        $simpleXml = simplexml_load_string($api_response);
        $json = json_encode($simpleXml);
        return json_decode($json,true);
    }

    public function getTestAction()
    {

        $path = $this->get('kernel')->getRootDir() . '/../web/bundles/app/data/regions.json';
        $content = file_get_contents($path);
        $json = json_decode($content, true);
        $view = $this->view($json);
        return $this->handleView($view);
    }

    public function getSportsAction()
    {
        $ttl = $this->getParameter('sportradar_api_cache_ttl');
        $cached = $this->get('cache.app')->getItem('sports');

        if (!$cached->isHit()) {
            $response = $this->makeRequest('/sports/en/sports.xml');
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
            $response = $this->makeRequest('/sports/en/sports/'.$id.'/tournaments.xml');
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
            $response = $this->makeRequest('/sports/en/sports/'.$id.'/categories.xml');
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
            $response = $this->makeRequest('/sports/en/tournaments/'.$id.'/seasons.xml');
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
            $response = $this->makeRequest('/sports/en/tournaments/'.$id.'/schedule.xml');
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


<?php
/**
 * Created by PhpStorm.
 * User: Juan Cruz
 * Date: 27-Mar-18
 * Time: 17:16
 */

namespace AppBundle\Service;

use AppBundle\Entity\Season;
use AppBundle\Entity\Sport;
use AppBundle\Entity\SportCategory;
use AppBundle\Entity\Tournament;
use AppTestBundle\Entity\UnitTests\Category;
use Doctrine\ORM\EntityManager;

class SportRadarService
{

    private $em;

    private $sportradarApiToken;

    private $sportradarApiHost;

    static $agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';

    public function __construct(EntityManager $entityManager, $sportradarApiToken, $sportradarApiHost ){
        $this->em = $entityManager;
        $this->sportradarApiToken = $sportradarApiToken;
        $this->sportradarApiHost = $sportradarApiHost;
    }

    /**
     * Makes a request to the SportRadar API. The response is an XML to be parsed to JSON
     *
     * @param $url
     * @param string $method
     * @param array $params
     * @return mixed
     */
    public function makeRequest($url, $method = 'GET', $params = array() )
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        if ($method == 'POST')
        {
            curl_setopt($ch, CURLOPT_POST, TRUE);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
        }

        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/xml', 'X-Access-Token: '.$this->sportradarApiToken ));
        curl_setopt($ch, CURLOPT_URL, $this->sportradarApiHost.$url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT, $this::$agent);
        $api_response = curl_exec($ch);
        curl_close($ch);
        $simpleXml = simplexml_load_string($api_response);
        $json = json_encode($simpleXml);
        return json_decode($json,true);
    }

    public function syncAllTournaments( )
    {

        $data = $this->makeRequest('/sports/en/tournaments.xml');

        foreach ( $data["tournament"] as $tournamentData ){
            $sport = $tournamentData["sport"]["@attributes"];
            $tournament = $tournamentData["@attributes"];
            if ( isset($tournamentData["category"]) ) $category  = $tournamentData["category"]["@attributes"];
            if ( isset($tournamentData["current_season"]) ) $currentSeason = $tournamentData["current_season"]["@attributes"];


            $dbSport = $this->em->getRepository("AppBundle:Sport")->findOneBy(array ( "externalId"=> $sport['id']));
            if ( $dbSport == null ){
                $dbSport = new Sport();
                $dbSport->setName($sport["name"]);
                $dbSport->setExternalId($sport["id"]);
                $dbSport->setShownInCreate(false);
                $this->em->persist($dbSport);
                $this->em->flush();
            }

            if ( isset($category) ){
                /**
                 * @var SportCategory $dbCategory
                 */
                $dbCategory = $this->em->getRepository("AppBundle:SportCategory")->findOneBy(array ( "externalId"=> $category['id']));

                if ( $dbCategory == null ){
                    $dbCategory = new SportCategory();
                    $dbCategory->setName($category["name"]);
                    $dbCategory->setExternalId($category["id"]);
                    if (isset($category["country_code"])) $dbCategory->setCountryCode($category["country_code"]);
                    $this->em->persist($dbCategory);
                    $this->em->flush();
                }

                if ($dbCategory->getCountryCode() == null && isset($category["country_code"]) ) {
                    $dbCategory->setCountryCode($category["country_code"]);
                    $this->em->persist($dbCategory);
                    $this->em->flush();
                }
            }

            if ( isset($tournament) ){
                /**
                 * @var Tournament $dbTournament
                 */
                $dbTournament = $this->em->getRepository("AppBundle:Tournament")->findOneBy(array ( "externalId"=> $tournament['id']));

                if ( $dbTournament == null ){
                    $dbTournament = new Tournament();
                    $dbTournament->setName($tournament["name"]);
                    $dbTournament->setExternalId($tournament["id"]);

                    if ( isset($dbSport) ) $dbTournament->setSport($dbSport);
                    if ( isset($dbCategory) ) $dbTournament->setSportCategory($dbCategory);

                    $this->em->persist($dbTournament);
                    $this->em->flush();
                }

                if ($dbTournament->getSport() == null && isset($dbSport) ) {
                    $dbTournament->setSport($dbSport);
                    $this->em->persist($dbTournament);
                    $this->em->flush();
                }

                if ($dbTournament->getSportCategory() == null && isset($dbCategory) ) {
                    $dbTournament->setSportCategory($dbCategory);
                    $this->em->persist($dbTournament);
                    $this->em->flush();
                }
            }

            if ( isset($currentSeason) ){
                /**
                 * @var Tournament $dbTournament
                 */
                $dbSeason = $this->em->getRepository("AppBundle:Season")->findOneBy(array ( "externalId"=> $currentSeason['id']));

                if ( $dbSeason == null ){
                    $dbSeason = new Season();
                    $dbSeason->setName($currentSeason["name"]);
                    $dbSeason->setExternalId($currentSeason["id"]);

                    if ( isset($dbTournament) ) $dbSeason->setTournament($dbTournament);
                    if ( isset($currentSeason['start_date']) ) $dbSeason->setStartDate(new \DateTime($currentSeason['start_date']));
                    if ( isset($currentSeason['end_date']) ) $dbSeason->setEndDate(new \DateTime($currentSeason['end_date']));
                    if ( isset($currentSeason['year']) ) $dbSeason->setYear($currentSeason['year']);

                    $this->em->persist($dbSeason);
                    $this->em->flush();
                }

                if ($dbSeason->getStartDate() == null && isset($currentSeason['start_date']) ) {
                    $dbSeason->setStartDate(new \DateTime($currentSeason['start_date']));
                    $this->em->persist($dbSeason);
                    $this->em->flush();
                }

                if ($dbSeason->getEndDate() == null && isset($currentSeason['end_date']) ) {
                    $dbSeason->setEndDate(new \DateTime($currentSeason['end_date']));
                    $this->em->persist($dbSeason);
                    $this->em->flush();
                }

                if ($dbSeason->getYear() == null && isset($currentSeason['year']) ) {
                    $dbSeason->setYear( $currentSeason['year'] );
                    $this->em->persist($dbSeason);
                    $this->em->flush();
                }
            }

        }

        return;
    }

    public function syncAllSports( )
    {

        $data = $this->makeRequest('/sports/en/sports.xml');

        foreach ( $data["sport"] as $sportData ){
            $sport = $sportData["@attributes"];
            $dbSport = $this->em->getRepository("AppBundle:Sport")->findOneBy(array ( "externalId"=> $sport['id']));
            if ( $dbSport == null ){
                $dbSport = new Sport();
                $dbSport->setName($sport["name"]);
                $dbSport->setExternalId($sport["id"]);
                $dbSport->setShownInCreate(false);
                $this->em->persist($dbSport);
                $this->em->flush();
            }
        }

        return;
    }

    public function syncAllSeasons( )
    {


        $tournaments = $this->em->getRepository("AppBundle:Tournament")->findAll();

        foreach ($tournaments as $tournament){
            /* @var Tournament $tournament */
            $data =  $this->makeRequest('/sports/en/tournaments/'.$tournament->getExternalId().'/seasons.xml');

            foreach ( $data["sport"] as $sportData ){
                $sport = $sportData["@attributes"];
                $dbSport = $this->em->getRepository("AppBundle:Sport")->findOneBy(array ( "externalId"=> $sport['id']));
                if ( $dbSport == null ){
                    $dbSport = new Sport();
                    $dbSport->setName($sport["name"]);
                    $dbSport->setExternalId($sport["id"]);
                    $dbSport->setShownInCreate(false);
                    $this->em->persist($dbSport);
                    $this->em->flush();
                }
            }
        }

        return;
    }

}
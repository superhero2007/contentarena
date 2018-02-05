<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

use AppBundle\Doctrine\RandomIdGenerator;
use AppBundle\Entity\User;
use AppBundle\Entity\Content;
use AppBundle\Entity\Season;
use AppBundle\Entity\Tournament;
use AppBundle\Entity\Sport;
use Doctrine\ORM\EntityManager;


class ContentService
{

    private $em;

    public function __construct(EntityManager $entityManager, RandomIdGenerator $idGenerator) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
    }

    public function createContent(User $user, $data){

        /**
         * Instance new content object
         */
        $content = new Content();

        /**
         * Set creation date
         */
        $content->setCreatedAt(new \DateTime());

        /**
         * Set company. Every user must have a company
         */
        $company = $user->getCompany();
        $content->setCompany($company);

        /**
         * Set custom ID
         */
        $customId = $this->idGenerator->generate($content);
        $content->setCustomId($customId);

        /**
         * Set event type
         */
        if ( isset($data->eventType) ) $content->setEventType($data->eventType);

        /**
         * Set sport
         * Create element in DB if it doesn't exist.
         */
        $sport = $this->getSport($data);
        $content->setSport($sport);

        /**
         * Set tournament
         */
        if ( isset($data->tournament) ) {
            $tournament = $this->getTournament($data);
            $content->setTournament($tournament);
        }

        /**
         * Set season
         */
        if ( isset($data->season) ) {

            $season = $this->getSeason($data);
            $content->setSeason($season);
        }


        if ( isset($data->rightItems) ){

            $rightItems = array();

            foreach ( $data->rightItems as $rightItem ){

                if ( !isset($rightItem->id) ) continue;

                $item = $this->em
                    ->getRepository('AppBundle:RightsItemContent')
                    ->findOneBy(array( 'id'=> $rightItem->id));

                $rightItems[] = $item;
            }

            $content->setRightsItems($rightItems);
        }
        if ( isset($data->duration) ) $content->setDuration($data->duration->value);
        if ( isset($data->description) ) $content->setDescription($data->description->value);
        if ( isset($data->fee) && isset($data->fee->amount) ) $content->setFee($data->fee->amount);
        if ( isset($data->year) ) $content->setReleaseYear($data->year->value);
        if ( isset($data->website) ) $content->setWebsite($data->website->value);
        if ( isset($data->salesMethod) ) $content->setSalesMethod($data->salesMethod);
        if ( isset($data->availability) ){
            $content->setAvailability(date_create_from_format('d/m/Y', $data->availability->value));
        }

        //var_dump($data->sport);

        $this->em->persist($content);
        $this->em->flush();

        return $content;

    }

    private function getSeason($data){
        if ( isset($data->season->externalId) ) {
            $season = $this->em
                ->getRepository('AppBundle:Season')
                ->findOneBy(array('externalId' => $data->season->externalId));

        } else if ( isset($data->season->value)  ){
            $season = $this->em
                ->getRepository('AppBundle:Season')
                ->findOneBy(array('name' => $data->season->value));
        }

        if (!$season) {
            $season = new Season();
            if ( isset($data->season->externalId) ) $season->setExternalId($data->season->externalId);
            $season->setName($data->season->value);
            $this->em->persist($season);
            $this->em->flush();
        }

        return $season;
    }

    private function getTournament($data){
        if ( isset($data->tournament->externalId) ) {

            $tournament = $this->em
                ->getRepository('AppBundle:Tournament')
                ->findOneBy(array('externalId' => $data->tournament->externalId));

        } else if (isset($data->tournament->value) ){
            $tournament = $this->em
                ->getRepository('AppBundle:Tournament')
                ->findOneBy(array('name' => $data->tournament->value));
        }

        if (!$tournament) {
            $tournament = new Tournament();
            if ( isset($data->tournament->externalId) ) $tournament->setExternalId($data->tournament->externalId);
            $tournament->setName($data->tournament->value);
            $this->em->persist($tournament);
            $this->em->flush();
        }

        return $tournament;
    }

    private function getSport($data){

        if( isset ($data->sport->externalId ) ){
            $sport = $this->em
                ->getRepository('AppBundle:Sport')
                ->findOneBy(array( 'externalId'=> $data->sport->externalId));
        } else if( isset ($data->sport->value ) ){
            $sport = $this->em
                ->getRepository('AppBundle:Sport')
                ->findOneBy(array( 'name'=> $data->sport->value));
        };

        if ( !$sport ){
            $sport = new Sport();
            if( isset ($data->sport->externalId ) ) $sport->setExternalId($data->sport->externalId);
            $sport->setName($data->sport->value);
            $this->em->persist($sport);
            $this->em->flush();
        }

        return $sport;
    }
}
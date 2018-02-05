<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

use AppBundle\Entity\User;
use AppBundle\Entity\Content;
use AppBundle\Entity\Season;
use AppBundle\Entity\Tournament;
use AppBundle\Entity\Sport;
use Doctrine\ORM\EntityManager;


class ContentService
{

    private $em;

    public function __construct(EntityManager $entityManager) {
        $this->em = $entityManager;
    }

    public function createContent(User $user, $data){

        $content = new Content();
        $content->setCreatedAt(new \DateTime());
        $company = $user->getCompany();
        if ( isset($data->eventType) ) $content->setEventType($data->eventType);
        $content->setCompany($company);

        /**
         * Set sport
         * Create element in DB if it doesn't exist.
         */
        $sport = $this->em
            ->getRepository('AppBundle:Sport')
            ->findOneBy(array( 'externalId'=> $data->sport->externalId));

        if ( !$sport ){
            $sport = new Sport();
            $sport->setExternalId($data->sport->externalId);
            $sport->setName($data->sport->value);
            $this->em->persist($sport);
            $this->em->flush();
        }

        $content->setSport($sport);

        if ( isset($data->tournament) ) {

            $tournament = $this->em
                ->getRepository('AppBundle:Tournament')
                ->findOneBy(array('externalId' => $data->tournament->externalId));

            if (!$tournament) {
                $tournament = new Tournament();
                $tournament->setExternalId($data->tournament->externalId);
                $tournament->setName($data->tournament->value);
                $this->em->persist($tournament);
                $this->em->flush();
            }

            $content->setTournament($tournament);
        }

        if ( isset($data->season) ) {

            $season = $this->em
                ->getRepository('AppBundle:Season')
                ->findOneBy(array('externalId' => $data->season->externalId));

            if (!$season) {
                $season = new Season();
                $season->setExternalId($data->season->externalId);
                $season->setName($data->season->value);
                $this->em->persist($season);
                $this->em->flush();
            }

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
}
<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

use AppBundle\Entity\SportCategory;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Doctrine\RandomIdGenerator;
use AppBundle\Service\FileUploader;
use AppBundle\Entity\User;
use AppBundle\Entity\Content;
use AppBundle\Entity\Season;
use AppBundle\Entity\Tournament;
use AppBundle\Entity\Sport;
use Doctrine\ORM\EntityManager;


class ContentService
{

    private $em;

    private $idGenerator;

    private $fileUploader;

    public function __construct(EntityManager $entityManager, RandomIdGenerator $idGenerator, FileUploader $fileUploader) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
    }

    public function createContent(User $user, Request $request){

        /**
         * Instance new content object
         */
        $content = new Content();

        /**
         * Get json from form data
         */
        $data = json_decode($request->get("json"));

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
         * Set category
         */
        if ( isset($data->category) ) {
            $category = $this->getCategory($data);
            $content->setSportCategory($category);
        }

        /**
         * Set season
         */
        if ( isset($data->seasons) ) {

            $seasons = array();

            foreach ($data->seasons as $season){
                $season = $this->getSeason($season);
                $seasons[] = $season;
            }

            $content->setSeason($seasons);
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
        if ( isset($data->expiresAt) ) $content->setExpiresAt(date_create_from_format('m/d/Y', $data->expiresAt));
        if ( isset($data->year) ) $content->setReleaseYear($data->year->value);
        if ( isset($data->programType) ) $content->setProgramType($data->programType->value);
        if ( isset($data->programName) ) $content->setProgramName($data->programName->value);
        if ( isset($data->seriesType) ) $content->setSeriesType($data->seriesType);
        if ( isset($data->website) ) $content->setWebsite($data->website);

        if ( isset($data->salesPackages) ) $content->setSalesPackages($data->salesPackages);

        if ( isset($data->packages) ){

            $packages = array();
            foreach ( $data->packages as $packageId ){

                $package = $this->em
                    ->getRepository('AppBundle:RightsPackage')
                    ->findOneBy(array( 'id'=> $packageId));

                if ( $package ) $packages[] = $package;

            }
            $content->setRightsPackage($packages);

        }

        /*if ( isset($data->countriesSelected) ){

            $countriesSelected = array();
            foreach ( $data->countriesSelected as $countryCode ){

                $country = $this->em
                    ->getRepository('AppBundle:Country')
                    ->findOneBy(array( 'country_code'=> $countryCode));

                if ( $country ) $countriesSelected[] = $country;

            }
            $content->setCountriesSelected($countriesSelected);

        }

        if ( isset($data->countriesExcluded) ){
            $countriesExcluded = array();
            foreach ( $data->countriesExcluded as $countryCode ){

                $country = $this->em
                    ->getRepository('AppBundle:Country')
                    ->findOneBy(array( 'country_code'=> $countryCode));

                if ( $country ) $countriesExcluded[] = $country;

            }
            $content->setCountriesExcluded($countriesExcluded);

        }*/

        if ( isset($data->availability) ){
            $content->setAvailability(date_create_from_format('d/m/Y', $data->availability->value));
        }

        //var_dump($data->sport);

        /**
         * Save files
         */
        $content = $this->saveFiles($request, $content);

        $this->em->persist($content);
        $this->em->flush();

        return $content;

    }

    /**
     * @param Request $request
     * @param Content $content
     * @return Content
     */
    private function saveFiles( Request $request, Content $content ){
        $license = $request->files->get("license");
        $brochure = $request->files->get("brochure");
        $image = $request->files->get("image");

        if ( count( $image ) > 0 ) {
            $imageFileName = $this->fileUploader->upload($image[0]);
            $content->setImage($imageFileName);
        }

        if ( count( $license ) > 0 ) {
            $licenseFileName = $this->fileUploader->upload($license[0]);
            $content->setOwnLicense($licenseFileName);
        }

        if ( count($brochure) > 0 ){
            $brochureFileName = $this->fileUploader->upload($brochure[0]);
            $content->setBrochure($brochureFileName);
        }

        return $content;
    }

    private function getSeason($seasonData){
        if ( isset($seasonData->externalId) ) {
            $season = $this->em
                ->getRepository('AppBundle:Season')
                ->findOneBy(array('externalId' => $seasonData->externalId));

        } else if ( isset($seasonData->value)  ){
            $season = $this->em
                ->getRepository('AppBundle:Season')
                ->findOneBy(array('name' => $seasonData->value));
        }

        if (!$season) {
            $season = new Season();
            if ( isset($seasonData->externalId) ) $season->setExternalId($seasonData->externalId);
            $season->setName($seasonData->value);
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

    private function getCategory($data){
        if ( isset($data->category->externalId) ) {

            $category = $this->em
                ->getRepository('AppBundle:SportCategory')
                ->findOneBy(array('externalId' => $data->category->externalId));

        } else if (isset($data->category->value) ){
            $category = $this->em
                ->getRepository('AppBundle:SportCategory')
                ->findOneBy(array('name' => $data->category->value));
        }

        if (!$category) {
            $category = new SportCategory();
            if ( isset($data->category->externalId) ) $category->setExternalId($data->category->externalId);
            $category->setName($data->category->value);
            $this->em->persist($category);
            $this->em->flush();
        }

        return $category;
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
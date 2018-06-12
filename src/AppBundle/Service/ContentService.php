<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

use AppBundle\Entity\ContentFilter;
use AppBundle\Entity\ContentSelectedRight;
use AppBundle\Entity\Installments;
use AppBundle\Entity\SalesPackage;
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

    public function getContent( Request $request){

        $filterId = $request->request->get("id");

        if ( isset($filterId)){
            $filter = $this->em->getRepository('AppBundle:ContentFilter')->findOneBy(array('id' => $filterId));
        } else {
            $filter = $this->getFilterFromResponse( $request );
            if ( count( $filter->getTerritories() ) > 0 && count( $filter->getCountries() ) == 0 ) {
                $countries = $this->em->getRepository('AppBundle:Country')->findBy(array('territory' => $filter->getTerritories()));
                $filter->setCountries($countries);
            }
        }

        $term = null;
        if($request->request->get("event")){
            $term = $request->request->get("event");
        }

        $content = $this->em->getRepository('AppBundle:Content')->getFilteredContent($filter, $term);

        return $content;

    }

    public function saveFilter(Request $request, User $user)
    {
        $filter = $this->getFilterFromResponse( $request );
        $filter->setUser($user);
        $this->em->persist($filter);
        $this->em->flush();

        return true;

    }

    /**
     * @param User $user
     * @param Request $request
     * @return Content
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function saveContentAsDraft(User $user, Request $request)
    {
        $data = json_decode($request->getContent());
        $content = $this->newContent($user, $data);
        $content->setDraft(true);
        /**
         * Save files
         */
        $content = $this->saveFiles($request, $content);
        $this->em->persist($content);
        $this->em->flush();

        return $content;
    }

    public function createContent(User $user, Request $request){

        /**
         * Get json from form data
         */
        $data = json_decode($request->get("json"));

        $content = $this->newContent($user, $data);
        $content->setDraft(false);
        /**
         * Save files
         */
        $content = $this->saveFiles($request, $content);

        $this->em->persist($content);
        $this->em->flush();

        return $content;

    }

    private function newContent($user, $data){


        if ( isset ( $data->id) ){
            $content = $this->em->getRepository("AppBundle:Content")->find($data->id);
        } else {
            $content = new Content();
        }

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

        if ( $content->getCustomId() == null){
            $customId = $this->idGenerator->generate($content);
            $content->setCustomId($customId);
        }


        /**
         * Set sport
         * Create element in DB if it doesn't exist.
         */
        if ( isset($data->sports) && count($data->sports) > 0 ) {

        } else if ( isset($data->sport) ) {
            $data->sports = array( $data->sport );
        }
        $sports = $this->getSports($data);
        $content->setSports($sports);

        /**
         * Set tournament
         */
        if ( isset($data->tournament) && count($data->tournament) > 0 ) {
            $tournament = $this->getTournament($data);
            $content->setTournament($tournament);
        }

        /**
         * Set category
         */
        if ( isset($data->sportCategory) && count($data->sportCategory) > 0  ) {
            $category = $this->getCategory($data);
            $content->setSportCategory($category);
        }

        /**
         * Set season
         */
        if ( isset($data->seasons) && count($data->seasons) > 0  ) {

            $seasons = array();

            foreach ($data->seasons as $season){
                $season = $this->getSeason($season, $tournament);
                $seasons[] = $season;
            }

            $content->setSeason($seasons);
        }

        /**
         * Set installments
         */
        if ( isset($data->installments) ) {

            $installments = array();

            foreach ($data->installments as $installment){
                $installment = $this->getInstallment($installment);
                $installments[] = $installment;
            }

            $content->setInstallments($installments);
        }

        $selectedRights = array();

        if ( isset($data->description) ) $content->setDescription($data->description);
        if ( isset($data->expiresAt) ) $content->setExpiresAt(date_create_from_format('m/d/Y', $data->expiresAt));
        if ( isset($data->website) ) $content->setWebsite($data->website);
        if ( isset($data->step) ) $content->setStep($data->step);
        if ( isset($data->customSport) ) $content->setCustomSport($data->customSport);
        if ( isset($data->name) ) $content->setName($data->name);
        if ( isset($data->salesPackages) ) {

            $salesPackages = array();

            if ( is_array($data->salesPackages)){

                foreach ( $data->salesPackages as $salesPackage){
                    $package = new SalesPackage();
                    $package->setName($salesPackage->name);
                    $package->setCurrency($this->getCurrency($data->currency));
                    $package->setSalesMethod($this->getSalesMethod($salesPackage->salesMethod));
                    $package->setBundleMethod($salesPackage->bundleMethod);
                    $package->setTerritoriesMethod($salesPackage->territoriesMethod);
                    $package->setFee($salesPackage->fee);

                    if ( is_array($salesPackage->territories) && count( $salesPackage->territories) > 0  )
                    {
                        $countries = array();
                        foreach ( $salesPackage->territories as $country ){
                            $country = $this->getCountry($country->value);
                            if ( $country != null ) $countries[] = $country;
                        }
                        $package->setTerritories($countries);
                    }
                    $salesPackages[] = $package;
                }

                $content->setSalesPackages($salesPackages);
            }
        }
        if ( isset($data->rightsPackage) ){

            $packages = array();
            foreach ( $data->rightsPackage as $package ){
                $packages[$package->id] = $this->em->getReference('AppBundle:RightsPackage', $package->id );
                $selectedRightsItems = array("items"=> array(), "exclusive" => (isset($package->exclusive)) ? $package->exclusive : false  );
                foreach ( $package->selectedRights as $key => $value ){
                    $selectedRightsItems["items"][$key] = $value;
                }
                $selectedRights[$package->id] = $selectedRightsItems;
            }

            $content->setSelectedRightsBySuperRight($selectedRights);
            $content->setRightsPackage($packages);

        }
        if ( isset($data->customTournament) ){
            $content->setCustomTournament($data->customTournament || null);
        }

        return $content;
    }

    /**
     * @param Request $request
     * @return ContentFilter
     */
    private function getFilterFromResponse(Request $request){
        $filter = new ContentFilter();

        if ( $request->request->get("sports") != null ) $filter->setSports( $this->getSports( $request->request->all()  ) );
        if ( $request->request->get("countries") != null )$filter->setCountries($this->getCountriesByName( $request->request->get("countries")  ) );
        if ( $request->request->get("territories") != null )$filter->setTerritories($this->getTerritories( $request->request->get("territories")  ) );
        if ( $request->request->get("rights") != null )$filter->setSuperRights($this->getSuperRights( $request->request->get("rights") ) );
        if ( $request->request->get("orderBy") != null )$filter->setOrderBy($request->get("orderBy"));
        if ( $request->request->get("sortOrder") != null )$filter->setSortOrder($request->get("sortOrder"));
        if ( $request->request->get("fromDate") != null )$filter->setFromDate(new \DateTime($request->get("fromDate") ) );
        if ( $request->request->get("toDate") != null )$filter->setToDate(new \DateTime($request->get("toDate") ) );
        if ( $request->request->get("name") != null )$filter->setName($request->get("name"));

        return $filter;

    }

    /**
     * @param Request $request
     * @param Content $content
     * @return Content
     */
    private function saveFiles( Request $request, Content $content ){
        $license = $request->files->get("license");
        $brochure = $request->files->get("brochure");
        $data = json_decode($request->getContent());

        if ( isset( $data->imageBase64 ) ) {
            $fileName = "listing_image_".md5(uniqid()).'.jpg';
            $savedImage = $this->fileUploader->saveImage($data->imageBase64, $fileName );
            $content->setImage($savedImage);
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

    private function getSeason($seasonData, $tournament){
        if ( isset($seasonData->externalId) ) {
            $season = $this->em
                ->getRepository('AppBundle:Season')
                ->findOneBy(array('externalId' => $seasonData->externalId));

        } else if ( isset($seasonData->name)  ){
            $season = $this->em
                ->getRepository('AppBundle:Season')
                ->findOneBy(array('name' => $seasonData->name));
        }

        if (!$season) {
            $season = new Season();

            if ( isset( $tournament) ) {
                $season->setTournament($tournament);
            }

            if ( isset($seasonData->externalId) ) $season->setExternalId($seasonData->externalId);
            if ( isset($seasonData->endDate) ) $season->setEndDate(new \DateTime($seasonData->endDate));
            if ( isset($seasonData->startDate) ) $season->setStartDate(new \DateTime($seasonData->startDate));
            if ( isset($seasonData->year) ) $season->setYear($seasonData->year);
            $season->setName($seasonData->name);
            $this->em->persist($season);
            $this->em->flush();
        }

        return $season;
    }

    private function getTournament($data){
        $tournamentData = $data->tournament[0];
        if ( isset($tournamentData->externalId) ) {

            $tournament = $this->em
                ->getRepository('AppBundle:Tournament')
                ->findOneBy(array('externalId' => $tournamentData->externalId));

        } else if (isset($tournamentData->name) ){
            $tournament = $this->em
                ->getRepository('AppBundle:Tournament')
                ->findOneBy(array('name' => $tournamentData->name));
        }

        if (!$tournament) {
            $tournament = new Tournament();
            if ( isset($tournamentData->externalId) ) $tournament->setExternalId($tournamentData->externalId);
            $tournament->setName($tournamentData->name);
            $this->em->persist($tournament);
            $this->em->flush();
        }

        return $tournament;
    }

    private function getCategory($data){
        $categoryData = $data->sportCategory[0];
        if ( isset($categoryData->externalId) ) {

            $category = $this->em
                ->getRepository('AppBundle:SportCategory')
                ->findOneBy(array('externalId' => $categoryData->externalId));

        } else if (isset($categoryData->name) ){
            $category = $this->em
                ->getRepository('AppBundle:SportCategory')
                ->findOneBy(array('name' => $categoryData->name));
        }

        if (!$category) {
            $category = new SportCategory();
            if ( isset($categoryData->externalId) ) $category->setExternalId($categoryData->externalId);
            $category->setName($categoryData->name);
            $this->em->persist($category);
            $this->em->flush();
        }

        return $category;
    }

    private function getCurrency($currency){

            return $this->em
                ->getRepository('AppBundle:Currency')
                ->findOneBy(array('code' => $currency));
    }

    private function getSalesMethod($method){

        return $this->em
            ->getRepository('AppBundle:BidType')
            ->findOneBy(array('name' => $method));
    }

    private function getCountry($country){

        $country =  $this->em
            ->getRepository('AppBundle:Country')
            ->findOneBy(array('name' => $country));

        return $country;
    }

    private function getCountries($countryIds){

        $countries =  $this->em
            ->getRepository('AppBundle:Country')
            ->findBy(array('id' => $countryIds));

        return $countries;
    }

    private function getCountriesByName($countriesName){

        $countries =  $this->em
            ->getRepository('AppBundle:Country')
            ->findBy(array('name' => $countriesName));

        return $countries;
    }

    private function getTerritories($territoryIds){

        $territories =  $this->em
            ->getRepository('AppBundle:Territory')
            ->findBy(array('id' => $territoryIds));

        return $territories;
    }

    private function getSuperRights($ids){

        return $this->em
            ->getRepository('AppBundle:RightsPackage')
            ->findBy(array('id' => $ids));
    }

    private function sport($sportData){

        if ( is_array($sportData) ) $sportData = (object) $sportData;

        if( isset ($sportData->externalId ) ){
            $sport = $this->em
                ->getRepository('AppBundle:Sport')
                ->findOneBy(array( 'externalId'=> $sportData->externalId));
        }
        else if( isset ($sportData->externalId ) ){
            $sport = $this->em
                ->getRepository('AppBundle:Sport')
                ->findOneBy(array( 'externalId'=> $sportData->externalId));
        }
        else if( isset ($sportData->name ) ){
            $sport = $this->em
                ->getRepository('AppBundle:Sport')
                ->findOneBy(array( 'name'=> $sportData->name));
        };

        if ( !$sport ){
            $sport = new Sport();
            if( isset ($sportData->externalId ) ) $sport->setExternalId($sportData->externalId);
            $sport->setName($sportData->name);
            $this->em->persist($sport);
            $this->em->flush();
        }

        return $sport;
    }

    private function getSport($data){
        return $this->sport( $data->sport);
    }

    private function getSports($data){

        if ( is_array($data) ) $data = (object) $data;

        $sports = array();
        forEach ( $data->sports as $sport ){
            $sports[] = $this->sport($sport);
        }
        return $sports;
    }

    private function getInstallment($installmentData){

        if ( $installmentData ){
            $installment = new Installments();
            $installment->setPercentage($installmentData->percent);
            $installment->setDueDate($installmentData->date?date_create_from_format('d/m/Y', $installmentData->date):null);
            $installment->setSigningDays($installmentData->signingDay?$installmentData->signingDay:null);
            $installment->setGrantedDays($installmentData->grantedDay?$installmentData->grantedDay:null);
            $this->em->persist($installment);
            $this->em->flush();
        }else{
            $installment = array();
        }

        return $installment;
    }
}
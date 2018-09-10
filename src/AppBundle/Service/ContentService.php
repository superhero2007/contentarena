<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

use AppBundle\Entity\ContentFilter;
use AppBundle\Entity\ListingStatus;
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\SportCategory;
use Symfony\Component\HttpFoundation\Request;
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

        $exclusive = null;
        if($request->request->get("exclusive")){
            $exclusive = $request->request->get("exclusive");
        }

        $includeAllCountries = null;
        if($request->request->get("includeAllCountries")){
            $includeAllCountries = $request->request->get("includeAllCountries");
        }

        $content = $this->em->getRepository('AppBundle:Content')->getFilteredContent($filter, $term, $exclusive, $includeAllCountries);

        return $content;

    }

    public function getDrafts($user) {
        $content = $this->em->getRepository('AppBundle:Content')->getDrafts($user);
        return $content;
    }

    public function getInactive($user) {
        $content = $this->em->getRepository('AppBundle:Content')->getInactive($user);
        return $content;
    }

    public function getActive($user) {
        $content = $this->em->getRepository('AppBundle:Content')->getActive($user);
        return $content;
    }

    public function getActiveAndExpired($user) {
        $content = $this->em->getRepository('AppBundle:Content')->getActiveAndExpired($user);
        return $content;
    }

    public function getExpired($user) {
        $listings = $this->em->getRepository('AppBundle:Content')->getExpired($user);
        $expiredStatus = $this->em->getRepository('AppBundle:ListingStatus')->findOneBy(array('name'=>'EXPIRED'));
        $soldStatus = $this->em->getRepository('AppBundle:ListingStatus')->findOneBy(array('name'=>'SOLD_OUT'));
        $archived = $this->em->getRepository('AppBundle:ListingStatus')->findOneBy(array('name'=>'ARCHIVED'));

        foreach ( $listings as $listing ){
            /* @var Content $listing*/
            if ( $listing->getStatus()->getId() != $expiredStatus->getId() &&
                $listing->getStatus()->getId() != $archived->getId() &&
                $listing->getStatus()->getId() != $soldStatus->getId()) {
                $listing->setStatus($expiredStatus);
                $this->em->persist($listing);
                $this->em->flush();
            }
        }

        return $listings;
    }

    /**
     * @param Request $request
     * @return bool
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function checkIfSoldOut (Request $request){
        $soldOut = true;
        $listing = $this->em->getRepository('AppBundle:Content')->find($request->get('content'));

        foreach ( $listing->getSalesPackages() as $bundle ){
            /* @var $bundle SalesPackage */
            if ( !$bundle->isSold() ) $soldOut = false;

        }

        if ( $soldOut ){
            $listing->setStatus($this->em->getRepository("AppBundle:ListingStatus")->findOneBy(array("name"=>"SOLD_OUT")));
            $this->em->persist($listing);
            $this->em->flush();
        }

        return $soldOut;

    }

    public function removeListing($customId){

        if ($customId == null) return false;
        /* @var Content $content*/
        $content = $this->em->getRepository('AppBundle:Content')->findOneBy(array(
            'customId' => $customId
        ));

        $threads = $this->em->getRepository('AppBundle:Thread')->findBy(array(
            'listing' => $content
        ));

        foreach ($threads as $thread){
            $this->em->remove($thread);
        }

        if ($customId != null){
            $this->em->remove($content);
            $this->em->flush();
            return true;
        }

        return false;


    }

    public function duplicateListing($customId, $user){

        if ($customId == null) return false;

        $modelListing = $this->em->getRepository('AppBundle:Content')->findOneBy(array(
            'customId' => $customId
        ));

        if ($modelListing != null){

            $content = new Content();
            $content->setCreatedAt(new \DateTime());
            $content->setCompany($modelListing->getCompany());

            $newCustomId = $this->idGenerator->generate($content);
            $content->setCustomId($newCustomId);
            $content->setName($modelListing->getName());
            $content->setSports($modelListing->getSports());
            $content->setSportCategory($modelListing->getSportCategory());
            $content->setTournament($modelListing->getTournament());
            $content->setSeason($modelListing->getSeasons());
            $content->setFixturesBySeason($modelListing->getFixturesBySeason());
            $content->setSchedulesBySeason($modelListing->getSchedulesBySeason());
            $content->setDescription($modelListing->getDescription());
            $content->setProgramDescription($modelListing->getProgramDescription());
            $content->setVat($modelListing->getVat());
            $content->setVatPercentage($modelListing->getVatPercentage());
            $content->setPrograms($modelListing->getPrograms());
            $content->setAttachments($modelListing->getAttachments());
            $content->setAnnex($modelListing->getAnnex());
            $content->setLaw($modelListing->getLaw());
            $content->setSelectedRightsBySuperRight($modelListing->getSelectedRightsBySuperRight());

            $rights = [];
            $salesBundles = [];


            foreach ($modelListing->getSalesPackages() as $item){
                $salesBundle = new SalesPackage();
                $salesBundle->setName($item->getName());
                $salesBundle->setExcludedCountries($item->getExcludedCountries());
                $salesBundle->setInstallments($item->getInstallments());
                $salesBundle->setTerritoriesMethod($item->getTerritoriesMethod());
                $salesBundle->setBundleMethod($item->getBundleMethod());
                $salesBundle->setTerritories($item->getTerritories());
                $salesBundle->setSalesMethod($item->getSalesMethod());
                $salesBundle->setCurrency($item->getCurrency());
                $salesBundle->setFee($item->getFee());
                $salesBundles[]=$salesBundle;
            }

            foreach ($modelListing->getRightsPackage() as $item){
                $rights[]=$item;
            }
            $content->setRightsPackage($rights);
            $content->setSalesPackages($salesBundles);
            $content->setStatus($this->em->getRepository("AppBundle:ListingStatus")->findOneBy(array("name"=>"DRAFT")));
            $content->setLastAction($this->em->getRepository("AppBundle:ListingLastAction")->findOneBy(array("name"=>"DUPLICATED")));
            $content->setLastActionUser($user);
            $content->setLastActionDate(new \DateTime());
            $this->em->persist($content);
            $this->em->flush();
            return $content;
        }
        return false;
    }

    public function deactivateListing($customId, $user){

        if ($customId == null) return false;

        $content = $this->em->getRepository('AppBundle:Content')->findOneBy(array(
            'customId' => $customId
        ));

        $content->setStatus($this->em->getRepository("AppBundle:ListingStatus")->findOneBy(array("name"=>"INACTIVE")));
        $content->setLastAction($this->em->getRepository("AppBundle:ListingLastAction")->findOneBy(array("name"=>"DEACTIVATED")));
        $content->setLastActionUser($user);
        $content->setLastActionDate(new \DateTime());
        $this->em->persist($content);
        $this->em->flush();
        return $content;
    }

    public function archiveListing($customId, $user){

        if ($customId == null) return false;

        $content = $this->em->getRepository('AppBundle:Content')->findOneBy(array(
            'customId' => $customId
        ));

        $content->setStatus($this->em->getRepository("AppBundle:ListingStatus")->findOneBy(array("name"=>"ARCHIVED")));
        $content->setLastAction($this->em->getRepository("AppBundle:ListingLastAction")->findOneBy(array("name"=>"ARCHIVED")));
        $content->setLastActionUser($user);
        $content->setLastActionDate(new \DateTime());
        $this->em->persist($content);
        $this->em->flush();
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

        /**
         * @var ListingStatus currentStatus
         */
        $currentStatus = $content->getStatus();
        $newStatus = "DRAFT";
        $lastAction = "DRAFT";

        if ( $currentStatus != null && ( $currentStatus->getName() === 'APPROVED'
                || $currentStatus->getName() === 'EDITED' ) ){
            $newStatus = "EDITED";
            $lastAction = "EDITED";
        }
        
        $content->setStatus($this->em->getRepository("AppBundle:ListingStatus")->findOneBy(array("name"=> $newStatus)));
        $content->setLastAction($this->em->getRepository("AppBundle:ListingLastAction")->findOneBy(array("name"=>$lastAction)));
        $content->setLastActionUser($user);
        $content->setLastActionDate(new \DateTime());
        /**
         * Save files
         */
        $content = $this->saveFiles($request, $content);
        $this->em->persist($content);
        $this->em->flush();

        return $content;
    }

    /**
     * @param User $user
     * @param Request $request
     * @return Content
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function saveContentAsInactive(User $user, Request $request)
    {
        $data = json_decode($request->getContent());
        $content = $this->newContent($user, $data);
        $status = 'INACTIVE';

        if (isset($data->status)) {
            $status = $data->status;
        }

        $content->setStatus($this->em->getRepository("AppBundle:ListingStatus")->findOneBy(array("name"=>$status)));
        $content->setLastAction($this->em->getRepository("AppBundle:ListingLastAction")->findOneBy(array("name"=>"DEACTIVATED")));
        $content->setLastActionUser($user);
        $content->setLastActionDate(new \DateTime());
        /**
         * Save files
         */
        $content = $this->saveFiles($request, $content);
        $this->em->persist($content);
        $this->em->flush();


        return $content;
    }

    /**
     * @param User $user
     * @param Request $request
     * @return Content
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function saveContentAsActive(User $user, Request $request)
    {
        $data = json_decode($request->getContent());
        $content = $this->newContent($user, $data);
        /**
         * @var ListingStatus currentStatus
         */
        $currentStatus = $content->getStatus();
        $newStatus = ($user->isAutoPublish()) ? "APPROVED": "PENDING";
        $lastAction = "SUBMITTED";

        if ( $currentStatus != null && ( $currentStatus->getName() === 'APPROVED'
                || $currentStatus->getName() === 'EDITED' ) ){
            $newStatus = "EDITED";
            $lastAction = "EDITED";
        }

        $content->setStatus($this->em->getRepository("AppBundle:ListingStatus")->findOneBy(array("name"=>$newStatus)));
        $content->setLastAction($this->em->getRepository("AppBundle:ListingLastAction")->findOneBy(array("name"=>$lastAction)));
        $content->setLastActionUser($user);
        $content->setOwner($user);
        $content->setLastActionDate(new \DateTime());
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
        $content->setStatus($this->em->getRepository("AppBundle:ListingStatus")->findOneBy(array("name"=>"PENDING")));
        /**
         * Save files
         */
        $content = $this->saveFiles($request, $content);

        $this->em->persist($content);
        $this->em->flush();

        return $content;

    }

    private function newContent($user, $data){
        /* @var Content $content */


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
        if ( isset($data->sports) && count($data->sports) > 0 && ( isset($data->step) && $data->step == 1 )) {

        } else if ( isset($data->sport) ) {
            $data->sports = array( $data->sport );
        }
        $sports = $this->getSports($data);
        $content->setSports($sports);

        if ( isset($data->step) && $data->step == 1 ){
            /**
             * Set tournament
             */
            if ( isset($data->tournament) && count($data->tournament) > 0 ) {
                $tournament = $this->getTournament($data);
                $content->setTournament($tournament);
            } else {
                //$content->setTournament(null);
            }

            /**
             * Set category
             */
            if ( isset($data->sportCategory) && count($data->sportCategory) > 0  ) {
                $category = $this->getCategory($data);
                $content->setSportCategory($category);
            } else {
                //$content->setSportCategory(null);
            }

            /**
             * Set season
             */
            if ( isset($data->seasons) && count($data->seasons) > 0  ) {

                $seasons = array();
                $schedules = [];
                foreach ($data->seasons as $key => $seasonData){
                    $season = $this->getSeason($seasonData, $tournament, $key);
                    $seasons[] = $season;
                    $schedules[] = $seasonData->selectedSchedules;
                    if ( isset($seasonData->fixtures) ) {

                        $filteredFixtures = [];
                        foreach ( $seasonData->fixtures as $fixtureData ){
                            if ( isset($fixtureData->name) && isset($fixtureData->date) ){
                                $filteredFixtures[] = $fixtureData;
                            }
                        }

                        $fixtures[] = $filteredFixtures;
                    }


                }

                $content->setSchedulesBySeason($schedules);
                if ( isset($fixtures) ) $content->setFixturesBySeason($fixtures);
                $content->setSeason($seasons);
            } else {
                $content->setSeason(null);
                $content->setSchedulesBySeason(null);
                $content->setFixturesBySeason(null);

            }
        }

        $selectedRights = array();

        if ( isset($data->description) ) $content->setDescription($data->description);
        if ( isset($data->programDescription) ) $content->setProgramDescription($data->programDescription);
        if ( isset($data->expiresAt) ) $content->setExpiresAt(new \DateTime($data->expiresAt));
        if ( isset($data->website) ) $content->setWebsite($data->website);
        if ( isset($data->step) ) $content->setStep($data->step);
        if ( isset($data->customSport) ) $content->setCustomSport($data->customSport);
        if ( isset($data->name) ) $content->setName($data->name);
        if ( isset($data->vat) ) $content->setVat($data->vat);
        if ( isset($data->vatPercentage) ) $content->setVatPercentage($data->vatPercentage);
        if ( isset($data->startDate) ) $content->setStartDate(new \DateTime($data->startDate));
        if ( isset($data->endDate) ) $content->setEndDate(new \DateTime($data->endDate));
        if ( isset($data->startDateMode) ) $content->setStartDateMode($data->startDateMode);
        if ( isset($data->endDateMode) ) $content->setEndDateMode($data->endDateMode);
        if ( isset($data->endDateLimit) ) $content->setEndDateLimit($data->endDateLimit);
        if ( isset($data->programs) ) $content->setPrograms($data->programs);
        if ( isset($data->attachments) ) $content->setAttachments($data->attachments);
        if ( isset($data->annex) ) $content->setAnnex($data->annex);
        if ( isset($data->law) ) $content->setLaw($data->law);
        if ( isset($data->jurisdiction) ) $content->setJurisdiction($this->getCountry($data->jurisdiction->value));
        if ( isset($data->applyVatInJurisdiction) ) $content->setApplyVatInJurisdiction($data->applyVatInJurisdiction);

        if ( isset($data->signature) && $data->signature != "" && substr_count($data->signature, "uploads") == 0 ) {
            $signature = $data->signature;
            $fileName = "signature_".md5(uniqid()).'.jpg';
            $savedSignature = $this->fileUploader->saveImage($signature, $fileName );
            $content->setSignature($savedSignature);
        }

        if ( isset($data->salesPackages ) && ( isset($data->step) && $data->step == 4 ) ) {

            $salesPackages = array();

            if ( is_array($data->salesPackages)){

                foreach ( $data->salesPackages as $salesPackage){

                    if (isset($salesPackage->id)){
                        $package = $this->em->getRepository('AppBundle:SalesPackage')->findOneBy(array("id"=>$salesPackage->id));
                        $bids = $this->em->getRepository("AppBundle:Bid")->getClosedDealsBySalesBundle($package);

                        if ( count($bids) > 0 && isset($salesPackage->edited) && $salesPackage->edited == true) {
                            $salesPackages[] = $package;
                            $package = new SalesPackage();
                        }

                    } else {
                        $package = new SalesPackage();
                    }

                    $package->setName($salesPackage->name);
                    $package->setCurrency($this->getCurrency($data->currency));

                    if ( is_string($salesPackage->salesMethod )){
                        $salesMethod = $this->getSalesMethod($salesPackage->salesMethod);
                    } else {
                        $salesMethod = $this->getSalesMethod($salesPackage->salesMethod->name);
                    }
                    $package->setSalesMethod($salesMethod);
                    $package->setBundleMethod($salesPackage->bundleMethod);
                    $package->setTerritoriesMethod($salesPackage->territoriesMethod);
                    $package->setFee($salesPackage->fee);
                    $package->setInstallments($salesPackage->installments);

                    if ( is_array($salesPackage->territories) && count( $salesPackage->territories) > 0  )
                    {
                        $countries = array();
                        foreach ( $salesPackage->territories as $country ){
                            $country = (isset($country->id)) ? $this->getCountryById($country->id) : $this->getCountry($country->value);
                            if ( $country != null ) $countries[] = $country;
                        }
                        $package->setTerritories($countries);
                    }
                    if ( isset($salesPackage->excludedTerritories) && is_array($salesPackage->excludedTerritories) && count( $salesPackage->excludedTerritories) > 0  )
                    {
                        $countries = array();
                        foreach ( $salesPackage->excludedTerritories as $country ){
                            $country = (isset($country->id)) ? $this->getCountryById($country->id) : $this->getCountry($country->value);
                            if ( $country != null ) $countries[] = $country;
                        }
                        $package->setExcludedCountries($countries);
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

        $content = $this->saveExtraData($content, $data);

        if ( isset($data->customTournament) ){
            $customTournament = $this->newTournament($data->customTournament);
            $content->setTournament($customTournament);
            $content->setCustomTournament($data->customTournament);
        }

        if ( isset($data->customCategory) ){
            $customCategory = $this->newSportCategory($data->customCategory);
            $content->setSportCategory($customCategory);
            $content->setCustomCategory($data->customCategory);
        }

        if ( isset($data->company) ) $this->saveCompany($data->company);
        return $content;
    }

    /**
     * @param Content $content
     * @param $data
     * @return mixed
     */
    private function saveExtraData($content, $data){
        $keys = array(
            "DISTRIBUTION_METHOD_LIVE",
            "TECHNICAL_DELIVERY_SATELLITE",
            "HL_INPUT",
            "LICENSED_LANGUAGES",
            "NA_INPUT",
            "PROGRAM_NAME",
            "PROGRAM_SUBTITLES",
            "PROGRAM_SCRIPT",
            "PROGRAM_LANGUAGE",
            "PROGRAM_YEAR",
            "PROGRAM_TYPE",
            "PROGRAM_EPISODES",
            "PROGRAM_DURATION",
            "PROGRAM_DESCRIPTION",
            "COMMENTS_RIGHTS",
            "COMMENTS_PRODUCTION"
        );

        $extraData = array();

        foreach ($keys as $key){
            if ( property_exists($data, $key)){
                $extraData[$key] = $data->{$key};
            }
        }

        $content->setExtraData($extraData);

        return $content;

    }

    private function saveCompany($data){
        if ( isset($data->id) ) {

            $company = $this->em
                ->getRepository('AppBundle:Company')
                ->findOneBy(array('id' => $data->id));


            if ( isset($data->vat) ) $company->setVat($data->vat);
            if ( isset($data->zip) ) $company->setZip($data->zip);
            if ( isset($data->registrationNumber) ) $company->setRegistrationNumber($data->registrationNumber);
            if ( isset($data->address) ) $company->setAddress($data->address);
            if ( isset($data->city) ) $company->setCity($data->city);
            if ( isset($data->legalName) ) $company->setLegalName($data->legalName);
            if ( isset($data->country) ) $company->setCountry($this->getCountry($data->country->name));

            $this->em->persist($company);
            $this->em->flush();
        }


        return $company;
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

    public function saveTmpFiles( Request $request ){
        $files = $request->files->get("file");

        if ( count( $files ) > 0 ) {
            $fileName = $this->fileUploader->tmpUpload($files);
        }

        return $fileName;

    }

    private function getSeason($seasonData, $tournament, $key){
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

            if ( isset($seasonData->from) && !isset($seasonData->to) ){
                $season->setYear($seasonData->from);
            }

            if ( isset($seasonData->from) && isset($seasonData->to) ){
                $season->setYear( substr($seasonData->from, -2)."/".substr($seasonData->to, -2) );
            }

            $season->setName($seasonData->name);
            $time = new \DateTime();

            if ( isset($seasonData->custom)) {
                $season->setExternalId("ca:season:".$key.$time->getTimestamp());
                if ( isset( $tournament) ) {
                    $season->setName($tournament->getName(). " ". $season->getYear());
                }
            }
            $this->em->persist($season);
            
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

    private function newTournament($customTournament){

        $tournament = $this->em
            ->getRepository('AppBundle:Tournament')
            ->findOneBy(array('name' => $customTournament));

        if (!$tournament){
            $tournament = new Tournament();
            $tournament->setName($customTournament);
            $time = new \DateTime();
            $tournament->setExternalId("ca:tournament:".$time->getTimestamp());
            $this->em->persist($tournament);
        }


        return $tournament;
    }

    private function newSportCategory($customSportCategory){

        $sportCategory = $this->em
            ->getRepository('AppBundle:SportCategory')
            ->findOneBy(array('name' => $customSportCategory));

        if (!$sportCategory) {
            $sportCategory = new SportCategory();
            $sportCategory->setName($customSportCategory);
            $time = new \DateTime();
            $sportCategory->setExternalId("ca:sportCategory:".$time->getTimestamp());
            $this->em->persist($sportCategory);
        }
        return $sportCategory;
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

    private function getCountryById($countryId){

        $country =  $this->em
            ->getRepository('AppBundle:Country')
            ->findOneBy(array('id' => $countryId));

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

            $name = ( isset($sportData->name) && $sportData->name != "" ) ? $sportData->name : $sportData->value;
            $sport->setName($name);
            $this->em->persist($sport);
            $time = new \DateTime();
            if (isset($sportData->custom)) {
                $sport->setExternalId("ca:sport:".$time->getTimestamp());
                $this->em->persist($sport);
            }

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

}
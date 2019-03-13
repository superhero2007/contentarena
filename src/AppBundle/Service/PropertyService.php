<?php

namespace AppBundle\Service;

use AppBundle\Doctrine\RandomIdGenerator;
use AppBundle\Entity\Bid;
use AppBundle\Entity\Company;
use AppBundle\Entity\Content;
use AppBundle\Entity\Property;
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\Season;
use AppBundle\Entity\User;
use AppBundle\Enum\BidStatusEnum;
use Doctrine\ORM\EntityManagerInterface;

class PropertyService
{
    private $em;

    private $repo;

    private $idGenerator;

    private $fileUploader;

    private $contentService;

    private $bidService;

    public function __construct(
        EntityManagerInterface $entityManager,
        RandomIdGenerator $idGenerator,
        FileUploader $fileUploader,
        ContentService $contentService,
        BidService $bidService

    ) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
        $this->repo = $this->em->getRepository("AppBundle:Property");
        $this->contentService = $contentService;
        $this->bidService = $bidService;
    }

    /**
     * @param User $user
     * @return Property[]|array
     */
    public function getAllCompanyProperties(User $user){
        $company = $user->getCompany();
        $properties = $this->repo->findBy(array("company"=>$company));

        foreach ($properties as $property){
            $listings = $this->contentService->getPropertyListings($property, $user);
            $totalOpenBids = 0;
            $totalClosedBids = 0;

            foreach ( $listings as $key => $listing ){
                /* @var $listing Content */

                $totalTerritories = 0;
                $bids = $this->bidService->getAllBidsByContent($listing);

                foreach ($listing->getSalesPackages() as $bundle){
                    /* @var SalesPackage $bundle  */
                    $totalTerritories += count($bundle->getTerritories());
                }

                $listing->setTerritories($totalTerritories);
                if ( $bids != null ) $listing->setHasActivity(true);

                foreach ($bids as $bid){
                    /* @var Bid $bid */
                    if ($bid->getStatus()->getName() === BidStatusEnum::PENDING ){
                        $totalOpenBids++;
                    } else {
                        $totalClosedBids++;
                    }
                }

            }

            $property->setListings($listings);
            $property->setClosedBids($totalClosedBids);
            $property->setOpenBids($totalOpenBids);
        }

        return $properties;
    }

    /**
     * @param Property $property
     * @param User $user
     * @return Property|null|object
     */
    public function getPropertyDetails($property){
        $listings = $this->contentService->getPropertyListings($property);
        $fixturesRepo = $this->em->getRepository("AppBundle:Fixture");
        $totalOpenBids = 0;
        $totalClosedBids = 0;
        $totalDeclinedBids = 0;
        $seasons = $property->getSeasons();

        foreach ( $listings as $key => $listing ){
            /* @var $listing Content */

            $totalTerritories = 0;

            foreach ($listing->getSalesPackages() as $bundle){
                /* @var SalesPackage $bundle  */
                $totalTerritories += count($bundle->getTerritories());
            }

            $listing->setTerritories($totalTerritories);
            $bids = $this->bidService->getAllBidsByContent($listing);
            $listing->setBids($bids);
            if ( $bids != null ) $listing->setHasActivity(true);

            foreach ($bids as $bid){
                /* @var Bid $bid */
                if ($bid->getStatus()->getName() === BidStatusEnum::PENDING ){
                    $totalOpenBids++;
                } else if ($bid->getStatus()->getName() === BidStatusEnum::APPROVED ){
                    $totalClosedBids++;
                } else {
                    $totalDeclinedBids++;
                }
            }

        }

        foreach ($seasons as $season){

            /* @var Season $season*/

            $fixtures = $fixturesRepo->findBy(array(
                "season" => $season,
                "property" => $property
            ));

            if ( $fixtures != null ) $season->setFixtures($fixtures);
        }

        $property->setSeasons($seasons);
        $property->setListings($listings);
        $property->setClosedBids($totalClosedBids);
        $property->setOpenBids($totalOpenBids);
        $property->setDeclinedBids($totalDeclinedBids);
        $property->setPrograms([]);
        return $property;
    }

    /**
     * @param Property $property
     * @param User $user
     * @return Property
     * @throws \Exception
     */
    public function createProperty(Property $property, User $user){
        $company = $user->getCompany();
        $customId = $this->idGenerator->generate($property);
        $createdAt = new \DateTime();

        $property->setCustomId($customId);
        $property->setCreatedAt($createdAt);
        $property->setCompany($company);
        $property->setName($this->createPropertyName($property));
        $this->em->persist($property);
        $this->em->flush();
        return $property;
    }

    /**
     * @param Property $property
     * @param $data
     * @param User $user
     * @return Property|null|object
     */
    public function updateProperty(Property $property, $data, User $user) {
        if (isset($data['imageBase64'])) {
            if (empty($data['imageBase64'])) {
                $property->setImage('');
            } else {
                $fileName = "property_image_" . md5(uniqid()) . '.jpg';
                $savedImage = $this->fileUploader->saveImage($data['imageBase64'], $fileName);
                $property->setImage($savedImage);
            }
        }
        if (isset($data['website'])) {
            $property->setWebsite($data['website']);
        }
        if (isset($data['attachments'])) {
            $property->setAttachments($data['attachments']);
        }
        if (isset($data['description'])) {
            $property->setDescription($data['description']);
        }
        $this->em->persist($property);
        $this->em->flush();
        return $property;
    }

    /**
     * @param Property $property
     * @return string
     */
    private function createPropertyName(Property $property)
    {
        $sports = $property->getSports();
        $tournaments = $property->getTournament();
        $sportCategory = $property->getSportCategory();
        $seasons = $property->getSeasons();

        if (!empty($tournaments)){
            $name = array_values($tournaments)[0]->getName();

            if (!empty($seasons)) {

                foreach ($seasons as $season){
                    $name = $name." - ".$season->getYear();
                }
            }

        } else {
            $name = array_values($sports)[0]->getName();

            if(!empty($sportCategory)){
                $categoryName = array_values($sportCategory)[0]->getName();
                $name = $name. " - " .$categoryName;
            }
        }

        return $name;
    }
}

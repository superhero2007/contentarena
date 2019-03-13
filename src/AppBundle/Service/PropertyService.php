<?php

namespace AppBundle\Service;

use AppBundle\Doctrine\RandomIdGenerator;
use AppBundle\Entity\Bid;
use AppBundle\Entity\Company;
use AppBundle\Entity\Content;
use AppBundle\Entity\Property;
use AppBundle\Entity\User;
use AppBundle\Enum\BidStatusEnum;
use Doctrine\ORM\EntityManagerInterface;

class PropertyService
{
    private $em;

    private $repo;

    private $idGenerator;

    private $contentService;

    private $bidService;

    public function __construct(
        EntityManagerInterface $entityManager,
        RandomIdGenerator $idGenerator,
        ContentService $contentService,
        BidService $bidService

    ) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
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
                $bids = $this->bidService->getAllBidsByContent($listing);
                foreach ($bids as $bid){

                    /* @var Bid $bid */
                    if ($bid->getStatus()->getName() === BidStatusEnum::PENDING ){
                        $totalOpenBids++;
                    } else {
                        $totalClosedBids++;
                    }

                }

                /*foreach ($listing->getSalesPackages() as $salesBundle){
                    $bids = $this->bidService->getAllBidsBySalesBundle($salesBundle);

                    foreach ($bids as $bid){

                        if ($bid->getStatus()->getName() === BidStatusEnum::PENDING ){
                            $totalOpenBids++;
                        }

                    }

                    $totalClosedBids += count( $closedBids );
                }*/
            }

            $property->setListings($listings);
            $property->setClosedBids($totalClosedBids);
            $property->setOpenBids($totalOpenBids);
        }

        return $properties;
    }

    /**
     * @param $customId
     * @param Company $company
     * @return Property|null|object
     */
    public function getPropertyDetails($customId, Company $company){
        return $this->repo->findOneBy(array(
            "customId"=>$customId,
            "company" => $company
        ));
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

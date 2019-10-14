<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 27-Mar-18
 * Time: 17:16
 */

namespace AppBundle\Service;

use AppBundle\Entity\CompanySnapshot;
use AppBundle\Entity\Content;
use AppBundle\Entity\Country;
use AppBundle\Entity\Fixture;
use AppBundle\Entity\Listing;
use AppBundle\Entity\Property;
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\Season;
use AppBundle\Entity\SoldListing;
use AppBundle\Entity\User;
use AppBundle\Model\FixtureInterface;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Bid;
use AppBundle\Doctrine\RandomIdGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\DateTime;

class ListingService
{

    private $em;

    private $repository;

    private $idGenerator;

    public function __construct(
        EntityManagerInterface $entityManager,
        RandomIdGenerator $idGenerator
    )
    {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->repository = $this->em->getRepository("AppBundle:Listing");
    }

    public function getListing($customId, User $user) {
        return $this->repository->findOneBy(array("customId" => $customId));
    }

    public function getPropertyListings(Property $property) {
        return $this->repository->getPropertyListings($property);
    }

    /**
     * @param Listing $listing
     * @param User $user
     * @return mixed
     * @throws \Exception
     */
    public function saveListing(Listing $listing, User $user)
    {

        if ($listing->getCustomId() == null) {
            $customId = $this->idGenerator->generate($listing);
            $listing->setCustomId($customId);
        }

        if ($listing->getCreatedAt() == null) {
            $createdAt = new \DateTime();
            $listing->setCreatedAt($createdAt);
        }

        if ($listing->getCompany() == null) $listing->setCompany($user->getCompany());
        if ($listing->getOwner() == null) $listing->setOwner($user);
        if ($listing->getRelevance() == null) $listing->setRelevance(1);

        $listing->incrementStep();

        $this->em->persist($listing);
        $this->em->flush();
        return $listing;
    }

}

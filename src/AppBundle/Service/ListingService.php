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
use AppBundle\Enum\ListingLastActionEnum;
use AppBundle\Enum\ListingStatusEnum;
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

    private $switchUserService;

    public function __construct(
        EntityManagerInterface $entityManager,
        RandomIdGenerator $idGenerator,
        SwitchUserService $switchUserService
    )
    {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->switchUserService = $switchUserService;
        $this->repository = $this->em->getRepository("AppBundle:Listing");
    }

    public function getListing($customId, User $user) {

        $listing = $this->repository->findOneBy(array("customId" => $customId));
        $fixturesRepo = $this->em->getRepository("AppBundle:Fixture");
        $seasons = $listing->getSeasons();

        foreach ($seasons as $season){

            /* @var Season $season*/
            $fixtures = $fixturesRepo->findBy(array(
                "season" => $season,
                "listing" => $listing,
            ));

            if ( $fixtures != null ) $season->setFixtures($fixtures);
        }

        return $listing;
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

        if ($listing->getStatus() == null){
            $listing->setStatus(ListingStatusEnum::DRAFT);
            $listing->setLastAction(ListingLastActionEnum::DRAFT);
        }

        if ($listing->getStep() == 6){
            $listing->setStatus(ListingStatusEnum::APPROVED);
            $listing->setLastAction(ListingLastActionEnum::SUBMITTED);
        }


        $ghostMode = $this->switchUserService->isGhostModeActive();
        $adminUser = $this->switchUserService->getAdminUser();
        if ($ghostMode && $adminUser){
            $listing->setLastActionUser($adminUser);
        } else {
            $listing->setLastActionUser($user);
        }
        $listing->setLastActionDate(new \DateTime());

        if ($listing->getCompany() == null) $listing->setCompany($user->getCompany());
        if ($listing->getOwner() == null) $listing->setOwner($user);
        if ($listing->getRelevance() == null) $listing->setRelevance(1);

        $listing->incrementStep();

        $this->em->persist($listing);
        $this->em->flush();
        return $listing;
    }

    public function removeListing($customId) {

        if ($customId == null) return false;

        $listing = $this->em->getRepository('AppBundle:Listing')->findOneBy(array( 'customId' => $customId ));
        $threads = $this->em->getRepository('AppBundle:Thread')->findBy(array( 'listing' => $listing ));

        foreach ($threads as $thread){
            $this->em->remove($thread);
        }

        if ($customId != null){
            $this->em->remove($listing);
            $this->em->flush();
            return true;
        }

        return false;
    }

}

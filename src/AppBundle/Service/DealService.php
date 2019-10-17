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
use AppBundle\Entity\Deal;
use AppBundle\Entity\Fixture;
use AppBundle\Entity\Listing;
use AppBundle\Entity\Property;
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\Season;
use AppBundle\Entity\SoldListing;
use AppBundle\Entity\TerritorialBundle;
use AppBundle\Entity\User;
use AppBundle\Enum\DealStatusEnum;
use AppBundle\Model\FixtureInterface;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Bid;
use AppBundle\Doctrine\RandomIdGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\DateTime;

class DealService
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
        $this->repository = $this->em->getRepository("AppBundle:Deal");
    }

    public function getDealsByProperty(Property $property) {
        return $this->repository->findBy( array("property" => $property));
    }

    public function createCustomDeal(Deal $deal, User $user, TerritorialBundle $bundle)
    {

        $now = new \DateTime();
        $customId = $this->idGenerator->generate($deal);
        $deal->setCustomId($customId);
        $deal->setCreatedAt($now);
        $deal->setUpdatedAt($now);
        $deal->setCustom(true);
        $deal->setBundles(array($this->createCustomBundle($bundle)));
        $deal->setStatus(DealStatusEnum::CLOSED);
        $deal->setClosedBy($user);
        $deal->setCompany($user->getCompany());

        $this->em->persist($deal);
        $this->em->flush();

        return $deal;


    }

    private function createCustomBundle(TerritorialBundle $bundle) {

        $bundle->setCustom(true);
        $bundle->setMinimumBid(0);
        $bundle->setName($this->createCustomBundleName($bundle));

        return $bundle;

    }

    private function createCustomBundleName(TerritorialBundle $bundle) {

        $territories = $bundle->getTerritories();
        $limited = array_slice($territories, 0, 3);
        $name = join(", ", $limited);
        if (count($territories) > 3) $name = $name."...";

        return $name;
    }



}

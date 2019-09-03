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
        $this->repository = $this->em->getRepository("AppBundle:Content");
    }

    /**
     * @param Content $listing
     * @return mixed
     * @throws \Exception
     */
    public function createListing(Content $listing)
    {

        $customId = $this->idGenerator->generate($listing);
        $createdAt = new \DateTime();

        //$listing->setCustomId($customId);
        $listing->setCreatedAt($createdAt);
        //$listing->setCompany($company);
        //$listing->setName($this->createPropertyName($property));
        $this->em->persist($listing);
        $this->em->flush();
        return $listing;


    }



}

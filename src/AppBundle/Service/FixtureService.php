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
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\SoldListing;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Bid;
use AppBundle\Doctrine\RandomIdGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\DateTime;

class FixtureService
{

    private $em;

    private $repository;

    public function __construct(
        EntityManagerInterface $entityManager
    )
    {
        $this->em = $entityManager;
        $this->repository = $this->em->getRepository("AppBundle:Fixture");
    }

    public function findSeasonFixtures($season){

    }

    public function createFixtures($fixture){

    }



}

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

    /**
     * @param $fixtureObj
     * @param Season $season
     * @param Property $property
     * @return Fixture
     */
    public function createFixture($fixtureObj, Season $season, Property $property)
    {

        $now = new \DateTime();
        $fixture = new Fixture();
        $fixture->setName($fixtureObj['name']);
        if (isset($fixtureObj['round'])) $fixture->setRound($fixtureObj['round']);
        if (isset($fixtureObj['time'])) $fixture->setTime($fixtureObj['time']);
        if (isset($fixtureObj['timezone'])) $fixture->setTimezone($fixtureObj['timezone']);
        if (isset($fixtureObj['date'])) $fixture->setDate(new \DateTime($fixtureObj['date']));
        $fixture->setCustom(true);
        $fixture->setExternalId("ca:fixture:".$now->getTimestamp());
        $fixture->setSeason($season);
        $fixture->setProperty($property);
        $this->em->persist($fixture);
        $this->em->flush();

        return $fixture;


    }

    public function removeFixture($fixtureObj, User $user)
    {
        if (!isset($fixtureObj['id'])) throw new \Exception("id is required");
        $fixture = $this->repository->findOneBy(array(
            "id" => $fixtureObj['id']
        ));

        if ($fixture == null) throw new \Exception("Fixture does not exists");

        if ($fixture->getProperty()->getCompany()->getId() != $user->getCompany()->getId()) throw new \Exception("Invalid company user");

        $this->em->remove($fixture);
        $this->em->flush();

        return $fixture->getProperty();

    }

    public function updateFixture($fixtureObj, User $user)
    {
        if (!isset($fixtureObj['id'])) throw new \Exception("id is required");
        $fixture = $this->repository->findOneBy(array(
            "id" => $fixtureObj['id']
        ));

        if ($fixture == null) throw new \Exception("Fixture does not exists");

        if ($fixture->getProperty()->getCompany()->getId() != $user->getCompany()->getId()) throw new \Exception("Invalid company user");

        $fixture->setName($fixtureObj['name']);
        if (isset($fixtureObj['round'])) $fixture->setRound($fixtureObj['round']);
        if (isset($fixtureObj['time'])) $fixture->setTime($fixtureObj['time']);
        if (isset($fixtureObj['timezone'])) $fixture->setTimezone($fixtureObj['timezone']);
        if (isset($fixtureObj['date'])) $fixture->setDate(new \DateTime($fixtureObj['date']));
        $this->em->persist($fixture);
        $this->em->flush();

        return $fixture->getProperty();

    }



}

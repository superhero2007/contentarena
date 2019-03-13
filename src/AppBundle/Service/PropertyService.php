<?php

namespace AppBundle\Service;

use AppBundle\Doctrine\RandomIdGenerator;
use AppBundle\Entity\Company;
use AppBundle\Entity\Property;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class PropertyService
{
    private $em;

    private $repo;

    private $idGenerator;

    public function __construct(
        EntityManagerInterface $entityManager,
        RandomIdGenerator $idGenerator
    ) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->repo = $this->em->getRepository("AppBundle:Property");
    }

    /**
     * @param Company $company
     * @return Property[]|array
     */
    public function getAllCompanyProperties(Company $company){
        return $this->repo->findBy(array("company"=>$company));
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
        $property->setName("Test name");
        $this->em->persist($property);
        $this->em->flush();
        return $property;
    }
}

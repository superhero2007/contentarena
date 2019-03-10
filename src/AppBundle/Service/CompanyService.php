<?php

namespace AppBundle\Service;

use Doctrine\ORM\EntityManagerInterface;

class CompanyService
{
    private $em;

    public function __construct(
        EntityManagerInterface $entityManager
    ) {
        $this->em = $entityManager;
    }

    public function checkCompanyUniqueness($name, $id = null){
        $company = $this->em->getRepository('AppBundle:Company')->findAll();

        foreach ($company as $comp){
            if($comp->getLegalName() === $name && $id !== null && $comp->getId() === $id) return true;
            if($comp->getLegalName() === $name && $id !== null && $comp->getId() !== $id) return false;
            if($comp->getLegalName() === $name) return false;
        }

        return true;
    }
}

<?php

namespace AppBundle\Service;

use Doctrine\ORM\EntityManagerInterface;

class CountryRegionService
{
    private $em;

    public function __construct(
        EntityManagerInterface $entityManager
    ) {
        $this->em = $entityManager;
    }

    public function countRegionsById($id){
        $conn = $this->em->getConnection();
        $sql = "SELECT * FROM country_regions WHERE region_id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array('id' => $id));
        $result = $stmt->fetchAll();
        return count((array)$result);
    }
}

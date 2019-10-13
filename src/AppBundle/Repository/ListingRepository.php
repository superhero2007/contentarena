<?php

namespace AppBundle\Repository;

use AppBundle\Entity\Property;

/**
 * ListingRepository
 *
 */
class ListingRepository extends \Doctrine\ORM\EntityRepository
{

    /**
     * @param Property $property
     * @return array
     */
    public function getPropertyListings(Property $property){

        return $this->createQueryBuilder('c')
            ->andWhere('c.property = :property')
            ->setParameter('property',$property)
            ->orderBy('c.createdAt','DESC')
            ->getQuery()->getResult();
    }
}

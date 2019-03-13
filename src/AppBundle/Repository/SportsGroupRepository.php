<?php

namespace AppBundle\Repository;

/**
 * SportsGroupRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class SportsGroupRepository extends \Doctrine\ORM\EntityRepository
{
    public function getNonEmptySportsGroups(){


        return $this->createQueryBuilder('n')
            ->join('n.sports', 'ns')
            ->where('ns.id IS NOT NULL')
            ->getQuery()
            ->getResult();
    }
}

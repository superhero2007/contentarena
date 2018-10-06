<?php

namespace AppBundle\Repository;

/**
 * TournamentRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class TournamentRepository extends \Doctrine\ORM\EntityRepository
{
    public function getSearchResultsByName($name){
        $qb = $this->_em->createQueryBuilder();

        $qb->select('t', 'sport', 'sportCategory')
            ->from($this->_entityName, 't')
            ->where( 't.name like :name')
            ->orWhere("sportCategory.name like :name")
            ->andWhere("t.sport IS NOT NULL")
            ->setParameter('name', $name )
            ->leftJoin('t.sport', 'sport')
            ->leftJoin('t.sportCategory', 'sportCategory');

        return $qb->getQuery()->getArrayResult();
    }
}

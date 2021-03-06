<?php

namespace AppBundle\Repository;
use Symfony\Component\Validator\Constraints\DateTime;

/**
 * UserRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class UserRepository extends \Doctrine\ORM\EntityRepository
{

    /**
     * @param string $role
     *
     * @return array
     */
    public function findByRole($role)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('u')
            ->from($this->_entityName, 'u')
            ->where($qb->expr()->orX(
                $qb->expr()->like('u.roles', ':roles')
            ))
            ->setParameter('roles', '%"'.$role.'"%');

        return $qb->getQuery()->getResult();
    }

    public function findNotEnabled()
    {
        $fecha = new \DateTime();
        $qb = $this->_em->createQueryBuilder();
        $qb->select('u')
            ->from($this->_entityName, 'u')
            ->where($qb->expr()->andX(
                $qb->expr()->like('u.enabled', ':enabled'),
                $qb->expr()->like('u.unconfirmedChecked', ':unconfirmed'),
                $qb->expr()->lt('u.registeredAt',':date')
            ))
            ->setParameter('enabled', 0)
            ->setParameter('date', $fecha->modify('-2 day'))
            ->setParameter('unconfirmed', 0);

        return $qb->getQuery()->getResult();
    }

    public function findMatchingTerritoriesAndSportBuyer($territories, $sports)
    {
        return $this->createQueryBuilder('u')
            ->innerJoin('u.preferredBuyerCountries', 'c')
            ->innerJoin('u.preferredBuyerSports', 's')
            ->where('c.id IN (:territories)')
            ->andWhere('s.id IN (:sports)')
            ->setParameter('territories',$territories)
            ->setParameter('sports',$sports)
            ->getQuery()
            ->getResult();
    }

    public function findByRangeAndLastLogin($rangeStart, $rangeEnd, $lastLogin)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('u')
            ->from($this->_entityName, 'u')
            ->where( 'u.registeredAt >= :rangeStart')
            ->andWhere( 'u.registeredAt <= :rangeEnd')
            ->setParameter('rangeStart', $rangeStart)
            ->setParameter('rangeEnd', $rangeEnd);

        if ( $lastLogin !== null ){
            $queryString = ($lastLogin) ? "u.lastLogin IS NOT NULL": "u.lastLogin is NULL";
            $qb->andWhere( $queryString );
        }

        return $qb->getQuery()->getResult();
    }

}

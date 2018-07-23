<?php

namespace AppBundle\Repository;

/**
 * BidRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class BidRepository extends \Doctrine\ORM\EntityRepository
{
    public function getPendingBids($user){
        $query = $this->createQueryBuilder('b')
            ->join('b.content', 'c')
            ->join('b.status', 'status')
            ->join('b.type', 'type')
            ->where('b.buyerUser = :user')
            ->andWhere('status.name = :pending')
            ->andWhere('type.name = :type')
            ->setParameter('pending', 'PENDING')
            ->setParameter('type', 'BIDDING')
            ->setParameter('user', $user)
            ->getQuery();

        return $query->getResult();
    }

    public function getPendingBidsByContent($content){
        $query = $this->createQueryBuilder('b')
            ->join('b.status', 'status')
            ->join('b.type', 'type')
            ->where('b.content = :content')
            ->andWhere('status.name = :pending')
            ->andWhere('type.name = :type')
            ->setParameter('pending', 'PENDING')
            ->setParameter('type', 'BIDDING')
            ->setParameter('content', $content)
            ->getQuery();

        return $query->getResult();
    }

    public function getAllBidsByContent($content){
        $query = $this->createQueryBuilder('b')
            ->where('b.content = :content')
            ->setParameter('content', $content)
            ->getQuery();

        return $query->getResult();
    }

    public function getAllBidsBySalesBundle($salesBundle){
        $query = $this->createQueryBuilder('b')
            ->where('b.salesPackage = :salesBundle')
            ->setParameter('salesBundle', $salesBundle)
            ->getQuery();

        return $query->getResult();
    }

    public function getRejectedBids($user){
        $query = $this->createQueryBuilder('b')
            ->join('b.content', 'c')
            ->join('b.status', 'status')
            ->join('b.type', 'type')
            ->where('b.buyerUser = :user')
            ->andWhere('status.name = :rejected')
            ->andWhere('type.name = :type')
            ->setParameter('rejected', 'REJECTED')
            ->setParameter('type', 'BIDDING')
            ->setParameter('user', $user)
            ->getQuery();

        return $query->getResult();
    }

    public function getAllBids($user){
        $query = $this->createQueryBuilder('b')
            ->join('b.content', 'c')
            ->join('b.status', 'status')
            ->join('b.type', 'type')
            ->where('b.buyerUser = :user')
            ->setParameter('user', $user)
            ->getQuery();

        return $query->getResult();
    }

    public function getClosedBids($user){
        $query = $this->createQueryBuilder('b')
            ->orderBy("b.createdAt")
            ->join('b.content', 'c')
            ->join('b.status', 'status')
            ->where('b.buyerUser = :user')
            ->andWhere('status.name = :approved')
            ->setParameter('approved', 'APPROVED')
            ->setParameter('user', $user)
            ->getQuery();

        return $query->getResult();
    }

}

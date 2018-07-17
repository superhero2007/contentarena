<?php

namespace AppBundle\Repository;


use AppBundle\Entity\Country;
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\Sport;
use AppBundle\Entity\Territory;
use AppBundle\Entity\ContentFilter;
use AppBundle\Entity\User;


/**
 * ContentRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ContentRepository extends \Doctrine\ORM\EntityRepository
{


    public function getSearchContent($value = null, $filter = null)
    {
        if($value){
            return $this->createQueryBuilder('c')
                ->leftJoin('c.company', 'com')
                ->leftJoin('c.sport', 's')
                ->leftJoin('c.tournament', 't')
                ->leftJoin('c.sportCategory', 'cat')
                ->orWhere('c.description LIKE :value')
                ->orWhere('c.releaseYear LIKE :value')
                ->orWhere('c.ownLicense LIKE :value')
                ->orWhere('c.brochure LIKE :value')
                ->orWhere('c.programName LIKE :value')
                ->orWhere('c.programType LIKE :value')
                ->orWhere('c.seriesType LIKE :value')
                ->orWhere('com.legalName LIKE :value')
                ->orWhere('s.name LIKE :value')
                ->orWhere('t.name LIKE :value')
                ->orWhere('cat.name LIKE :value')
                ->setParameter('value', '%'.$value.'%')
                ->getQuery()
                ->getResult();

        }
        elseif($filter){
            $query = $this->createQueryBuilder('c')
                ->leftJoin('c.sport', 's');
            if(!empty($filter->sports)){
                $query->andWhere('s.externalId = :sport')
                    ->setParameter('sport',$filter->sports);
            }


            if(!empty($filter->timing)){
                if($filter->timing == 'upcoming'){
                    $date = date('Y-m-d h:i:s',time() - 3600 * 24 * 10);
                    $query->andWhere('c.expiresAt < :date')
                        ->setParameter('date',$date);
                }else if($filter->timing == 'recent'){
                    $date =date('Y-m-d h:i:s',time() - 3600 * 24 * 5);
                    $query->andWhere('c.createdAt = :date')
                        ->setParameter('date',$date);
                }else{
                    $date = json_decode($filter->timing);
                    $startDate = date('Y-m-d H:i:s',strtotime(str_replace(' ','-',$date->startDate)));
                    $endDate = date('Y-m-d H:i:s',strtotime(str_replace(' ','-',$date->endDate)));

                    $query->andWhere('c.createdAt >= :startDate')
                        ->andWhere('c.createdAt <= :endDate')
                        ->setParameter('startDate',$startDate)
                        ->setParameter('endDate',$endDate);
                }
            }

            return $query;
        }

    }

    public function getFilteredContent( ContentFilter $filter, $term = null, $exclusive = null ){

        $query = $this->createQueryBuilder('content');

        if($term){
            $query
                ->leftJoin('content.company', 'com')
                ->leftJoin('content.tournament', 't')
                ->leftJoin('content.sportCategory', 'cat')
                ->leftJoin('content.sports', 'sport')
                ->leftJoin('content.seasons', 'season')
                ->leftJoin('content.rightsPackage', 'rights')
                ->orWhere('content.description LIKE :value')
                ->orWhere('content.selectedRightsBySuperRight LIKE :value')
                ->orWhere('content.name LIKE :value')
                ->orWhere('com.legalName LIKE :value')
                ->orWhere('rights.name LIKE :value')
                ->orWhere('t.name LIKE :value')
                ->orWhere('cat.name LIKE :value')
                ->orWhere('sport.name LIKE :value')
                ->orWhere('season.name LIKE :value')
                ->setParameter('value', '%'.trim($term).'%');
        }

        if($exclusive == true){
            $query
                ->andWhere('content.selectedRightsBySuperRight LIKE :value')
                ->setParameter('value', '%"exclusive";b:1%');
        }

        if ( count( $filter->getSports() ) > 0 ) {
            $query
                ->leftJoin('content.sports', 'sports')
                ->andWhere("sports IN(:sportList)")
                //->andWhere("content.approved = true")
                ->setParameter('sportList', $filter->getSports());
        }

        if ( count( $filter->getCountries() ) > 0 ) {
            $query
                ->leftJoin('content.salesPackages', 'salesPackages')
                ->leftJoin('salesPackages.territories', 'territories')
                ->andWhere($query->expr()->orX(
                    $query->expr()->eq('salesPackages.territoriesMethod', ':worldwide'),
                    $query->expr()->in('territories', ':countries')
                ))
                ->setParameter('countries', $filter->getCountries())
                ->setParameter('worldwide', 'WORLDWIDE');
        }

        if ( count( $filter->getSuperRights() ) > 0 ) {
            $query
                ->leftJoin('content.rightsPackage', 'rightsPackage')
                ->andWhere($query->expr()->orX(
                    $query->expr()->in('rightsPackage', ':rightsPackages')
                ))
                ->setParameter('rightsPackages', $filter->getSuperRights());
        }

        if ( $filter->getFromDate() != null && $filter->getToDate() != null ) {
            $query->andWhere('content.expiresAt >= :fromDate')
                ->andWhere('content.expiresAt <= :toDate')
                ->setParameter('fromDate',$filter->getFromDate())
                ->setParameter('toDate',$filter->getToDate());
        }

        //$query->andWhere('content.draft = :isDraft')->setParameter('isDraft',false);
        //TODO : filter by approved

        $query->orderBy('content.'.$filter->getOrderBy(), $filter->getSortOrder());

        $result = $query->getQuery()->getResult();

        return $result;

    }

    public function getActiveSports(  ){

        $query = $this->createQueryBuilder('content');

        $query
            ->select('sports.name')
            ->leftJoin('content.sports', 'sports');

        $query->groupBy("sports.name");

        $result = $query->getQuery()->getResult();

        return $result;

    }

    public function getTerritoryInfo($customId){
        $data = [];
        $countriesRepository = $this->getEntityManager()->getRepository(Country::class);
        $territories = $this->getEntityManager()->getRepository(Territory::class)->findAll();
        $content = $this->findOneBy(['customId'=>$customId]);

        $salesPackages = $content->getSalesPackages();
        foreach($salesPackages as $index => $salesPackage){

            if(!$salesPackage->getSellAsPackage()){

                if( $salesPackage->isWorldwide() ){

                    $result = $countriesRepository->createQueryBuilder('c')
                        ->where('c.id >= 1')
                        ->getQuery()
                        ->getResult(2);

                } else {
                    $territories = array();
                    if ( count( $salesPackage->getSelectedCountries() ) > 0 ){
                        $result = $salesPackage->getSelectedCountries();
                    } elseif ( count( $salesPackage->getExcludedCountries() ) > 0 ){
                        $result = $salesPackage->getExcludedCountries();
                    }

                    foreach ( $result->getIterator() as $country ){
                        if ( !in_array( $country->getTerritory(),$territories, true ) ){
                            $territories[] = $country->getTerritory();
                        }
                    }
                }

                $data[] = [
                    'salesPackage'=>$salesPackage,
                    'countries'=>$result,
                ];
            }
        }

        $data['territories'] =$territories;

        return $data;
    }

    /**
     * @param SalesPackage[] $salesPackages
     * @return array
     */
    public function getBuyPackages($salesPackages){

        $data = [];

        if(count($salesPackages) > 0){

            foreach ($salesPackages as $salesPackage){

                if($salesPackage->getSellAsPackage() ){
                    $countries = [];
                    if( !$salesPackage->isWorldwide() ){

                        if( count( $salesPackage->getSelectedCountries() ) > 0){
                            $countries = $salesPackage->getSelectedCountries();
                        } elseif ( count( $salesPackage->getExcludedCountries() ) > 0 ){
                            $countries = $salesPackage->getExcludedCountries();
                        }

                    }

                    $data[] = [
                        'salesPackage'=>$salesPackage,
                        'countries'=>$countries,
                    ];

                }
            }

            return $data;
        }
        return [];
    }

    public function getExpiredData(){

        $now = date('Y-m-d H:i:s');

        return $this->createQueryBuilder('c')
            ->where('c.expiresAt < :now')
            ->setParameter('now',$now)
            ->orderBy('c.createdAt','DESC')
            ->getQuery()->getResult();
    }

    public function getActiveContent(){

        $now = date('Y-m-d H:i:s');

        return $this->createQueryBuilder('c')
            ->where('c.expiresAt > :now')
            ->setParameter('now',$now)
            ->andWhere('c.draft = :isDraft')
            ->setParameter('isDraft',false)
            ->andWhere('c.approved = :isApproved')
            ->setParameter('isApproved',true)
            ->orderBy('c.createdAt','DESC')
            ->getQuery()->getResult();
    }

    public function getDrafts($user){

        return $this->createQueryBuilder('c')
            ->innerJoin("c.status", "status")
            ->andWhere('c.company = :company')
            ->andWhere('status.name = :statusName')
            ->setParameter('statusName',"DRAFT")
            ->setParameter('company',$user->getCompany())
            ->orderBy('c.createdAt','DESC')
            ->getQuery()->getResult();
    }

    public function getInactive($user){

        return $this->createQueryBuilder('c')
            ->innerJoin("c.status", "status")
            ->andWhere('c.company = :company')
            ->andWhere('status.name = :inactiveStatusName OR status.name = :rejectedStatusName OR status = :isNull')
            ->setParameter('inactiveStatusName',"INACTIVE")
            ->setParameter('rejectedStatusName',"REJECTED")
            ->setParameter('isNull',null)
            ->setParameter('company',$user->getCompany())
            ->orderBy('c.createdAt','DESC')
            ->getQuery()->getResult();
    }

    /**
     * @param User $user
     * @return array
     */
    public function getActive($user){

        $now = date('Y-m-d H:i:s');

        return $this->createQueryBuilder('c')
            ->innerJoin("c.status", "status")
            ->where('c.expiresAt > :now')
            ->andWhere('c.company = :company')
            ->andWhere('status.name = :pendingStatusName OR status.name = :approvedStatusName')
            ->setParameter('now',$now)
            ->setParameter('pendingStatusName',"PENDING")
            ->setParameter('approvedStatusName',"APPROVED")
            ->setParameter('company',$user->getCompany())
            ->orderBy('c.createdAt','DESC')
            ->getQuery()->getResult();
    }

    /**
     * @param User $user
     * @return array
     */
    public function getExpired($user){

        $now = date('Y-m-d H:i:s');

        return $this->createQueryBuilder('c')
            ->innerJoin("c.status", "status")
            ->where('c.company = :company')
            ->andWhere(':now > c.expiresAt OR status.name = :statusName')
            ->setParameter('now',$now)
            ->setParameter('statusName',"SOLD_OUT")
            ->setParameter('company',$user->getCompany())
            ->orderBy('c.createdAt','DESC')
            ->getQuery()->getResult();
    }

    public function getContentInfo(){
        return $this->createQueryBuilder('c')
            ->where('c.id > :id')
            ->setParameter('id',1)
            ->getQuery()->getResult();
    }

}





<?php

namespace AppBundle\Repository;


use AppBundle\Entity\Country;
use AppBundle\Entity\Territory;


/**
 * ContentRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ContentRepository extends \Doctrine\ORM\EntityRepository
{


    public function getSearchContent($value)
    {

        return $this->createQueryBuilder('c')
            ->leftJoin('c.company', 'com')
            ->leftJoin('c.sport', 's')
            ->leftJoin('c.tournament', 't')
            ->leftJoin('c.sportCategory', 'cat')
            ->where('c.eventType LIKE :value')
            ->orWhere('c.description LIKE :value')
            ->orWhere('c.releaseYear LIKE :value')
            ->orWhere('c.ownLicense LIKE :value')
            ->orWhere('c.brochure LIKE :value')
            ->orWhere('c.programName LIKE :value')
            ->orWhere('c.programType LIKE :value')
            ->orWhere('c.seriesType LIKE :value')
            ->orWhere('c.salesPackages LIKE :value')
            ->orWhere('c.distributionPackages LIKE :value')
            ->orWhere('com.legalName LIKE :value')
            ->orWhere('s.name LIKE :value')
            ->orWhere('t.name LIKE :value')
            ->orWhere('cat.name LIKE :value')
            ->setParameter('value', '%'.$value.'%')
            ->getQuery()
            ->getResult();

    }

    public function getTerritoryInfo($customId){
        $data = [];
        $arr = [];
        $codes = [];

        $country = $this->getEntityManager()->getRepository(Country::class);
        $content = $this->findOneBy(['customId'=>$customId]);

        $salesPackages = $content->getSalesPackages();
        foreach($salesPackages as $index => $salesPackage){

            if(!$salesPackage['territoryAsPackage']){

                if($salesPackage['territories'] == 'worldwide'){

                    $result = $country->createQueryBuilder('c')
                        ->where('c.id >= 1')
                        ->getQuery()
                        ->getResult(2);

                }elseif($salesPackage['territories'] == 'selected'){
                    $str = $salesPackage['selectedTerritories'];
                    $result = $country->createQueryBuilder('c')
                        ->where('c.country_code IN (:country)')
                        ->setParameter('country',$str)
                        ->getQuery()
                        ->getResult(2);

                }elseif($salesPackage['territories'] == 'excluded'){
                    $str = $salesPackage['excludedTerritories'];

                    $result = $country->createQueryBuilder('c')
                        ->where('c.country_code NOT IN (:country)')
                        ->setParameter('country',$str)
                        ->getQuery()
                        ->getResult(2);
                }


                if ($index > 0) {
                    foreach ($codes as $inc => $codeArray) {
                        if ($index > $inc) {
                            foreach ($result as $i => $item) {
                                if (in_array($item['country_code'], $codeArray)) {
                                    unset($result[$i]);
                                }
                            }
                        }
                    }
                }

                $codes[$index] = array_column($result,'country_code');

                $a = array_unique(array_column($result,'territoryId'));
                $arr = array_merge($arr,$a);

                $data[] = [
                    'salesPackage'=>$salesPackage,
                    'countries'=>$result,
                ];
            }
        }


        $territories = $this->getEntityManager()->getRepository(Territory::class)
            ->createQueryBuilder('t')
            ->where('t.id IN (:ids)')
            ->setParameter('ids',array_unique($arr))
            ->getQuery()
            ->getResult(2);

        $data['territories'] =$territories;

        return $data;
    }

}
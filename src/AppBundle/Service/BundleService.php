<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 27-Mar-18
 * Time: 17:16
 */

namespace AppBundle\Service;

use AppBundle\Entity\CompanySnapshot;
use AppBundle\Entity\Content;
use AppBundle\Entity\Country;
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\SoldListing;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Bid;
use AppBundle\Doctrine\RandomIdGenerator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\DateTime;

class BundleService
{

    private $em;

    private $idGenerator;

    private $fileUploader;

    private $messageService;

    public function __construct(EntityManager $entityManager, RandomIdGenerator $idGenerator, FileUploader $fileUploader, MessageService $messageService) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
        $this->messageService = $messageService;
    }

    /**
     * @param $bundles
     * @param Content $content
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function setSoldCustomBundles($bundles, Content $content){
        $exclusive = $content->isExclusive();

        if ( $exclusive ){
            foreach ($bundles as $bundle){
                /* @var SalesPackage $bundle */
                $bundle->setSold(true);
                $this->em->persist($bundle);
            }
        }
        $this->em->flush();

    }

    public function findBundle($salesPackage) {
        $bundle = $salesPackage = $this->em->getRepository('AppBundle:SalesPackage')->find($salesPackage);
        return $bundle;
    }

    public function getCustomBundle($bidsData, $fee){
        $refBundle = $this->findBundle($bidsData[0]['salesPackage']);
        $bundles = array();
        $bundle = new SalesPackage();
        $bundle->setSold(false);
        $bundle->setCustom(true);
        $bundle->setCurrency($refBundle->getCurrency());
        $bundle->setSalesMethod($this->em->getRepository('AppBundle:BidType')->findOneBy(array('name' => "BIDDING")));
        $bundle->setBundleMethod("SELL_AS_BUNDLE");
        $bundle->setTerritoriesMethod("SELECTED_TERRITORIES");
        $bundle->setFee($fee);

        $countries = array();

        foreach ( $bidsData as $bidData){
            $refBundle = $this->findBundle($bidData['salesPackage']);
            $bundles[] = $refBundle;
            foreach( $refBundle->getTerritories() as $territory ){
                $countries[] = $territory;
            }
        }
        $name = $this->getCustomName($bundles);
        $bundle->setTerritories($countries);
        $bundle->setInstallments($this->getInstallments($bundles));
        $bundle->setName($name);
        $this->em->persist($bundle);

        return $bundle;
    }

    public function getCustomName( $bundles){
        $bundles = array_slice($bundles, 0, 3);
        $new_arr = array();
        foreach($bundles as $bundle)
        {
            /* @var SalesPackage $bundle */
            /* @var Country $country */
            $country = $bundle->getTerritories()[0];
            $new_arr[] = $country->getName();
        }
        return implode(', ',$new_arr);

    }

    public function getInstallments ( $bundles ){

        $bundles = array_filter($bundles, array($this, "filterBiddingBundles"));
        $ascending = function($bundleA, $bundleB) use ($bundles){
            $filteredItems1 = array_filter($bundles, function($bundle) use($bundleA){
                /* @var SalesPackage $bundle */
                /* @var SalesPackage $bundleA */

                return count($bundle->getInstallments()) == count($bundleA->getInstallments());
            });

            $filteredItems2 = array_filter($bundles, function($bundle) use($bundleB){
                /* @var SalesPackage $bundle */
                /* @var SalesPackage $bundleB */

                return count($bundle->getInstallments()) == count($bundleB->getInstallments());
            });

            return count($filteredItems1) - count($filteredItems2);

        };
        usort($bundles, $ascending);


        return (count($bundles) > 0 ) ? end($bundles)->getInstallments() : null;

    }

    private static function filterBiddingBundles(SalesPackage $bundle) {
        return $bundle->getSalesMethod()->getName() === "BIDDING";
    }

    private function getCountry($country){

        $country =  $this->em
            ->getRepository('AppBundle:Country')
            ->findOneBy(array('name' => $country));

        return $country;
    }
}
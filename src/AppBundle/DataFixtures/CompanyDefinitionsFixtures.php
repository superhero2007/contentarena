<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace AppBundle\DataFixtures;

use AppBundle\Entity\BidType;
use AppBundle\Entity\CompanyDefinitions;
use AppBundle\Entity\Currency;
use AppBundle\Entity\SourceDefinitions;
use AppBundle\Entity\SourceLicenseTerm;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class CompanyDefinitionsFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {

        $companies = $manager->getRepository("AppBundle:Company")->findAll();
        $defRepository = $manager->getRepository("AppBundle:CompanyDefinitions");
        $itemsToRemove = [
            "Internet", "OTT", "Internet Transmission"
        ];
        $itemsToAdd = array(
            array('12', true, 'Internet/OTT', 'means the digital Transmission of the Program by way of any telecommunication system utilizing TCP/IP protocols and/or related protocols including (i) OTT (ii) Transmission on a website or (iii) Transmission on Social Media Platforms, but excluding the IPTV transmission available to the public subject to territorial restrictions and other restrictions agreed between the Parties or applied by the Licensee when exploiting the rights'),
        );

        foreach ( $companies as $company ){

            $definitions = $defRepository->findBy(array("company" => $company));

            if ( count($definitions) == 0 ) continue;

            if ($company)

            foreach ($itemsToRemove as $item){
                $item = $defRepository->findOneBy( array('name' => $item, "company" => $company ));

                if ( $item != null ){
                    $manager->remove($item);
                }
            }

            $manager->flush();

            foreach ($itemsToAdd as $itemToAdd) {

                $en = $defRepository->findOneBy( array('name' => $itemToAdd[2], "company" => $company  ));

                if ( $en == null ){
                    $item = new CompanyDefinitions();
                    $item->setCompany($company);
                    $item->setPosition($itemToAdd[0]);
                    $item->setEditable($itemToAdd[1]);
                    $item->setName($itemToAdd[2]);
                    $item->setContent($itemToAdd[3]);
                    $item->setCustom(false);
                    $manager->persist($item);
                }
            }

            $manager->flush();

        }
    }
}

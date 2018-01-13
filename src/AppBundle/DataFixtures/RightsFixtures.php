<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace AppBundle\DataFixtures;

use AppBundle\Entity\Rights;
use AppBundle\Entity\RightsItemContent;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\DataFixtures\RightsItemContentFixtures;
use AppBundle\DataFixtures\RightsGroupFixtures;
use AppBundle\DataFixtures\RightsPackageFixtures;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class RightsFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            array("Transmission Means", "Main Information", array(
                "Transmission Means - Cable& IPTV",
                "Transmission Means - Satellite",
                "Transmission Means - OTT",
                "Transmission Means - Mobile",
                "Transmission Means - Digital Terrestrial",
                "Transmission Means - Internet"
            ), array(
                "Live transmission","Delayed transmission", "News access", "Highlights", "Program", "Live betting", "Clips", "Archive"
            ), "", true, true),

            array("Exclusivity", "Main Information", array(
                "Exclusivity - Yes",
                "Exclusivity - No",
            ), array(
                "Live transmission","Delayed transmission", "News access", "Highlights", "Program", "Live betting", "Clips", "Archive"
            ), "", false, false),

            array("Exploitation Form", "Main Information", array(
                "Exploitation Form - Free only",
                "Exploitation Form - Pay only",
                "Exploitation Form - Inship&Inflight",
                "Exploitation Form - Closed circuit hospitality"
            ), array(
                "Live transmission","Delayed transmission", "News access", "Highlights", "Program", "Live betting", "Clips", "Archive"
            ), "", true, true),

        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:Rights")->findOneBy( array('name' => $content[$i][0] ));

            if ( $en == null ){

                $group = $manager->getRepository("AppBundle:RightsGroup")->findOneBy( array('name' => $content[$i][1] ));
                $items = [];
                $packages = [];

                $emailContent = new Rights();
                $emailContent->setName($content[$i][0]);
                if ( $group != null) $emailContent->setGroup($group);

                if ( count($content[$i][2]) > 0){
                    for ($x = 0; $x < count($content[$i][2]); $x++) {

                        $data = $manager->getRepository("AppBundle:RightsItemContent")->findOneBy( array('name' => $content[$i][2][$x] ));
                        $items[] = $data;
                    }
                }

                if ( count($content[$i][3]) > 0){
                    for ($x = 0; $x < count($content[$i][3]); $x++) {
                        $data = $manager->getRepository("AppBundle:RightsPackage")->findOneBy( array('name' => $content[$i][3][$x] ));
                        $packages[] = $data;
                    }
                }

                $emailContent->setItems($items);
                $emailContent->setPackages($packages);
                $emailContent->setDefinition($content[$i][4]);
                $emailContent->setMultiple($content[$i][5]);
                $emailContent->setAllEnabled($content[$i][5]);
                $manager->persist($emailContent);
            }
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            RightsItemContentFixtures::class,
            RightsPackageFixtures::class,
            RightsGroupFixtures::class
        );
    }
}
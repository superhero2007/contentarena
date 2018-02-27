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
            ), "", true, true, true),

            array("Exclusivity", "Main Information", array(
                "Exclusivity - Yes",
                "Exclusivity - No",
            ), array(
                "Live transmission","Delayed transmission", "News access", "Highlights", "Program", "Live betting", "Clips", "Archive"
            ), "", false, false, true),

            array("Exploitation Form", "Main Information", array(
                "Exploitation Form - Free only",
                "Exploitation Form - Pay only",
                "Exploitation Form - Inship&Inflight",
                "Exploitation Form - Closed circuit hospitality"
            ), array(
                "Live transmission","Delayed transmission", "News access", "Highlights", "Program", "Live betting", "Clips", "Archive"
            ), "", true, true, true),

            array("Reserved Rights", "Main Information", array(
                "Reserved Rights - No rights reserved",
                "Reserved Rights - 2",
                "Reserved Rights - 3",
                "Reserved Rights - 4",
                "Reserved Rights - Other",
            ), array(
                "Live transmission","Delayed transmission", "News access", "Highlights", "Program", "Live betting", "Clips", "Archive"
            ), "", false, false, true),

            array("Time Embargo", "Main Information", array(
                "Time Embargo - No",
                "Time Embargo - Yer",
            ), array(
                "Delayed transmission", "News access", "Highlights", "Clips"
            ), "", false, false, false),

            array("Video standard", "Production standards", array(
                "Video Standard - SD",
                "Video Standard - HD",
                "Video Standard - UHD",
                "Video Standard - VR",
            ), array(
                "Live transmission","Delayed transmission", "News access", "Highlights", "Program", "Live betting", "Clips", "Archive"
            ), "", false, false, false),

            array("Graphics", "Production standards", array(
                "Graphics - Yes",
                "Graphics - No",
            ), array(
                "Live transmission","Delayed transmission", "News access", "Highlights", "Program", "Live betting", "Clips", "Archive"
            ), "", false, false, false),

            array("Subtitles", "Production standards", array(
                "Subtitles - Yes",
                "Subtitles - No",
            ), array(
                "Program"
            ), "", false, false, false),

            array("Commentary", "Production standards", array(
                "Commentary - Yes",
                "Commentary - No",
            ), array(
                "Live transmission","Delayed transmission", "News access", "Highlights", "Program", "Live betting", "Clips", "Archive"
            ), "", false, false, false),

            array("Script", "Production standards", array(
                "Script - Yes",
                "Script - No",
            ), array(
                "Program"
            ), "", false, false, false),

            array("Number of Cameras", "Production standards", array(
                "Number of Cameras - Minimum",
                "Number of Cameras - Defined",
                "Number of Cameras - No",
            ), array(
                "Live transmission","Delayed transmission", "News access", "Highlights", "Program", "Live betting", "Clips", "Archive"
            ), "", false, false, false),

            array("Aspect Ratio", "Production standards", array(
                "Aspect Ratio - 16:9",
                "Aspect Ratio - 4:3",
                "Aspect Ratio - custom",
            ), array(
                "Live transmission","Delayed transmission", "News access", "Highlights", "Program", "Live betting", "Clips", "Archive"
            ), "", false, false, false),

            array("Highlights cut available", "Main Information", array(
                "Highlights cut available - Yes",
                "Highlights cut available - No",
            ), array(
                "Highlights"
            ), "", false, false, false),

            array("Clips cut available", "Main Information", array(
                "Clips cut available - Yes",
                "Clips cut available - No",
            ), array(
                "Clips"
            ), "", false, false, false),

            array("News access cut available", "Main Information", array(
                "News access cut available - Yes",
                "News access cut available - No",
            ), array(
                "News access"
            ), "", false, false, false),


            array("Distributed with Highlights", "Main Information", array(
                "Distributed with Highlights - Yes",
                "Distributed with Highlights - No",
            ), array(
                "News access", "Clips"
            ), "", false, false, false),

            array("Distributed with Clips", "Main Information", array(
                "Distributed with Clips - Yes",
                "Distributed with Clips - No",
            ), array(
                "News access"
            ), "", false, false, false),

            array("Distributed with Live Signal", "Main Information", array(
                "Distributed with Live Signal - Yes",
                "Distributed with Live Signal - No",
            ), array(
                "News access", "Clips", "Highlights"
            ), "", false, false, false),


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
                        if ($data != null ) $items[] = $data;
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
                $emailContent->setAllEnabled($content[$i][6]);
                $emailContent->setCollectively($content[$i][7]);
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
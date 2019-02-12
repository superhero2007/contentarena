<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace AppBundle\DataFixtures;

use AppBundle\Entity\RightsItemContent;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class NewRightsItemFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(

            array("Technical Delivery Time", true ),
            array("Technical Fee", true),

        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:RightsItemContent")->findOneBy( array('name' => $content[$i][0] ));

            if ( $en != null ){
                $en->setNotOptional($content[$i][1]);
                $manager->persist($en);
            }
        }

        $manager->flush();
    }
}
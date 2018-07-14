<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace AppBundle\DataFixtures;

use AppBundle\Entity\RightsPackage;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class RightsPackageFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            'Live transmission',
            'Delayed transmission',
            'Live betting',
            'News access',
            'Highlights',
            'Clips',
            'Program'
        );


        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:RightsPackage")->findOneBy( array('name' => $content[$i] ));

            if ( $en == null ){
                $emailContent = new RightsPackage();
                $emailContent->setName($content[$i]);
                $manager->persist($emailContent);
            }

        }

        $manager->flush();
    }
}
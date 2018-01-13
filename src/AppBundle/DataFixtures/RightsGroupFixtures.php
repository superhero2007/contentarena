<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace AppBundle\DataFixtures;

use AppBundle\Entity\RightsGroup;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class RightsGroupFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            'Main Information',
            'Technical Information',
            'Price & Territory'
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:RightsGroup")->findOneBy( array('name' => $content[$i] ));

            if ( $en == null ){
                $emailContent = new RightsGroup();
                $emailContent->setName($content[$i]);
                $manager->persist($emailContent);
            }
        }

        $manager->flush();
    }
}
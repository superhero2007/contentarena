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
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class BidTypesFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            'Open',
            'Closed',
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:BidType")->findOneBy( array('name' => $content[$i] ));

            if ( $en == null ){
                $emailContent = new BidType();
                $emailContent->setName($content[$i]);
                $manager->persist($emailContent);
            }
        }

        $manager->flush();
    }
}
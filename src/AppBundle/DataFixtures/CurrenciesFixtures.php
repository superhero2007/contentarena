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
use AppBundle\Entity\Currency;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class CurrenciesFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            array('USD', 'Dolars'),
            array('EUR', 'Euros')
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:Currency")->findOneBy( array('code' => $content[$i][0] ));

            if ( $en == null ){
                $emailContent = new Currency();
                $emailContent->setCode($content[$i][0]);
                $emailContent->setName($content[$i][1]);
                $manager->persist($emailContent);
            }
        }

        $manager->flush();
    }
}
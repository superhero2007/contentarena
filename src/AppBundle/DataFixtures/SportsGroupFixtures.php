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
use AppBundle\Entity\SourceLicenseTerm;
use AppBundle\Entity\SportsGroup;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class SportsGroupFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            array('Soccer', array('Soccer')),
            array('Baseball', array('Baseball')),
            array('Fight sports', array('Boxing', 'Judo', 'MMA', 'Taekwondo', 'Wrestling')),
            array('Basketball', array('Basketball')),
            array('Cricket', array('Cricket')),
            array('ESports', array('ESports')),
            array('Golf', array('Golf')),
            array('Handball', array('Handball')),
            array('Ice Hockey', array('Ice Hockey')),
            array('Motorsport', array('DTM, Formula 1', 'Formula E', 'MotoGP', 'Motocross', 'Moto2', 'Moto3', 'Nascar')),
            array('Winter Sports', array('Alpine Skiing', 'Biathlon', 'Curling', 'Freestyle Skiing', 'Ski Jumping', 'Snowboard')),
            array('Table Tennis', array('Table Tennis')),
            array('Tennis', array('Tennis')),
            array('Volleyball', array('Volleyball')),
            array('American Football', array('American Football')),
            array('Rugby', array('Rugby')),
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:SportsGroup")->findOneBy( array('name' => $content[$i][0] ));

            if ( $en == null ){
                $item = new SportsGroup();
                $item->setName($content[$i][0]);
                $sports = $content[$i][1];
                $sportsList = [];
                for ($k = 0; $k < count($sports); $k++) {
                    $sport = $manager->getRepository("AppBundle:Sport")->findOneBy( array('name' => $sports[$k] ));
                    if ( $sport != null ) $sportsList[] = $sport;
                }
                $item->setSports($sportsList);
                $manager->persist($item);
            }
        }

        $manager->flush();
    }
}
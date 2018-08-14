<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace AppBundle\DataFixtures;

use AppBundle\Entity\NotificationType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class NotificationTypesFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            'MESSAGE',
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:NotificationType")->findOneBy( array('name' => $content[$i] ));

            if ( $en == null ){
                $emailContent = new NotificationType();
                $emailContent->setName($content[$i]);
                $manager->persist($emailContent);
            }
        }

        $manager->flush();
    }
}
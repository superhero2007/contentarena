<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

namespace AppBundle\DataFixtures;

use AppBundle\Entity\UserStatus;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class UserStatusFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            'On Hold',
            'Active',
            'Deactivated',
            'Declined'
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:UserStatus")->findByName($content[$i]);

            if ( $en == null ){
                $emailContent = new UserStatus();
                $emailContent->setName($content[$i]);
                $manager->persist($emailContent);
            }
        }

        $manager->flush();
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace AppBundle\DataFixtures;

use AppBundle\Entity\AdminConfig;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AdminConfigFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            array(
                "email_admin_alerts_bcc",
                "sascha@contentarena.com, dany@contentarena.com, klemens@contentarena.com, bernhard@contentarena.com"
            ),
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:AdminConfig")->findBySlug($content[$i][0]);

            if ( $en == null ){
                $config = new AdminConfig();
                $config->setSlug($content[$i][0]);
                $config->setContent($content[$i][1]);
                $manager->persist($config);
            }
        }

        $manager->flush();
    }
}

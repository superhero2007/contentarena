<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace Juanx\ReactTranslationBundle\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Juanx\ReactTranslationBundle\Entity\Language;

class LanguageFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            array (
                "code" => "en",
                "name" => "English"
            )
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("JuanxReactTranslationBundle:Language")->findOneBy( array('code' => $content[$i]["code"] ));

            if ( $en == null ){
                $item = new Language();
                $item->setCode($content[$i]["code"]);
                $item->setName($content[$i]["name"]);
                $manager->persist($item);
            }
        }

        $manager->flush();
    }
}

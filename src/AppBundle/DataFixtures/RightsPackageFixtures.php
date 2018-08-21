<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 22-Mar-18
 * Time: 14:59
 */

namespace AppBundle\DataFixtures;

use AppBundle\Entity\RightsPackage;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class RightsPackageFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {
        $rightsToAdd = array(

        );

        $rightsToRename = array(
            "Live Transmission Rights" => "Live Transmission",
            "Delayed & Archive Transmission Rights" => "Delayed & Archive",
            "Live Betting Rights" => "Live Betting",
            "News Access Rights" => "News Access",
            "Highlight & Clip Rights" => "Highlight & Clips",
            "Edited Program Rights" => "Edited Program"
        );

        $entityManager = $manager->getRepository("AppBundle:RightsPackage");

        foreach ($rightsToAdd as $rightToAdd) {
            $entity = $entityManager->findOneBy( array('name' => $rightToAdd[0] ));

            if ( $entity == null ){
                $entity = new RightsPackage();
                $entity->setName($rightToAdd[0]);
                $entity->setShortLabel($rightToAdd[1]);
                $manager->persist($entity);
            }
        }

        foreach ($rightsToRename as $oldName => $newName) {
            $entity = $entityManager->findOneBy( array('name' => $oldName ));

            if ( $entity != null ){
                $entity->setName($newName);
                $manager->persist($entity);
            }
        }

        $manager->flush();
    }
}
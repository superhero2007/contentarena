<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 22-Mar-18
 * Time: 14:59
 */

namespace AppBundle\DataFixtures;

use AppBundle\Entity\BidStatus;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class BidStatusFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {
        $content = array(
            'PENDING',
            'APPROVED',
            'REJECTED'
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:BidStatus")->findOneBy( array('name' => $content[$i] ));

            if ( $en == null ){
                $bidStatus = new BidStatus();
                $bidStatus->setName($content[$i]);
                $manager->persist($bidStatus);
            }
        }

        $manager->flush();
    }


}
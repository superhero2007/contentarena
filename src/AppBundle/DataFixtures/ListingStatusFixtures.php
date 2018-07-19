<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 22-Mar-18
 * Time: 14:59
 */

namespace AppBundle\DataFixtures;

use AppBundle\Entity\BidStatus;
use AppBundle\Entity\ListingStatus;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ListingStatusFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {
        $content = array(
            'DRAFT',
            'INACTIVE',
            'PENDING',
            'APPROVED',
            'REJECTED',
            'EDITED',
            'SOLD_OUT'
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:ListingStatus")->findOneBy( array('name' => $content[$i] ));

            if ( $en == null ){
                $bidStatus = new ListingStatus();
                $bidStatus->setName($content[$i]);
                $manager->persist($bidStatus);
            }
        }

        $manager->flush();
    }


}
<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 22-Mar-18
 * Time: 14:59
 */

namespace AppBundle\DataFixtures;

use AppBundle\Entity\BidStatus;
use AppBundle\Entity\ListingLastAction;
use AppBundle\Entity\ListingStatus;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ListingLastActionFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {
        $content = array(
            array('DRAFT', 'Saved as draft' ),
            array('EDITED', 'Edited' ),
            array('DUPLICATED', 'Duplicated' ),
            array('DEACTIVATED', 'Deactivated' ),
            array('Submitted', 'Submitted' ),
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:ListingLastAction")->findOneBy( array('name' => $content[$i][0] ));

            if ( $en == null ){
                $action = new ListingLastAction();
                $action->setName($content[$i][0]);
                $action->setDescription($content[$i][1]);
                $manager->persist($action);
            }
        }

        $manager->flush();
    }


}
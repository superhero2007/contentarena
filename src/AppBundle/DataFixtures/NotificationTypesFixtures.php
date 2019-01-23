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
use Symfony\Component\Console\Output\ConsoleOutput;

class NotificationTypesFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $items = array(
            array('MESSAGE',"notifications.general.message.new"),
            array('SELLER_LISTING_APPROVED',"notifications.seller.listing.approved"),
            array('SELLER_LISTING_EXPIRING',"notifications.seller.listing.expiring"),
            array('SELLER_LISTING_EXPIRED',"notifications.seller.listing.expired"),
            array('SELLER_LISTING_DEACTIVATED',"notifications.seller.listing.deactivated"),
            array('SELLER_LISTING_SOLD',"notifications.seller.listing.sold"),
            array('SELLER_BID_RECEIVED',"notifications.seller.bid.received"),
            array('SELLER_BID_ACCEPTED',"notifications.seller.bid.accepted"),
            array('SELLER_BID_CLOSED',"notifications.seller.bid.closed"),
            array('BUYER_LISTING_MATCH',"notifications.buyer.listing.match"),
            array('BUYER_BID_PLACED',"notifications.buyer.bid.placed"),
            array('BUYER_BID_ACCEPTED',"notifications.buyer.bid.accepted"),
            array('BUYER_BID_CLOSED',"notifications.buyer.bid.closed"),
            array('BUYER_BID_DECLINED',"notifications.buyer.bid.declined"),
        );

        $output = new ConsoleOutput();
        foreach ($items as $item ){
            $name = $item[0];
            $key = $item[1];

            $en = $manager->getRepository("AppBundle:NotificationType")->findOneBy( array('name' => $name ));

            if ( $en == null ){
                $en = new NotificationType();
                $en->setName($name);
            }

            $en->setTranslationKey($key);
            $manager->persist($en);
        }


        $manager->flush();
    }
}
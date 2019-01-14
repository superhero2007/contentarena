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
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class SourceLicenseTermFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            array('1', 'Definitions'),
            array('2', 'Term'),
            array('3', 'Grant of Rights'),
            array('4', 'Payment Terms and Withholding Tax'),
            array('5', 'General Provision Concerning the Exploitation of Audio-visual to the Program'),
            array('6', 'Territorial IntegrityConcerning the Audio-visual Rights granted'),
            array('7', 'Delivery of Content'),
            array('8', 'Transfer of License Agreement and Sub-Contracting'),
            array('9', 'Changes in the Event Format'),
            array('10', 'Termination'),
            array('11', 'Copyright and Trademarks'),
            array('12', 'Warranties, Indemnifications and Liabilities'),
            array('13', 'Force Majeure'),
            array('14', 'Interpretation'),
            array('15', 'Applicable Law/ Jurisdiction'),
            array('16', 'Miscellaneous')
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:SourceLicenseTerm")->findOneBy( array('name' => $content[$i][1] ));

            if ( $en == null ){
                $emailContent = new SourceLicenseTerm();
                $emailContent->setPosition($content[$i][0]);
                $emailContent->setName($content[$i][1]);
                $manager->persist($emailContent);
            }
        }

        $manager->flush();
    }
}
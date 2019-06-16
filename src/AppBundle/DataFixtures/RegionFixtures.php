<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace AppBundle\DataFixtures;

use AppBundle\Entity\Country;
use AppBundle\Entity\Region;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class RegionFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            'Central America',
            'Carribean',
            'Sub Sahara',
            'Ex Yugo',
            //'Pan Euro',
            'Latin America',
            'MENA'
        );

        $countries = array(
            array("Belize", array("Central America","Carribean")),
            array("Mexico", array("Central America")),
            array("Costa Rica", array("Central America", "Latin America")),
            array("El Salvador", array("Central America", "Latin America")),
            array("Guatemala", array("Central America", "Latin America")),
            array("Honduras", array("Central America", "Latin America")),
            array("Nicaragua", array("Central America", "Latin America")),
            array("Panama", array("Central America", "Latin America")),
            array("Antigua and Barbuda", array("Carribean")),
            array("Bahamas", array("Carribean")),
            array("Barbados", array("Carribean")),
            array("Dominica", array("Carribean")),
            array("Grenada", array("Carribean")),
            array("Jamaica", array("Carribean")),
            array("Saint Kitts and Nevis", array("Carribean")),
            array("Saint Lucia", array("Carribean")),
            array("Saint Vincent and the Grenadines", array("Carribean")),
            array("Trinidad and Tobago", array("Carribean")),
            array("Bermuda", array("Carribean")),
            array("Anguilla", array("Carribean")),
            array("Guyana", array("Carribean")),
            array("Bonaire, Sint Eustatius and Saba", array("Carribean")),
            array("Virgin Islands (British)", array("Carribean")),
            array("Cayman Islands", array("Carribean")),
            array("Montserrat", array("Carribean")),
            array("Puerto Rico", array("Carribean", "Latin America")),
            array("Saint Barthélemy", array("Carribean", "Latin America")),
            array("Saint Martin (French part)", array("Carribean", "Latin America")),
            array("Sint Maarten (Dutch part)", array("Carribean")),
            array("Turks and Caicos Islands", array("Carribean")),
            array("Virgin Islands (U.S.)", array("Carribean")),
            array("Angola", array("Sub Sahara")),
            array("Benin", array("Sub Sahara")),
            array("Botswana", array("Sub Sahara")),
            array("Burkina Faso", array("Sub Sahara")),
            array("Burundi", array("Sub Sahara")),
            array("Cameroon", array("Sub Sahara")),
            array("Cabo Verde", array("Sub Sahara")),
            array("Central African Republic", array("Sub Sahara")),
            array("Chad", array("Sub Sahara", "MENA")),
            array("Comoros", array("Sub Sahara")),
            array("Congo", array("Sub Sahara")),
            array("Congo (Democratic Republic of the)", array("Sub Sahara")),
            array("Côte d'Ivoire", array("Sub Sahara")),
            array("Djibouti", array("Sub Sahara", "MENA")),
            array("Equatorial Guinea", array("Sub Sahara")),
            array("Eritrea", array("Sub Sahara")),
            array("Ethiopia", array("Sub Sahara")),
            array("Gabon", array("Sub Sahara")),
            array("Gambia", array("Sub Sahara")),
            array("Ghana", array("Sub Sahara")),
            array("Guinea", array("Sub Sahara")),
            array("Guinea-Bissau", array("Sub Sahara")),
            array("Kenya", array("Sub Sahara")),
            array("Lesotho", array("Sub Sahara")),
            array("Liberia", array("Sub Sahara")),
            array("Madagascar", array("Sub Sahara")),
            array("Malawi", array("Sub Sahara")),
            array("Mali", array("Sub Sahara")),
            array("Mauritania", array("Sub Sahara", "MENA")),
            array("Mauritius", array("Sub Sahara")),
            array("Mozambique", array("Sub Sahara")),
            array("Namibia", array("Sub Sahara")),
            array("Niger", array("Sub Sahara")),
            array("Nigeria", array("Sub Sahara")),
            array("Réunion", array("Sub Sahara")),
            array("Rwanda", array("Sub Sahara")),
            array("Saint Helena, Ascension and Tristan da Cunha", array("Sub Sahara")),
            array("Sao Tome and Principe", array("Sub Sahara")),
            array("Senegal", array("Sub Sahara")),
            array("Seychelles", array("Sub Sahara")),
            array("Sierra Leone", array("Sub Sahara")),
            array("Somalia", array("Sub Sahara", "MENA")),
            array("South Africa", array("Sub Sahara")),
            array("South Sudan", array("Sub Sahara", "MENA")),
            array("Sudan", array("Sub Sahara", "MENA")),
            array("Swaziland", array("Sub Sahara")),
            array("Tanzania, United Republic of", array("Sub Sahara")),
            array("Uganda", array("Sub Sahara")),
            array("Togo", array("Sub Sahara")),
            array("Zambia", array("Sub Sahara")),
            array("Zimbabwe", array("Sub Sahara")),
            array("Montenegro", array("Ex Yugo")),
            array("Slovenia", array("Ex Yugo")),
            array("Bosnia and Herzegovina", array("Ex Yugo")),
            array("Macedonia (the former Yugoslav Republic of)", array("Ex Yugo")),
            array("Croatia", array("Ex Yugo")),
            array("Serbia", array("Ex Yugo")),
            array("Kosovo", array("Ex Yugo")),
            array("Bulgaria", array("")),
            array("Belgium", array("")),
            array("Bulgaria", array("")),
            array("Germany", array("")),
            array("Estonia", array("")),
            array("Greece", array("")),
            array("Spain", array("")),
            array("France", array("")),
            array("Ireland", array("")),
            array("Italy", array("")),
            array("Latvia", array("")),
            array("Luxembourg", array("")),
            array("Netherlands", array("")),
            array("Austria", array("")),
            array("Poland", array("")),
            array("Austria", array("")),
            array("Romania", array("")),
            array("Portugal", array("")),
            array("Slovenia", array("")),
            array("Slovakia", array("")),
            array("Finland", array("")),
            array("Sweden", array("")),
            array("United Kingdom of Great Britain and Northern Ireland", array("")),
            array("Brazil", array("Latin America")),
            array("Mexico", array("Latin America")),
            array("Colombia", array("Latin America")),
            array("Argentina", array("Latin America")),
            array("Bolivia (Plurinational State of)", array("Latin America")),
            array("Chile", array("Latin America")),
            array("Cuba", array("Latin America")),
            array("Ecuador", array("Latin America")),
            array("Peru", array("Latin America")),
            array("Venezuela", array("Latin America")),
            array("Haiti", array("Latin America")),
            array("Dominican Republic", array("Latin America")),
            array("Paraguay", array("Latin America")),
            array("Uruguay", array("Latin America")),
            array("Guadeloupe", array("Latin America")),
            array("Martinique", array("Latin America")),
            array("French Guiana", array("Latin America")),
            array("Algeria", array("MENA")),
            array("Bahrain", array("MENA")),
            array("Egypt", array("MENA")),
            array("Iran (Islamic Republic of)", array("MENA")),
            array("Iraq", array("MENA")),
            array("Israel", array("")),
            array("Jordan", array("MENA")),
            array("Kuwait", array("MENA")),
            array("Lebanon", array("MENA")),
            array("Libya", array("MENA")),
            array("Oman", array("MENA")),
            array("Qatar", array("MENA")),
            array("Syrian Arab Republic", array("MENA")),
            array("Tunisia", array("MENA")),
            array("United Arab Emirates", array("MENA")),
            array("Yemen", array("MENA")),
            array("Morocco", array("MENA")),
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:Region")->findOneBy( array('name' => $content[$i] ));

            if ( $en == null ){
                $emailContent = new Region();
                $emailContent->setName($content[$i]);
                $manager->persist($emailContent);
            }
        }

        for ($i = 0; $i < count($countries); $i++) {
            /* @var Country $en */
            $en = $manager->getRepository("AppBundle:Country")->findOneBy( array('name' => $countries[$i][0] ));
            $regions = $manager->getRepository("AppBundle:Region")->findBy( array('name' => $countries[$i][1] ));

            if ( $en != null ){
                $en->setRegions($regions);
                $manager->persist($en);
            }
        }

        $manager->flush();
    }
}

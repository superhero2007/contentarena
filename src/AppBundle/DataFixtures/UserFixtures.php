<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

namespace AppBundle\DataFixtures;

use AppBundle\Entity\Company;
use AppBundle\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $userRepo = $manager->getRepository("AppBundle:User");
        $companyRepo = $manager->getRepository("AppBundle:Company");
        $adminEmail = "admin@contentarena.com";
        $companyName = "Test company";

        $user = $userRepo->findOneBy(array("email" => $adminEmail));

        if ( $user == null ){
            $user = new User();
            $user->setEmail($adminEmail);
            $user->setUsername($adminEmail);
            $user->addRole("ROLE_ADMIN");
            $user->setFirstName("John");
            $user->setLastName("Doe");
            $user->setPlainPassword("c0nt3nt4r3n4");

            $company = $companyRepo->findOneBy(array("legalName" => $companyName));

            if ( $company == null ){
                $company = new Company();
                $company->setLegalName($companyName);
                $manager->persist($company);
            }
            $user->setCompany($company);
        }
        $manager->persist($user);
        $manager->flush();
    }
}

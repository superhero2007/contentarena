<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace AppBundle\DataFixtures;

use AppBundle\Entity\EmailContent;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class EmailContentFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            array(
                "company_registered_owner",
                "Notification to the user when the company is approved",
                "has been registered successfully and it's ready to operate in Content Arena!"
            ),
            array(
                "reset_password_success",
                "Email to tell the user password was successfully changed",
                "Your password has been reset successfully!"
            ),
            array(
                "email_subject_internal_user_request",
                "Email subject when user requested login on landing page",
                "New Content Arena User"
            ),
            array(
                "email_content_internal_user_request",
                "Email content when user requested login on landing page",
                "New User Request:"
            ),
            array(
                "email_subject_user_activation_link",
                "Email subject when sending activation link",
                "Finish your Content Arena registration"
            ),
            array(
                "email_content_user_activation_link",
                "Email content when sending activation link",
                "To finish activating your account - please visit"
            ),
            array(
                "email_content_user_activation_link_2",
                "Email content when sending activation link_2",
                "This link can only be used once to validate your account."
            )
        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:EmailContent")->findBySlug($content[$i][0]);

            if ( $en == null ){
                $emailContent = new EmailContent();
                $emailContent->setSlug($content[$i][0]);
                $emailContent->setDescription($content[$i][1]);
                $emailContent->setContent($content[$i][2]);
                $manager->persist($emailContent);
            }

        }

        $manager->flush();
    }
}
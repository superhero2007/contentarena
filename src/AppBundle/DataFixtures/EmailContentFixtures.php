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
                "To finish activating your account - please"
            ),
            array(
                "email_content_user_activation_link_2",
                "Email content when sending activation link_2",
                "This link can only be used once to validate your account."
            ),
            array(
                "email_subject_user_forgot_password",
                "Email subject when requesting new password",
                "Reset password request for Content Arena"
            ),
            array(
                "email_content_user_forgot_password",
                "Email subject when requesting new password",
                "You sent the request to reset your password."
            ),
            array(
                "email_content_user_forgot_password_2",
                "Email subject when requesting new password",
                "to set a new password."
            ),
            array(
                "email_subject_seller_listing_approved",
                "Email subject when a listing is approved",
                "Your listing has been published on Content Arena"
            ),
            array(
                "email_content_seller_listing_approved",
                "Email content when a listing is approved",
                "Congratulations! We are glad to inform you that the following listing has been published on Content Arena:"
            ),
            array(
                "email_content_seller_listing_approved_2",
                "Email content when a listing is approved",
                "We will inform you as soon as a potential buyer will buy or bid for your content. In the meanwhile you can review and edit your listing in the"
            ),
            array(
                "email_subject_seller_listing_deactivated",
                "Email subject when a listing is deactivated",
                "Your listing on Content Arena has been deactivated"
            ),
            array(
                "email_content_seller_listing_deactivated",
                "Email content when a listing is deactivated",
                "The following listing on Content Arena has been deactivated and is no longer available on the marketplace:"
            ),
            array(
                "email_content_seller_listing_deactivated_2",
                "Email content when a listing is deactivated",
                "If you wish to reactivate the listing, you can easily do so in the"
            ),
            array(
                "email_subject_seller_bid_received",
                "Email subject when a bid is received",
                "You have received a new bid on Content Arena"
            ),
            array(
                "email_content_seller_bid_received",
                "Email content when a bid is received",
                "Congratulations! You have received a new bid on Content Arena for the following listing:"
            ),
            array(
                "email_content_seller_bid_received_2",
                "Email content when a bid is received",
                "Please make sure to review the bid in the"
            ),
            array(
                "email_content_seller_bid_received_3",
                "Email content when a bid is received",
                "section and respond to the bidder as soon as possible."
            ),
            array(
                "email_subject_seller_deal_closed",
                "Email subject when a deal is closed",
                "You have closed a new deal on Content Arena"
            ),
            array(
                "email_content_seller_deal_closed",
                "Email content when a deal is closed",
                "Congratulations! You have closed a new deal on Content Arena for the following listing:"
            ),
            array(
                "email_content_seller_deal_closed_2",
                "Email content when a deal is closed",
                "You will find all details as well as the counter-signed license agreement available in the “Commercial Overview” section. "
            ),
            array(
                "email_content_seller_deal_closed_3",
                "Email content when a deal is closed",
                "Please make sure to get in touch with the buyer as soon as possible in order to provide him further information about the next steps."
            ),
            array(
                "email_subject_seller_sold_out",
                "",
                "Sold out! All your bundles have been acquired"
            ),
            array(
                "email_content_seller_sold_out",
                "",
                "Congratulations! All your sales bundles for the following listing have been sold:"
            ),
            array(
                "email_content_seller_sold_out_2",
                "",
                "You can review all deals and download license agreements in the “Commercial Overview” section."
            ),
            array(
                "email_subject_buyer_bid_placed",
                "",
                "Your bid has been placed"
            ),
            array(
                "email_content_buyer_bid_placed",
                "",
                "Your bid for the following listing has been placed successfully:"
            ),
            array(
                "email_content_buyer_bid_placed_2",
                "",
                "In a next step the seller will get back to you after reviewing your bid. In the meanwhile you can review or raise your bid in the "
            ),
            array(
                "email_subject_buyer_bid_declined",
                "",
                "Your bid has been declined"
            ),
            array(
                "email_content_buyer_bid_declined",
                "",
                "Your bid for the following listing has been declined by the seller:"
            ),
            array(
                "email_content_buyer_bid_declined_2",
                "",
                "You can review your bid in the "
            ),
            array(
                "email_content_buyer_bid_declined_3",
                "",
                "section. In case that the bidding process is still running you can raise your offer."
            ),
            array(
                "email_subject_buyer_bid_accepted",
                "",
                "Your bid has been accepted"
            ),
            array(
                "email_content_buyer_bid_accepted",
                "",
                "Congratulations! Your bid for the following listing has been accepted by the seller:"
            ),
            array(
                "email_content_buyer_bid_accepted_2",
                "",
                "You can review the details and download the counter-signed license agreement in the "
            ),
            array(
                "email_content_buyer_bid_accepted_3",
                "",
                "The seller will get in touch with you soon to provide more information on the next steps."
            ),
            array(
                "email_subject_buyer_closed_deal",
                "",
                "You have closed a new deal"
            ),
            array(
                "email_content_buyer_closed_deal",
                "",
                "Congratulations! You have closed a new deal on Content Arena for the following listing:"
            ),
            array(
                "email_content_buyer_closed_deal_2",
                "",
                "You can review the details and download the counter-signed license agreement in the "
            ),
            array(
                "email_content_buyer_closed_deal_3",
                "",
                "The seller will get in touch with you soon to provide more information on the next steps."
            ),
            array(
                "email_subject_message_new",
                "",
                "You have received a new message"
            ),
            array(
                "email_content_message_new",
                "",
                "You have received a new message regarding the following listing:"
            ),
            array(
                "email_content_message_new_2",
                "",
                "Please go to the "
            ),
            array(
                "email_content_message_new_3",
                "",
                "section to view the message"
            ),
            array(
                "email_subject_user_welcome",
                "",
                "Your registration on Content Arena"
            ),
            array(
                "email_content_user_welcome",
                "",
                "Thank you for interest in joining Content Arena. Next, we will verify your application request. In case your application is approved, we will send you the access link to enter Content Arena as soon as possible."
            ),
            array(
                "email_subject_seller_listing_expiry",
                "",
                "Your listing on Content Arena will expire in 24 hours"
            ),
            array(
                "email_content_seller_listing_expiry",
                "",
                "The following listing on Content Arena will expire in 24 hours:"
            ),
            array(
                "email_content_seller_listing_expiry_2",
                "",
                "You can easily extend the expiration date in the"
            ),
            array(
                "email_content_seller_listing_expiry_3",
                "",
                "section if you wish to continue offering your content to potential buyers on Content Arena."
            ),

            array(
                "email_subject_seller_listing_expired",
                "",
                "Your listing on Content Arena has expired"
            ),
            array(
                "email_content_seller_listing_expired",
                "",
                "The following listing on Content Arena has expired and is no longer available on the marketplace:"
            ),
            array(
                "email_content_seller_listing_expired_2",
                "",
                "If you wish to reactivate the listing, you can easily do so by changing the expiry date in the"
            ),
            array(
                "email_content_seller_listing_expired_3",
                "",
                "section and re-publish the content."
            ),


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
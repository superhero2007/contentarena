<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Content;
use AppBundle\Entity\User;
use AppBundle\Service\UserService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\ContentService;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Translation\TranslatorInterface;

class TestController extends BaseController
{

    /**
     * @Route("/test/email", name="testEmail")
     * @param Request $request
     * @param TranslatorInterface $translator
     * @return Response
     */
    public function testEmail(Request $request, TranslatorInterface $translator)
    {
        $user = $this->getUser();
        $listingId = $request->get("listingId");
        $message = $request->get("message");
        $bidId = $request->get("bidId");
        $bid = null;
        $bundle = null;
        $container = $this->container;
        $hostUrl = $container->getParameter("carena_host_url");
        $entityManager = $container->get('doctrine')->getManager();
        $userRepository = $entityManager->getRepository('AppBundle:User');
        $listingRepository = $entityManager->getRepository('AppBundle:Content');
        $bidRepository =$entityManager->getRepository("AppBundle:Bid");
        $listingStatusRepository = $entityManager->getRepository('AppBundle:ListingStatus');
        $emailContentRepository = $entityManager->getRepository("AppBundle:EmailContent");
        $type = $request->get('type');
        $approvedStatus = $listingStatusRepository->findOneBy(array("name"=>"APPROVED"));
        $router = $container->get('router');
        $listingCriteria = ($listingId == null ) ? array('status'=>$approvedStatus) : array('customId'=>$listingId);
        $listing = $listingRepository->findOneBy(
            $listingCriteria,
            array('id' => 'DESC')
        );

        if ( $bidId != null){
            $bid = $bidRepository->findOneBy(array(
                "customId" => $bidId
            ));
        }

        if ( $bid != null){
            $listing = $bid->getContent();
            $bundle = $bid->getSalesPackage();
        }

        $confirmationUrl = ($user->getConfirmationToken()) ? $router->generate('fos_user_registration_confirm', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL) : "";
        $params = array(
            "hostUrl" => $hostUrl,
            "user" => $user,
            "colleague" => $user,
            "confirmationUrl" => $confirmationUrl,
            "listing" => $listing,
            "message" => $message,
            "bundle" => $bundle
        );

        switch ($type){

            case "internal_user_registers":
                $content = $translator->trans("email.internal.user.registers.content");
                $parameters = array(
                    "content" => $content,
                    "user" => $user
                );
                $template = "email/email.internal.user.registers.twig";
                break;

            case "internal_user_listing_submit";
                $content = $translator->trans("email.internal.user.listing.submit.content");
                $parameters = array(
                    "content" => $content,
                    "user" => $user,
                    "listing" => $listing
                );
                $template = "email/email.internal.user.listing.submit.twig";

                break;

            case "internal_user_listing_deactivate";
                $content = $translator->trans("email.internal.user.listing.deactivate.content");
                $parameters = array(
                    "content" => $content,
                    "user" => $user,
                    "listing" => $listing
                );
                $template = "email/email.internal.user.listing.deactivate.twig";

                break;

            case "internal_user_listing_archive";
                $content = $translator->trans("email.internal.user.listing.archive.content");
                $parameters = array(
                    "content" => $content,
                    "user" => $user,
                    "listing" => $listing
                );
                $template = "email/email.internal.user.listing.archive.twig";

                break;

            case "internal_user_listing_draft";
                $content = $translator->trans("email.internal.user.listing.draft.content");
                $parameters = array(
                    "content" => $content,
                    "user" => $user,
                    "listing" => $listing
                );
                $template = "email/email.internal.user.listing.draft.twig";

                break;

            case "internal_user_bid_place";
                $content = $translator->trans("email.internal.user.bid.place.content");
                $parameters = array(
                    "content" => $content,
                    "user" => $user,
                    "listing" => $listing,
                    "bid" => $bid,
                    "bundle" => $bundle
                );
                $template = "email/email.internal.user.bid.place.twig";

                break;
            case "internal_user_bid_accept";
                $content = $translator->trans("email.internal.user.bid.accept.content");
                $parameters = array(
                    "content" => $content,
                    "user" => $user,
                    "listing" => $listing,
                    "bid" => $bid,
                    "bundle" => $bundle
                );
                $template = "email/email.internal.user.bid.accept.twig";

                break;
            case "internal_user_bid_decline";
                $content = $translator->trans("email.internal.user.bid.decline.content");
                $parameters = array(
                    "content" => $content,
                    "user" => $user,
                    "listing" => $listing,
                    "bid" => $bid,
                    "bundle" => $bundle
                );
                $template = "email/email.internal.user.bid.decline.twig";

                break;
            case "internal_user_fixed_close";
                $content = $translator->trans("email.internal.user.fixed.close.content");
                $parameters = array(
                    "content" => $content,
                    "user" => $user,
                    "listing" => $listing,
                    "bid" => $bid,
                    "bundle" => $bundle
                );
                $template = "email/email.internal.user.fixed.close.twig";

                break;
            case "listing_expiry":
                break;

            case "listing_expired":
                break;

            case "register_user":
                break;

            case "welcome_user":
                break;

            case "activation_link":
                break;

            case "forgot_password":
                $content = $emailContentRepository->findBySlug("email_content_user_forgot_password");
                $content2 = $emailContentRepository->findBySlug("email_content_user_forgot_password_2");
                $parameters = array_merge(
                    $params,
                    array(
                        "content" => $content->getContent(),
                        "content2" => $content2->getContent()
                    )
                );
                $template = "email/email.user.forgot-password.twig";
                break;
            case "share_listing":
                $content = $emailContentRepository->findBySlug("email_content_share_listing");
                $content2 = $emailContentRepository->findBySlug("email_content_share_listing_2");
                $content3 = $emailContentRepository->findBySlug("email_content_share_listing_3");
                $parameters = array_merge(
                    $params,
                    array(
                        "content" => $content->getContent(),
                        "content2" => $content2->getContent(),
                        "content3" => $content3->getContent()
                    )
                );
                $template = "email/email.share.listing.twig";
                break;

            case "account_incomplete":
                $content = $emailContentRepository->findBySlug("email_content_account_incomplete");
                $content2 = $emailContentRepository->findBySlug("email_content_account_incomplete_2");
                $parameters = array_merge(
                    $params,
                    array(
                        "content" => $content->getContent(),
                        "content2" => $content2->getContent()
                    )
                );
                $template = "email/email.account.incomplete.twig";
                break;

            case "account_incomplete_from_invite":
                $content = $emailContentRepository->findBySlug("email_content_account_incomplete_from_invite");
                $content2 = $emailContentRepository->findBySlug("email_content_account_incomplete_from_invite_2");
                $content3 = $emailContentRepository->findBySlug("email_content_account_incomplete_from_invite_3");
                $parameters = array_merge(
                    $params,
                    array(
                        "content" => $content->getContent(),
                        "content2" => $content2->getContent(),
                        "content3" => $content3->getContent()
                    )
                );
                $template = "email/email.account.incomplete.invite.twig";
                break;

            case "account_activated":
                $content = $emailContentRepository->findBySlug("email_content_account_activated");
                $content2 = $emailContentRepository->findBySlug("email_content_account_activated_2");
                $parameters = array_merge(
                    $params,
                    array(
                        "content" => $content->getContent(),
                        "content2" => $content2->getContent()
                    )
                );
                $template = "email/email.account.activated.twig";
                break;

            case "listing_approved":
                break;

            case "listing_deactivated":
                break;

            case "listing_match":
                break;

            case "invite_user":
                break;

            case "listing_find_match":
                break;

        }


        return $this->render($template, $parameters);

    }



}
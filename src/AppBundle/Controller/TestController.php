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

class TestController extends BaseController
{

    /**
     * @Route("/test/email", name="testEmail")
     * @param Request $request
     * @return Response
     */
    public function testEmail(Request $request)
    {
        $user = $this->getUser();
        $listingId = $request->get("listingId");
        $message = $request->get("message");
        $container = $this->container;
        $hostUrl = $container->getParameter("carena_host_url");
        $entityManager = $container->get('doctrine')->getManager();
        $userRepository = $entityManager->getRepository('AppBundle:User');
        $listingRepository = $entityManager->getRepository('AppBundle:Content');
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
        $confirmationUrl = ($user->getConfirmationToken()) ? $router->generate('fos_user_registration_confirm', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL) : "";
        $params = array(
            "hostUrl" => $hostUrl,
            "user" => $user,
            "colleague" => $user,
            "confirmationUrl" => $confirmationUrl,
            "listing" => $listing,
            "message" => $message
        );

        switch ($type){

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
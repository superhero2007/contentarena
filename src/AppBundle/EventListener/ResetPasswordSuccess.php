<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 25/12/2017
 * Time: 3:22 PM
 */

namespace AppBundle\EventListener;

use AppBundle\Service\EmailService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Doctrine\ORM\EntityManager;

/**
 * Listener responsible to change the redirection at the end of the password resetting
 */
class ResetPasswordSuccess implements EventSubscriberInterface
{
    protected $mailer;
    protected $em;
    protected $container;

    public function __construct(EmailService $mailer, EntityManagerInterface $em, ContainerInterface $container)
    {
        $this->mailer = $mailer;
        $this->em = $em;
        $this->container = $container;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            FOSUserEvents::RESETTING_RESET_COMPLETED => 'onResetPassword',
        );
    }

    /**
     * @param FilterUserResponseEvent $event
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function onResetPassword(FilterUserResponseEvent $event)
    {

        $hostUrl = $this->container->getParameter("carena_host_url");
        $user = $event->getUser();
        $confirmationUrl = $this->container->get('router')->generate('fos_user_resetting_reset', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL);
        $params = array(
            "hostUrl" => $hostUrl,
            "user" => $user,
            "confirmationUrl" => $confirmationUrl
        );

        //$this->mailer->forgotPassword($params);
    }
}

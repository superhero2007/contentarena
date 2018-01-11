<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 25/12/2017
 * Time: 3:22 PM
 */

namespace AppBundle\EventListener;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Doctrine\ORM\EntityManager;

/**
 * Listener responsible to change the redirection at the end of the password resetting
 */
class ResetPasswordSuccess implements EventSubscriberInterface
{
    protected $twig;
    protected $mailer;
    protected $em;

    public function __construct(\Twig_Environment $twig, \Swift_Mailer $mailer, EntityManager $em)
    {
        $this->twig = $twig;
        $this->mailer = $mailer;
        $this->em = $em;
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

    public function onResetPassword(FilterUserResponseEvent $event)
    {

        $emailContent = $this->em->getRepository('AppBundle:EmailContent')->findBySlug("reset_password_success");

        $user = $event->getUser();
        $message = \Swift_Message::newInstance()
            ->setSubject('Content Arena')
            ->setFrom('noreply@contentarena.com', "Content Arena Admin")
            ->setTo($user->getEmail())
            ->setBody(
                $this->twig->render(
                    'Registration/reset_password_success.txt.twig',
                    array('user' => $user, 'content' => $emailContent->getContent() )
                )
            )
        ;
        $this->mailer->send($message);
    }
}
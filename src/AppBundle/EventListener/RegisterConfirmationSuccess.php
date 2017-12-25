<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 25/12/2017
 * Time: 3:22 PM
 */

namespace AppBundle\EventListener;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\GetResponseUserEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * Listener responsible to change the redirection at the end of the password resetting
 */
class RegisterConfirmationSuccess implements EventSubscriberInterface
{
    protected $twig;
    protected $mailer;

    public function __construct(\Twig_Environment $twig, \Swift_Mailer $mailer)
    {
        $this->twig = $twig;
        $this->mailer = $mailer;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            FOSUserEvents::REGISTRATION_CONFIRM => 'onRegistrationConfirmed',
        );
    }

    public function onRegistrationConfirmed(GetResponseUserEvent $event)
    {
        $message = \Swift_Message::newInstance()
            ->setSubject('Content Arena Reminders')
            ->setFrom('noreply@contentarena.com', "Content Arena Admin")
            ->setTo('info@contentarena.com')
            ->setBody(
                $this->twig->render(
                    'Registration/registration_admin_reminder.txt.twig',
                    array('user' => $event->getUser() )
                )
            )
        ;
        $this->mailer->send($message);
    }
}
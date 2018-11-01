<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 25/12/2017
 * Time: 3:22 PM
 */

namespace AppBundle\EventListener;

use JavierEguiluz\Bundle\EasyAdminBundle\Event\EasyAdminEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use AppBundle\Entity\Company;

/**
 * Listener responsible to change the redirection at the end of the password resetting
 */
class AdminEditAction implements EventSubscriberInterface
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
            EasyAdminEvents::POST_UPDATE => 'onPostEdit',
        );
    }

    public function onPostEdit($obj)
    {
        $company = $obj->getArgument('entity');

        if ( !$company instanceof Company ) return;

        $em = $obj->getArgument('em');
        $owner = $company->getOwner();

        if ( !$company->isEnabled() ){

            /**
             * Update user status
             */
            $userStatus = $em->getRepository('AppBundle:UserStatus')->findByName("Active");
            $emailContent = $em->getRepository('AppBundle:EmailContent')->findBySlug("company_registered_owner");

            if ($owner != null){
                if ( $userStatus != null) $owner->setStatus($userStatus);
                $owner->setApproved(true);
                $em->persist($owner);
                $em->flush();
            }


            /**
             * Send congratulations message
             */
            $message = \Swift_Message::newInstance()
                ->setSubject('Content Arena')
                ->setFrom('noreply@contentarena.com', "Content Arena Admin")
                ->setTo($owner->getEmail())
                ->setBody(
                    $this->twig->render(
                        'Registration/company_registered_owner.txt.twig',
                        array('company' => $company, 'content'=> $emailContent  )
                    )
                )
            ;
            $this->mailer->send($message);

            /**
             * Set flag to prevent doing this again
             */
            $company->setEnabled(true);
            $em->persist($company);
            $em->flush();
        }

    }
}
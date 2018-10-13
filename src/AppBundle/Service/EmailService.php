<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


class EmailService
{

    private $em;

    private $mailer;

    private $twig;

    static private $TEST_EMAIL = "juancruztalco@gmail.com";
    static private $ALERTS_EMAIL = "alerts@contentarena.com";

    public function __construct(EntityManager $entityManager, \Twig_Environment $twig, \Swift_Mailer $mailer) {
        $this->em = $entityManager;
        $this->twig = $twig;
        $this->mailer = $mailer;
    }

    /**
     * @param $params
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function userRequestedLogin($params){

        $repository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $repository->findBySlug("email_subject_internal_user_request");
        $content = $repository->findBySlug("email_content_internal_user_request");
        $parameters = array_merge(
            $params,
            array(
                "content" => $content->getContent()
            )
        );
        $this->sendEmail("email/email.internal.user-request.twig", $subject->getContent(), $this::$ALERTS_EMAIL, $parameters );

    }

    /**
     * @param $params
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendActivationLink($params){

        $repository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $repository->findBySlug("email_subject_user_activation_link");
        $content = $repository->findBySlug("email_content_user_activation_link");
        $content2 = $repository->findBySlug("email_content_user_activation_link_2");
        $parameters = array_merge(
            $params,
            array(
                "content" => $content->getContent(),
                "content2" => $content2->getContent()
            )
        );
        $this->sendEmail("email/email.user.activation-link.twig", $subject->getContent(), $params['user']->getEmail(), $parameters );

    }

    /**
     * @param $template
     * @param $subject
     * @param $to
     * @param $params
     * @return bool
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendEmail($template, $subject, $to, $params )
    {
        $message = \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setContentType("text/html")
            ->setFrom('info@contentarena.com', "Content Arena")
            ->setTo($to)
            ->setBody(
                $this->twig->render( $template, $params )
            )
        ;
        $this->mailer->send($message);

        return true;
    }


}
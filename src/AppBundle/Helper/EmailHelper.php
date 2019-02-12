<?php

namespace AppBundle\Helper;

use Symfony\Component\HttpFoundation\Response;

trait EmailHelper
{
    /**
     *
     */
    private function sendEmail($template, $subject, $to, $params )
    {
        $message = \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setFrom('info@contentarena.com', "Content Arena")
            ->setTo($to)
            ->setBody(
                $this->renderView( $template, $params )
            )
        ;
        $this->get('mailer')->send($message);

        return true;
    }

}
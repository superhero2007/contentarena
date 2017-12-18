<?php

namespace ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;

class LoginController extends FOSRestController
{
    use \ApiBundle\Helper\ControllerHelper;

    public function getLoginAction()
    {
        $data = array("hello" => "world");
        $view = $this->view($data);
        return $this->handleView($view);
    }

    public function postRegisterAction(Request $request)
    {




        $user = $this->getDoctrine()
            ->getRepository('AppBundle:User')
            ->findOneBy(['email' => $request->get("email")]);

        if ($user) {

            $data = array("success" => true, "user_exists" => true);
            $view = $this->view($data);
            return $this->handleView($view);
        }

        /** @var $userManager UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');

        $user = $userManager->createUser();
        $user->setEnabled(true);
        $user->setEmail($request->get("email"));
        $user->setTitle($request->get("title"));
        $user->setCountry($request->get("country"));
        $user->setUsername($request->get("username"));
        $user->setFirstName($request->get("firstName"));
        $user->setLastName($request->get("lastName"));
        $user->setCompanyLegalName($request->get("companyLegalName"));
        $user->setCompanyWebsite($request->get("companyWebsite"));
        $userManager->updateUser($user);
        //$event = new GetResponseUserEvent($user, $request);

        $message = \Swift_Message::newInstance()
            ->setSubject('Hello Email')
            ->setFrom('send@example.com')
            ->setTo($request->get("email"))
            ->setBody(
                $this->renderView(
                    'Registration/email.txt.twig',
                    array('user' => $user, 'confirmationUrl' => 'asd')
                )
            )
        ;
        $this->get('mailer')->send($message);

        //if (!$user) {
        //    throw $this->createNotFoundException();
        //}

        $data = array("success" => true, "user" => $user, "user_exists" => false);
        $view = $this->view($data);
        return $this->handleView($view);
    }

}

<?php

namespace ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use FOS\UserBundle\FOSUserEvents;

class LoginController extends FOSRestController
{
    use \ApiBundle\Helper\ControllerHelper;
    use \ApiBundle\Helper\EmailHelper;

    public function postLoginAction()
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

        $tokenGenerator = $this->get('fos_user.util.token_generator');

        $user = $userManager->createUser();
        $user->setEnabled(true);
        $user->setEmail($request->get("email"));
        $user->setTitle($request->get("title"));
        $user->setCountry($request->get("country"));
        $user->setUsername($request->get("username"));
        $user->setFirstName($request->get("firstName"));
        $user->setLastName($request->get("lastName"));
        $user->setPhone($request->get("phone"));
        $user->setCompanyLegalName($request->get("companyLegalName"));
        $user->setCompanyWebsite($request->get("companyWebsite"));
        $user->setPlainPassword('');
        if (null === $user->getConfirmationToken()) {
            $user->setConfirmationToken($tokenGenerator->generateToken());
        }

        $userManager->updateUser($user);


        $confirmationUrl = $this->container->get('router')->generate('fos_user_registration_confirm', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL);

        $this->sendEmail(
            'Registration/email.txt.twig',
            'Welcome to Content Arena',
            $request->get("email"),
            array('user' => $user, 'confirmationUrl' => $confirmationUrl)
        );

        //if (!$user) {
        //    throw $this->createNotFoundException();
        //}

        $data = array("success" => true, "user" => $user, "user_exists" => false);
        $view = $this->view($data);
        return $this->handleView($view);
    }

}

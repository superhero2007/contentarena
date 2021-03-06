<?php

namespace ApiBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Service\EmailService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\Validator\Constraints\DateTime;
use FOS\RestBundle\Controller\Annotations as Rest;

class LoginController extends FOSRestController
{
    use \ApiBundle\Helper\ControllerHelper;
    use \ApiBundle\Helper\EmailHelper;

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     * @Rest\Post("/auth/logins")
     */
    public function postLoginAction(Request $request)
    {
        $username = $request->request->get('username');
        $password = $request->request->get('password');

        if(is_null($username) || is_null($password)) {
            return $this->redirect('https://contentarena.com');
        }

        $user_manager = $this->get('fos_user.user_manager');
        $factory = $this->get('security.encoder_factory');

        $user = $user_manager->findUserByUsername($username);

        if(is_null($user)) {
            return $this->redirect('https://contentarena.com');
        }

        $encoder = $factory->getEncoder($user);
        $salt = $user->getSalt();

        if($encoder->isPasswordValid($user->getPassword(), $password, $salt)) {
            // Here, "public" is the name of the firewall in your security.yml
            $token = new UsernamePasswordToken($user, $user->getPassword(), "main", $user->getRoles());

            // For older versions of Symfony, use security.context here
            $this->get("security.token_storage")->setToken($token);
            $this->get('session')->set('_security_main',serialize($token));

            // Fire the login event
            // Logging the user in above the way we do it doesn't do this automatically
            $event = new InteractiveLoginEvent($request, $token);
            $this->get("event_dispatcher")->dispatch("security.interactive_login", $event);
            return $this->redirect('https://app.contentarena.com');
        } else {
            return $this->redirect('https://contentarena.com');
        }


    }

    /**
     * @param Request $request
     * @return Response
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     * @Rest\Post("/auth/registers")
     */
    public function postRegisterAction(Request $request)
    {

        $user = $this->getDoctrine()
            ->getRepository('AppBundle:User')
            ->findOneBy(['email' => $request->get("email")]);

        if ($user) {

            $data = array("success" => true, "user_exists" => true);
            return $this->getSerializedResponse($data, array("auth"));
        }

        /** @var $userManager UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');

        $tokenGenerator = $this->get('fos_user.util.token_generator');
        $emailService = $this->container->get("AppBundle\Service\EmailService");
        /** @var User $user */
        $user = $userManager->createUser();
        $user->setEnabled(true);
        $user->setEmail($request->get("email"));
        $user->setUsername($request->get("email"));
        $user->setFirstName($request->get("firstName"));
        $user->setLastName($request->get("lastName"));
        $user->setPhone($request->get("phone"));
        $user->setRegisteredAt(new \DateTime());
        $user->setApplicationCompany($request->get("companyLegalName"));
        $user->setPlainPassword('');
        if (null === $user->getConfirmationToken()) {
            $user->setConfirmationToken($tokenGenerator->generateToken());
        }

        $userManager->updateUser($user);

        $hostUrl = $this->container->getParameter("carena_host_url");
        $params = array(
            "hostUrl" => $hostUrl,
            "user" => $user
        );

        $emailService->userRequestedLogin($params);
        $emailService->welcomeUser($params);

        $confirmationUrl = $this->container->get('router')->generate('fos_user_registration_confirm', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL);

        /*$this->sendEmail(
            'Registration/email.txt.twig',
            'Welcome to Content Arena',
            $request->get("email"),
            array('user' => $user, 'confirmationUrl' => $confirmationUrl)
        );*/

        //if (!$user) {
        //    throw $this->createNotFoundException();
        //}

        $data = array("success" => true, "user" => $user, "user_exists" => false);
        return $this->getSerializedResponse($data, array("auth"));
    }

}

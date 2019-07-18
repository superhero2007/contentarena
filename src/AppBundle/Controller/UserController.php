<?php

namespace AppBundle\Controller;

use ApiBundle\Helper\ControllerHelper;
use ApiBundle\Helper\EmailHelper;
use AppBundle\Entity\User;
use AppBundle\Error\UserErrors;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Role\SwitchUserRole;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class UserController extends FOSRestController
{
    use ControllerHelper;
    use EmailHelper;

    const PASSWORD_REQUEST_TTL = 7200;

    /**
     * @param Request $request
     * @return Response
     * @Rest\Post("/login")
     */
    public function postLoginAction(Request $request)
    {
        $logger = $this->get('logger');
        $username = $request->request->get('username');
        $password = $request->request->get('password');

        if(is_null($username) || is_null($password)) {
            $errorCode = UserErrors::USER_MISSING_LOGIN_DATA;
            $logger->info(UserErrors::getErrorMessage($errorCode), array( "username" => $username));
            return $this->getErrorResponse(UserErrors::class, $errorCode);
        }

        $user_manager = $this->get('fos_user.user_manager');
        $factory = $this->get('security.encoder_factory');

        /* @var User $user */
        $user = $user_manager->findUserByUsername($username);

        if(is_null($user)) {
            $errorCode = UserErrors::USER_NOT_EXISTS;
            $logger->info(UserErrors::getErrorMessage($errorCode), array( "username" => $username));
            return $this->getErrorResponse(UserErrors::class, $errorCode);
        }

        if (!$user->canLogin())
        {
            $errorCode = UserErrors::USER_DISABLED;
            $logger->info(UserErrors::getErrorMessage($errorCode), array( "username" => $username));
            return $this->getErrorResponse(UserErrors::class, $errorCode);
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
            $event = new InteractiveLoginEvent($request, $token);
            $this->get("event_dispatcher")->dispatch("security.interactive_login", $event);

            $logger->info("USER SIGNED IN SUCCESSFULLY", array( "username" => $username));

            $response = array("success" => true, "user" => $user);
            return $this->getSerializedResponse($response, array("auth"));
        } else {
            $errorCode = UserErrors::USER_INCORRECT_PASSWORD;
            $logger->info(UserErrors::getErrorMessage($errorCode), array( "username" => $username));
            return $this->getErrorResponse(UserErrors::class, $errorCode);
        }

    }

    /**
     * Retrieves roles from user and appends SwitchUserRole if original token contained one.
     *
     * @param User $user
     * @param TokenInterface $token
     * @return array The user roles
     */
    private function getRoles(User $user, TokenInterface $token)
    {
        $roles = $user->getRoles();

        foreach ($token->getRoles() as $role) {
            if ($role instanceof SwitchUserRole) {
                $roles[] = $role;

                break;
            }
        }

        return $roles;
    }

    /**
     * @param Request $request
     * @return Response
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     * @Rest\Post("/register")
     * @Rest\RequestParam(name="email", nullable=false,strict=true)
     * @Rest\RequestParam(name="firstName", nullable=false,strict=true)
     * @Rest\RequestParam(name="lastName", nullable=false,strict=true)
     * @Rest\RequestParam(name="companyLegalName", nullable=false,strict=true)
     */
    public function postRegisterAction(Request $request)
    {
        $logger = $this->get('logger');
        $email = $request->get("email");

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errorCode = UserErrors::USER_EMAIL_NOT_VALID;
            $logger->info(UserErrors::getErrorMessage($errorCode), array( "email" => $email));
            return $this->getErrorResponse(UserErrors::class, $errorCode);
        }

        $user = $this->getDoctrine()
            ->getRepository('AppBundle:User')
            ->findOneBy(['email' => $email]);

        if ($user && $user->getLastLogin() != null) {
            $errorCode = UserErrors::USER_ALREADY_EXISTS;
            $logger->info(UserErrors::getErrorMessage($errorCode), array( "email" => $email));
            return $this->getErrorResponse(UserErrors::class, $errorCode);
        }

        /** @var $userManager UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');

        $tokenGenerator = $this->get('fos_user.util.token_generator');
        $emailService = $this->container->get("AppBundle\Service\EmailService");
        /** @var User $user */
        if (!$user) $user = $userManager->createUser();

        $userStatus = $this->getDoctrine()
            ->getRepository('AppBundle:UserStatus')
            ->findByName(User::$PENDING_STATUS);

        if ($userStatus) $user->setStatus($userStatus);

        $user->setEnabled(true);
        $user->setEmail($email);
        $user->setUsername($email);
        $user->setFirstName($request->get("firstName"));
        $user->setLastName($request->get("lastName"));
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

        $logger->info("USER REGISTERED SUCCESSFULLY", array( "email" => $email));

        $response = array("success" => true, "user" => $user);
        return $this->getSerializedResponse($response, array("auth"));
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @Rest\Post("/pre/register")
     * @Rest\RequestParam(name="email", nullable=false,strict=true)
     * @Rest\RequestParam(name="status", nullable=false,strict=true)
     * @Rest\RequestParam(name="firstName", nullable=false,strict=true)
     * @Rest\RequestParam(name="lastName", nullable=false,strict=true)
     */

    public function postPreRegisterAction(Request $request){
        $logger = $this->get('logger');
        $email = $request->get("email");

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errorCode = UserErrors::USER_EMAIL_NOT_VALID;
            $logger->info(UserErrors::getErrorMessage($errorCode), array( "email" => $email));
            return $this->getErrorResponse(UserErrors::class, $errorCode);
        }

        $user = $this->getDoctrine()
            ->getRepository('AppBundle:User')
            ->findOneBy(['email' => $email]);

        if ($user && $user->getLastLogin() != null) {
            $errorCode = UserErrors::USER_ALREADY_EXISTS;
            $logger->info(UserErrors::getErrorMessage($errorCode), array( "email" => $email));
            return $this->getErrorResponse(UserErrors::class, $errorCode);
        }

        $userStatus = $this->getDoctrine()
            ->getRepository('AppBundle:UserStatus')
            ->findOneBy(array('name' => $request->get("status")));

        /** @var $userManager UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');

        /** @var User $user */
        if (!$user) $user = $userManager->createUser();

        $user->setEnabled(true);
        $user->setEmail($email);
        $user->setStatus($userStatus);
        $user->setUsername($email);
        $user->setFirstName($request->get("firstName"));
        $user->setLastName($request->get("lastName"));
        $user->setRegisteredAt(new \DateTime());
        $user->setPlainPassword('');

        $userManager->updateUser($user);

        $logger->info("USER ACCOUNT SUCCESSFULLY CREATED", array( "email" => $email));

        $response = array("success" => true, "user" => $user);
        return $this->getSerializedResponse($response, array("auth"));
    }

    /**
     * @param Request $request
     * @return Response
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     * @Rest\Post("/password/recover")
     * @Rest\RequestParam(name="email", nullable=false,strict=true,description="Email")
     */
    public function postPasswordRecoverAction(Request $request)
    {
        /** @var $userManager UserManagerInterface */
        /** @var User $user */

        $logger = $this->get('logger');
        $email = $request->get("email");

        $user = $this->getDoctrine()
            ->getRepository('AppBundle:User')
            ->findOneBy(['email' => $email]);

        if (!$user) {
            $errorCode = UserErrors::USER_NOT_EXISTS;
            $logger->info(UserErrors::getErrorMessage($errorCode), array( "email" => $email));
            return $this->getErrorResponse(UserErrors::class, $errorCode);
        }

        $userManager = $this->get('fos_user.user_manager');
        $tokenGenerator = $this->get('fos_user.util.token_generator');
        $emailService = $this->container->get("AppBundle\Service\EmailService");

        if (null === $user->getConfirmationToken()) {
            $user->setConfirmationToken($tokenGenerator->generateToken());
        }
        $user->setPasswordRequestedAt(new \DateTime());
        $userManager->updateUser($user);
        $router = $this->container->get('router');
        $confirmationUrl = $router->generate('app_reset_password', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL);

        $hostUrl = $this->container->getParameter("carena_host_url");
        $params = array(
            "hostUrl" => $hostUrl,
            "user" => $user,
            "confirmationUrl" => $confirmationUrl
        );

        $emailService->forgotPassword($params);

        $logger->info("USER RECOVERED PASSWORD SUCCESSFULLY", array( "email" => $email));

        $response = array("success" => true, "user" => $user);
        return $this->getSerializedResponse($response, array("auth"));
    }

    /**
     * @param Request $request
     * @return Response
     * @Rest\Post("/password/update")
     * @Rest\RequestParam(name="password", nullable=false,strict=true)
     * @Rest\RequestParam(name="confirmationToken", nullable=false,strict=true)
     */
    public function postPasswordUpdateAction(Request $request)
    {
        /** @var $userManager UserManagerInterface */
        /** @var User $user */

        $logger = $this->get('logger');
        $confirmationToken = $request->get("confirmationToken");

        $user = $this->getDoctrine()
            ->getRepository('AppBundle:User')
            ->findOneBy(['confirmationToken' => $confirmationToken]);

        if (!$user) {
            $errorCode = UserErrors::USER_NOT_EXISTS;
            $logger->info(UserErrors::getErrorMessage($errorCode), array( "confirmationToken" => $confirmationToken));
            return $this->getErrorResponse(UserErrors::class, $errorCode);
        }

        if (!$user->isPasswordRequestNonExpired($this::PASSWORD_REQUEST_TTL)) {
            $errorCode = UserErrors::PASSWORD_REQUEST_EXPIRED;
            $logger->info(UserErrors::getErrorMessage($errorCode), array( "confirmationToken" => $confirmationToken));
            return $this->getErrorResponse(UserErrors::class, $errorCode);
        }

        $userManager = $this->get('fos_user.user_manager');
        $tokenGenerator = $this->get('fos_user.util.token_generator');
        $emailService = $this->container->get("AppBundle\Service\EmailService");

        $user->setConfirmationToken(null);
        $user->setPlainPassword($request->get("password"));
        $userManager->updateUser($user);
        $hostUrl = $this->container->getParameter("carena_host_url");
        $params = array(
            "hostUrl" => $hostUrl,
            "user" => $user,
        );

        //$emailService->forgotPassword($params);

        $logger->info("USER UPDATED PASSWORD SUCCESSFULLY", array( "email" => $user->getEmail()));

        $response = array("success" => true, "user" => $user);
        return $this->getSerializedResponse($response, array("auth"));
    }

}

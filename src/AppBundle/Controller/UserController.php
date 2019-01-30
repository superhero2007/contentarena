<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Error\UserErrors;
use AppBundle\Service\EmailService;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\Validator\Constraints\DateTime;

class UserController extends FOSRestController
{
    use \ApiBundle\Helper\ControllerHelper;
    use \ApiBundle\Helper\EmailHelper;

    /**
     * @param Request $request
     * @return Response
     * @Rest\Post("/login")
     */
    public function postLoginAction(Request $request)
    {
        $username = $request->request->get('username');
        $password = $request->request->get('password');

        if(is_null($username) || is_null($password)) {
            return $this->getErrorResponse(UserErrors::class, UserErrors::USER_MISSING_LOGIN_DATA);
        }

        $user_manager = $this->get('fos_user.user_manager');
        $factory = $this->get('security.encoder_factory');

        $user = $user_manager->findUserByUsername($username);

        if(is_null($user)) {
            return $this->getErrorResponse(UserErrors::class, UserErrors::USER_INCORRECT_PASSWORD);
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
            $response = array("success" => true, "user" => $user);
            return $this->getSerializedResponse($response, array("auth"));
        } else {
            return $this->getErrorResponse(UserErrors::class, UserErrors::USER_INCORRECT_PASSWORD);
        }

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
     * @Rest\RequestParam(name="title", nullable=false,strict=true)
     * @Rest\RequestParam(name="country", nullable=false,strict=true)
     * @Rest\RequestParam(name="phone", nullable=false,strict=true)
     * @Rest\RequestParam(name="companyLegalName", nullable=false,strict=true)
     */
    public function postRegisterAction(Request $request)
    {

        $user = $this->getDoctrine()
            ->getRepository('AppBundle:User')
            ->findOneBy(['email' => $request->get("email")]);

        if ($user) {
            return $this->getErrorResponse(UserErrors::class, UserErrors::USER_ALREADY_EXISTS);
        }

        /** @var $userManager UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');

        $tokenGenerator = $this->get('fos_user.util.token_generator');
        $emailService = $this->container->get("AppBundle\Service\EmailService");
        /** @var User $user */
        $user = $userManager->createUser();
        $user->setEnabled(true);
        $user->setEmail($request->get("email"));
        $user->setTitle($request->get("title"));
        $user->setCountry($request->get("country"));
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

        $user = $this->getDoctrine()
            ->getRepository('AppBundle:User')
            ->findOneBy(['email' => $request->get("email")]);

        if (!$user) {
            return $this->getErrorResponse(UserErrors::class, UserErrors::USER_NOT_EXISTS);
        }

        $userManager = $this->get('fos_user.user_manager');
        $tokenGenerator = $this->get('fos_user.util.token_generator');
        $emailService = $this->container->get("AppBundle\Service\EmailService");

        if (null === $user->getConfirmationToken()) {
            $user->setConfirmationToken($tokenGenerator->generateToken());
        }

        $userManager->updateUser($user);
        $confirmationUrl = $this->container->get('router')->generate('fos_user_registration_confirm_new', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL);
        $hostUrl = $this->container->getParameter("carena_host_url");
        $params = array(
            "hostUrl" => $hostUrl,
            "user" => $user,
            "confirmationUrl" => $confirmationUrl
        );

        $emailService->forgotPassword($params);

        $response = array("success" => true, "user" => $user);
        return $this->getSerializedResponse($response, array("auth"));
    }

}

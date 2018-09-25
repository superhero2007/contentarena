<?php

namespace ApiBundle\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\Validator\Constraints\DateTime;

class LoginController extends FOSRestController
{
    use \ApiBundle\Helper\ControllerHelper;
    use \ApiBundle\Helper\EmailHelper;

    public function postLoginAction(Request $request)
    {
        $username = $request->request->get('username');
        $password = $request->request->get('password');

        if(is_null($username) || is_null($password)) {
            return new JsonResponse(
                array("success" => false, "message" => 'Please verify all your inputs.'),
                Response::HTTP_UNAUTHORIZED,
                array('Content-type' => 'application/json')
            );
        }

        $user_manager = $this->get('fos_user.user_manager');
        $factory = $this->get('security.encoder_factory');

        $user = $user_manager->findUserByUsername($username);

        if(is_null($user)) {
            return new JsonResponse(
                array("success" => false, "message" => 'User not found'),
                Response::HTTP_UNAUTHORIZED,
                array('Content-type' => 'application/json')
            );
        }

        $encoder = $factory->getEncoder($user);
        $salt = $user->getSalt();

        if($encoder->isPasswordValid($user->getPassword(), $password, $salt)) {
            $response = new JsonResponse(
                array("success" => true),
                Response::HTTP_OK,
                array('Content-type' => 'application/json')
            );
            // Here, "public" is the name of the firewall in your security.yml
            $token = new UsernamePasswordToken($user, $user->getPassword(), "public", $user->getRoles());

            // For older versions of Symfony, use security.context here
            $this->get("security.token_storage")->setToken($token);

            // Fire the login event
            // Logging the user in above the way we do it doesn't do this automatically
            $event = new InteractiveLoginEvent($request, $token);
            $this->get("event_dispatcher")->dispatch("security.interactive_login", $event);
        } else {
            $response = new JsonResponse(
                array("success" => false),
                Response::HTTP_UNAUTHORIZED,
                array('Content-type' => 'application/json')
            );
        }

        return $response;
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
        $user->setEnabled(false);
        $user->setEmail($request->get("email"));
        $user->setTitle($request->get("title"));
        $user->setCountry($request->get("country"));
        $user->setUsername($request->get("username"));
        $user->setFirstName($request->get("firstName"));
        $user->setLastName($request->get("lastName"));
        $user->setPhone($request->get("phone"));
        $user->setRegisteredAt(new \DateTime());
        $user->setCompanyLegalName($request->get("companyLegalName"));
        $user->setCompanyWebsite($request->get("companyWebsite"));
        $user->setPlainPassword('');
        if (null === $user->getConfirmationToken()) {
            $user->setConfirmationToken($tokenGenerator->generateToken());
        }

        $userManager->updateUser($user);


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
        $view = $this->view($data);
        return $this->handleView($view);
    }

}

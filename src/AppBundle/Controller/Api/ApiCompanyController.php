<?php

namespace AppBundle\Controller\Api;

use AppBundle\Helper\ControllerHelper;
use AppBundle\Service\EmailService;
use AppBundle\Service\TestService;
use AppBundle\Service\UserService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;

class ApiCompanyController extends Controller
{

    use ControllerHelper;

    const MARKETPLACE_PAGE_SIZE = 10;

    public function __construct()
    {

    }

    /**
     * @Route("/api/company/invite", name="inviteCompanyUsers")
     * @param Request $request
     * @param UserService $userService
     * @param EmailService $emailService
     * @return mixed|string|\Symfony\Component\HttpFoundation\Response
     */
    public function inviteCompanyUsers(Request $request, UserService $userService, EmailService $emailService)
    {
        $user = $this->getUser();
        $users = $request->get("users");
        $hostUrl = $this->container->getParameter("carena_host_url");
        $filteredUsers = $userService->inviteCompanyUsers($users, $user->getCompany());

        foreach ($filteredUsers["invitedUsers"] as $invitedUser){
            $params = array(
                "hostUrl" => $hostUrl,
                "user" => $invitedUser,
                "colleague" => $user
            );

            $emailService->sendUserInvite($params);
        }

        return $this->getSerializedResponse($filteredUsers, array('companyUsers') );
    }


    /**
     * @Route("/api/company/users", name="getCompanyUsers")
     */
    public function getCompanyUsers()
    {
        $user = $this->getUser();
        $users = $user->getCompany()->getUsers();
        return $this->getSerializedResponse($users, array('companyUsers') );
    }

    /**
     * @Route("/api/company/update", name="updateCompany")
     * @param Request $request
     * @param UserService $userService
     * @return mixed|string|\Symfony\Component\HttpFoundation\Response
     */
    public function updateCompany(Request $request, UserService $userService)
    {
        $user = $this->getUser();
        $company = $userService->updateCompany($request->get("company"), $user);
        return $this->getSerializedResponse($company, array('settings') );

    }

}
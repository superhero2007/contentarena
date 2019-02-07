<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\CompanySnapshot;
use AppBundle\Helper\ControllerHelper;
use AppBundle\Service\BundleService;
use AppBundle\Service\EmailService;
use AppBundle\Service\FileUploader;
use AppBundle\Service\TermsService;
use AppBundle\Service\TestService;
use AppBundle\Service\UserService;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use AppBundle\Entity\Bid;
use AppBundle\Entity\Company;
use AppBundle\Entity\Content;
use AppBundle\Entity\ContentFilter;
use AppBundle\Entity\LicenseAgreement;
use AppBundle\Entity\RightsPackage;
use AppBundle\Entity\SalesPackage;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\GeneratorBundle\Model\Bundle;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\ContentService;
use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;
use PDFMerger;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

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
        $invitedUsers = $userService->inviteCompanyUsers($users, $user->getCompany());

        foreach ($invitedUsers as $invitedUser){
            $params = array(
                "hostUrl" => $hostUrl,
                "user" => $invitedUser,
                "colleague" => $user
            );

            $emailService->sendUserInvite($params);
        }

        return $this->getSerializedResponse($invitedUsers, array('companyUsers') );
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
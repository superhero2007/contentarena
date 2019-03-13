<?php

namespace AppBundle\Controller\Api;

use AppBundle\Helper\ControllerHelper;
use AppBundle\Service\EmailService;
use AppBundle\Service\FixtureService;
use AppBundle\Service\JobService;
use AppBundle\Service\TestService;
use AppBundle\Service\UserService;
use AppBundle\Service\CompanyService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ApiFixtureController extends Controller
{

    use ControllerHelper;


    public function __construct()
    {

    }

    /**
     * @Route("/api/fixture/create", name="createFixtures")
     * @param Request $request
     * @param FixtureService $fixtureService
     * @return mixed|string|\Symfony\Component\HttpFoundation\Response
     */
    public function createFixtures(
        Request $request,
        FixtureService $fixtureService
    )
    {
        $user = $this->getUser();
        $users = $request->get("users");
        $fixtures = $request->get("fixtures");

        $fixtures = $fixtureService->createFixture($fixtures);


        return $this->getSerializedResponse($fixtures, array('property') );
    }




}

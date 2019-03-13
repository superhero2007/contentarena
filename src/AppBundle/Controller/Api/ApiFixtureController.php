<?php

namespace AppBundle\Controller\Api;

use AppBundle\Helper\ControllerHelper;
use AppBundle\Service\EmailService;
use AppBundle\Service\FixtureService;
use AppBundle\Service\JobService;
use AppBundle\Service\PropertyService;
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
     * @param PropertyService $propertyService
     * @return mixed|string|\Symfony\Component\HttpFoundation\Response
     * @throws \Exception
     */
    public function createFixtures(
        Request $request,
        FixtureService $fixtureService,
        PropertyService $propertyService
    )
    {
        $user = $this->getUser();
        $seasonId = $request->get("seasonId");
        $fixture = $request->get("fixture");
        $propertyId = $request->get("propertyId");

        $season = $this->getDoctrine()->getRepository("AppBundle:Season")->findOneBy(array(
            "id" => $seasonId
        ));
        $property = $this->getDoctrine()->getRepository("AppBundle:Property")->findOneBy(array(
            "id" => $propertyId
        ));

        if ($property->getCompany()->getId() != $user->getCompany()->getId()) throw new \Exception("Invalid company user");

        $fixtureService->createFixture($fixture, $season, $property);
        $property = $propertyService->getPropertyDetails($property);

        return $this->getSerializedResponse($property, array('property') );
    }

    /**
     * @Route("/api/fixture/remove", name="removeFixture")
     * @param Request $request
     * @param FixtureService $fixtureService
     * @param PropertyService $propertyService
     * @return mixed|string|\Symfony\Component\HttpFoundation\Response
     * @throws \Exception
     */
    public function removeFixture(
        Request $request,
        FixtureService $fixtureService,
        PropertyService $propertyService
    )
    {
        $user = $this->getUser();
        $fixture = $request->get("fixture");

        $property = $fixtureService->removeFixture($fixture, $user);
        $property = $propertyService->getPropertyDetails($property);

        return $this->getSerializedResponse($property, array('property') );
    }

    /**
     * @Route("/api/fixture/update", name="updateFixtures")
     * @param Request $request
     * @param FixtureService $fixtureService
     * @return mixed|string|\Symfony\Component\HttpFoundation\Response
     * @throws \Exception
     */
    public function updateFixtures(
        Request $request,
        FixtureService $fixtureService,
        PropertyService $propertyService
    )
    {
        $user = $this->getUser();
        $fixture = $request->get("fixture");

        $property = $fixtureService->updateFixture($fixture, $user);
        $property = $propertyService->getPropertyDetails($property);

        return $this->getSerializedResponse($property, array('property') );
    }

    /**
     * @Route("/api/fixture/all", name="getAllFixtures")
     * @param Request $request
     * @param FixtureService $fixtureService
     * @return mixed|string|\Symfony\Component\HttpFoundation\Response
     */
    public function getAllFixtures(
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

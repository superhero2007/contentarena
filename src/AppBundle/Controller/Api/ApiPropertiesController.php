<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Property;
use AppBundle\Entity\User;
use AppBundle\Error\PropertyErrors;
use AppBundle\Helper\ControllerHelper;
use AppBundle\Service\ContentService;
use AppBundle\Service\PropertyService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class ApiPropertiesController extends Controller
{

    use ControllerHelper;

    public function __construct()
    {

    }


    /**
     * @Route("/api/properties/all", name="getAllProperties")
     * @param PropertyService $propertyService
     * @return \AppBundle\Entity\Property[]|array|mixed|string|\Symfony\Component\HttpFoundation\Response
     */
    public function getAllProperties(
        PropertyService $propertyService
    )
    {
        /* @var User $user */
        $user = $this->getUser();
        $properties = $propertyService->getAllCompanyProperties($user);
        return $this->getSerializedResponse(array(
            "properties" => $properties
        ), array("propertyList"));
    }

    /**
     * @Route("/api/properties/detail", name="getProperty")
     * @param Request $request
     * @param PropertyService $propertyService
     * @return mixed|string|\Symfony\Component\HttpFoundation\JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function getProperty(
        Request $request,
        PropertyService $propertyService
    )
    {
        $customId = $request->get("propertyId");
        $user = $this->getUser();

        $property = $propertyService->getPropertyDetails($customId, $user);

        if ($property == null ) {
            $errorCode = PropertyErrors::PROPERTY_DOES_NOT_EXISTS;
            return $this->getErrorResponse(PropertyErrors::class, $errorCode);
        }

        return $this->getSerializedResponse(array(
            "success" => true,
            "property" => $property,
        ), array("property"));
    }

    /**
     * @Route("/api/properties/create", name="crateProperty")
     * @param Request $request
     * @param PropertyService $propertyService
     * @return mixed|string|\Symfony\Component\HttpFoundation\Response
     * @throws \Exception
     */
    public function crateProperty(
        Request $request,
        PropertyService $propertyService
    )
    {
        /* @var Property $property */
        $user = $this->getUser();
        $data = $request->get("property");
        $property = $this->deserialize( $data, "AppBundle\Entity\Property");
        $createdProperty = $propertyService->createProperty($property, $user);
        return $this->getSerializedResponse($createdProperty, array("property"));

    }
}

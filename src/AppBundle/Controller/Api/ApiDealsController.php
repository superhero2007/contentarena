<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Bid;
use AppBundle\Entity\Content;
use AppBundle\Entity\Property;
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\User;
use AppBundle\Error\ListingErrors;
use AppBundle\Helper\ControllerHelper;
use AppBundle\Service\ContentService;
use AppBundle\Service\DealService;
use AppBundle\Service\EmailService;
use AppBundle\Service\FileUploader;
use AppBundle\Service\FixtureService;
use AppBundle\Service\ListingService;
use AppBundle\Service\PropertyService;
use AppBundle\Service\WatchlistService;
use Exception;
use JMS\Serializer\Serializer;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Service\BidService;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;
use Twig_Error_Loader;
use Twig_Error_Runtime;
use Twig_Error_Syntax;

class ApiDealsController extends Controller
{

    use ControllerHelper;

    /**
     * @Route("/api/deals/property/add", name="addPropertyDeals")
     * @param Request $request
     * @param PropertyService $propertyService
     * @param DealService $dealService
     * @return mixed|string|Response
     */
    public function addPropertyDeals(
        Request $request,
        PropertyService $propertyService,
        DealService $dealService
    )
    {
        /* @var Property $property */
        $user = $this->getUser();
        $propertyData = $request->get('property');
        $dealsData = $request->get('deals');

        foreach ($dealsData as $dealData){

            $deal = $this->deserialize($dealData, "AppBundle\Entity\Deal");
            $bundle = $this->deserialize($dealData, "AppBundle\Entity\TerritorialBundle");
            $deal = $dealService->createCustomDeal($deal, $user, $bundle);
        }

        return $this->getSerializedResponse(array(
            "success" => true,
        ), array("property"));
    }

    public function deserialize($data, $type){
        /* @var Serializer $serializer */
        $serializer = $this->container->get('jms_serializer');
        $object = $serializer->deserialize(json_encode($data), $type, 'json');
        return $object;
    }

}

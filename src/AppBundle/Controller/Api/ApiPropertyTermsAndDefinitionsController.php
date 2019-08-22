<?php

namespace AppBundle\Controller\Api;

use AppBundle\Helper\ControllerHelper;
use AppBundle\Service\TermsService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class ApiPropertyTermsAndDefinitionsController extends Controller
{

    use ControllerHelper;

    public function __construct()
    {

    }

    /**
     * @Route("/api/property/terms", name="getPropertyTerms")
     * @param Request $request
     * @param TermsService $termsService
     * @return Response
     */
    public function getPropertyTerms(Request $request, TermsService $termsService)
    {
        $propertyId = $request->get('property_id');
        $property = $this->getDoctrine()->getRepository("AppBundle:Property")->findOneBy(array("customId"=>$propertyId));
        $terms = $termsService->getPropertyTerms($property);
        return $this->getSerializedResponse($terms, array('terms'));

    }

    /**
     * @Route("/api/property/terms/restore", name="restorePropertyTerms")
     * @param Request $request
     * @param TermsService $termsService
     * @return Response
     */
    public function restorePropertyTerms(Request $request, TermsService $termsService)
    {
        $propertyId = $request->get('property_id');
        $property = $this->getDoctrine()->getRepository("AppBundle:Property")->findOneBy(array("customId"=>$propertyId));
        $termsService->restorePropertyTermItems($property);
        $terms = $termsService->getPropertyTerms($property);
        return $this->getSerializedResponse($terms, array('terms'));
    }

    /**
     * @Route("/api/property/terms/update", name="updatePropertyTerm")
     * @param Request $request
     * @param TermsService $termsService
     * @return Response
     */
    public function updatePropertyTerm(Request $request, TermsService $termsService)
    {
        $propertyId = $request->get('property_id');
        $property = $this->getDoctrine()->getRepository("AppBundle:Property")->findOneBy(array("customId"=>$propertyId));
        $term = $request->get('term');
        if ($term != null) $term = $termsService->updatePropertyTermItem($property, $term);
        return $this->getSerializedResponse( array("success"=>true, "term" => $term), array('terms'));
    }

    /**
     * @Route("/api/property/definitions", name="getPropertyDefinitions")
     * @param Request $request
     * @param TermsService $termsService
     * @return Response
     */
    public function getPropertyDefinitions(Request $request, TermsService $termsService)
    {
        $propertyId = $request->get('propertyId');
        $property = $this->getDoctrine()->getRepository("AppBundle:Property")->findOneBy(array("customId"=>$propertyId));
        $terms = $termsService->getPropertyDefinitions($property);
        return $this->getSerializedResponse($terms, array('terms'));
    }

    /**
     * @Route("/api/property/definitions/restore", name="restorePropertyDefinitions")
     * @param Request $request
     * @param TermsService $termsService
     * @return Response
     */
    public function restorePropertyDefinitions(Request $request, TermsService $termsService)
    {
        $propertyId = $request->get('property_id');
        $property = $this->getDoctrine()->getRepository("AppBundle:Property")->findOneBy(array("customId"=>$propertyId));
        $termsService->restorePropertyDefinitions($property);
        $terms = $termsService->getPropertyDefinitions($property);
        return $this->getSerializedResponse($terms, array('terms'));
    }

    /**
     * @Route("/api/property/definitions/update", name="updatePropertyDefinition")
     * @param Request $request
     * @param TermsService $termsService
     * @return JsonResponse
     */
    public function updatePropertyDefinition(Request $request, TermsService $termsService)
    {
        $propertyId = $request->get('property_id');
        $property = $this->getDoctrine()->getRepository("AppBundle:Property")->findOneBy(array("customId"=>$propertyId));
        $definition = $request->get('definition');
        if ($definition != null) $definition = $termsService->updatePropertyDefinition($property, $definition);
        return $this->getSerializedResponse( array("success"=>true, "definition" => $definition), array('terms'));
    }

    /**
     * @Route("/api/property/definitions/remove", name="removePropertyDefinition")
     * @param Request $request
     * @param TermsService $termsService
     * @return JsonResponse
     */
    public function removePropertyDefinition(Request $request, TermsService $termsService)
    {
        $propertyId = $request->get('property_id');
        $property = $this->getDoctrine()->getRepository("AppBundle:Property")->findOneBy(array("customId"=>$propertyId));
        $definition = $request->get('definition');
        if ($definition != null) $termsService->removePropertyDefinition($property, $definition);

        return $this->getSerializedResponse(array("success"=>true));
    }

}

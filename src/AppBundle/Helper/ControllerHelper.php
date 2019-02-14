<?php

namespace AppBundle\Helper;

use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;
use Symfony\Component\HttpFoundation\JsonResponse;

trait ControllerHelper
{
    /**
     * Set base HTTP headers.
     *
     * @param Response $response
     *
     * @return Response
     */
    private function setBaseHeaders(Response $response)
    {
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

    /**
     * Data serializing via JMS serializer.
     *
     * @param mixed $data
     *
     * @return string JSON string
     */
    public function serialize($data, $context = null){

        if (!isset($context) ) $context = SerializationContext::create()->enableMaxDepthChecks();
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        return $serializer->serialize($data, 'json',$context);

    }

    /**
     * @param $data
     * @param $groups
     * @return mixed|string|Response
     */
    private function getSerializedResponse ($data, $groups = null){
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $context = SerializationContext::create();

        if ( $groups != null ) $context->setGroups($groups);

        $response = $serializer->serialize($data, 'json',$context);
        $response = new Response($response);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @param $class
     * @param $errorCode
     * @return JsonResponse
     */
    private function getErrorResponse ($class, $errorCode){
        return new JsonResponse(
            $data = array(
                "success" => false,
                "code" => $errorCode,
                "message" => $class::getErrorMessage($errorCode),
            ),
            Response::HTTP_BAD_REQUEST
        );
    }

}
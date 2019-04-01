<?php

namespace AppBundle\Helper;

use AppBundle\Error\ErrorInterface;
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
     * @param null $errorMessage
     * @return JsonResponse
     */
    private function getErrorResponse ( $class, $errorCode, $errorMessage = null ){
        /* @var ErrorInterface $class  */
        return new JsonResponse(
            $data = array(
                "success" => false,
                "code" => $errorCode,
                "message" => ($errorMessage != null) ? $errorMessage : $class::getErrorMessage($errorCode),
            ),
            Response::HTTP_BAD_REQUEST
        );
    }

    /**
     * @param $class
     * @param $errorCode
     * @param null $errorMessage
     * @return JsonResponse
     */
    private function getHandledErrorResponse ($class, $errorCode, $errorMessage = null ){
        /* @var ErrorInterface $class  */

        $message = $class::getErrorMessage($errorCode);
        if ($errorMessage != null) $message = $message . " - " . $errorMessage;

        return new JsonResponse(
            $data = array(
                "success" => false,
                "code" => $errorCode,
                "message" => $message,
            ),
            Response::HTTP_OK
        );
    }

}

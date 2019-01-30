<?php

namespace ApiBundle\Helper;

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
    public function serialize($data)
    {
        $context = new SerializationContext();
        $context->setSerializeNull(true);

        return $this->get('jms_serializer')
            ->serialize($data, 'json', $context);
    }

    /**
     * @param $data
     * @param $groups
     * @return mixed|string|Response
     */
    private function getSerializedResponse ($data, $groups){
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $response = $serializer->serialize($data, 'json',SerializationContext::create()->setGroups($groups));
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
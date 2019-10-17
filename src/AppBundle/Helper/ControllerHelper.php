<?php

namespace AppBundle\Helper;

use AppBundle\Error\ErrorInterface;
use JMS\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;
use Symfony\Component\HttpFoundation\JsonResponse;

trait ControllerHelper
{

    /**
     * Data serializing via JMS serializer.
     *
     * @param mixed $data
     *
     * @param null $context
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
     * @param $type
     * @return array|\JMS\Serializer\scalar|mixed|object
     */
    public function deserialize($data, $type){
        /* @var Serializer $serializer */
        $serializer = $this->container->get('jms_serializer');
        $object = $serializer->deserialize(json_encode($data), $type, 'json');
        return $object;
    }

    public function deserializeNormal($data, $type){
        /* @var Serializer $serializer */
        $serializer = $this->container->get('jms_serializer');
        $object = $serializer->deserialize(json_encode($data), $type, 'json');
        return $object;
    }

    /**
     * @param $data
     * @param $groups
     * @param null $serializer
     * @return mixed|string|Response
     */
    private function getSerializedResponse ($data, $groups = null, $serializer = null){
        /* @var Serializer $serializer */
        if ($serializer == null) $serializer = $this->container->get('jms_serializer');
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

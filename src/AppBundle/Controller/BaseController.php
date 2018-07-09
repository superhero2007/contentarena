<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;


class BaseController extends Controller
{

    private $namingStrategy;

    protected $serializer;

    public function __construct()
    {
        $this->namingStrategy = new IdenticalPropertyNamingStrategy();
        $this->serializer = SerializerBuilder::create()->setPropertyNamingStrategy($this->namingStrategy)->build();
    }

    public function serialize($data, $context = null){

        if (!isset($context) ) $context = SerializationContext::create()->enableMaxDepthChecks();
        return $this->serializer->serialize($data, 'json',$context);

    }



}
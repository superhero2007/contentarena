<?php

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\BrowserKit\Client;
use Symfony\Component\BrowserKit\Cookie;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class HelperController extends WebTestCase
{
    /**
     * @var Client
     */
    public $client = null;

    public function setUp()
    {
        $this->client = $this->createAuthorizedClient();
    }

    protected function createAuthorizedClient()
    {
        $client = static::createClient();
        $container = static::$kernel->getContainer();
        $session = $container->get('session');
        $person = $container->get('doctrine')->getRepository('AppBundle:User')->findOneBy(array("email" => "admin@contentarena.com"));

        $token = new UsernamePasswordToken($person, null, 'main', $person->getRoles());
        $session->set('_security_main', serialize($token));
        $session->save();

        $client->getCookieJar()->set(new Cookie($session->getName(), $session->getId()));

        return $client;
    }

}

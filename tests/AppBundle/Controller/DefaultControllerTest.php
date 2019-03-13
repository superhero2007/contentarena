<?php

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\BrowserKit\Client;
use Symfony\Component\BrowserKit\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class DefaultControllerTest extends WebTestCase
{

    /* @var Client $client */
    private $client = null;

    public function setUp()
    {
        $this->client = $this->createAuthorizedClient();
    }

    /**
     * @return Client
     */
    protected function createAuthorizedClient()
    {
        $client = static::createClient();
        $container = $client->getContainer();

        $session = $container->get('session');
        /** @var $userManager \FOS\UserBundle\Doctrine\UserManager */
        $userManager = $container->get('fos_user.user_manager');
        /** @var $loginManager \FOS\UserBundle\Security\LoginManager */
        $loginManager = $container->get('fos_user.security.login_manager');
        $firewallName = $container->getParameter('fos_user.firewall_name');

        $user = $userManager->findUserBy(array('username' => 'newuser@contentarena.com'));
        $loginManager->loginUser($firewallName, $user);

        $token = new UsernamePasswordToken($user, $user->getPassword(), "main", $user->getRoles());

        // save the login token into the session and put it in a cookie
        $container->get('session')->set('_security_' . $firewallName, serialize($token));
        $container->get('session')->save();
        $client->getCookieJar()->set(new Cookie($session->getName(), $session->getId()));

        return $client;
    }

    public function testHomeWithAnonymousUser()
    {
        $client = static::createClient();

        $client->request('GET', '/');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        //$this->assertContains('Welcome to Symfony', $crawler->filter('#container h1')->text());
    }

    public function testHomeWithUser()
    {
        $this->client->request('GET', '/');
        $this->assertEquals(302, $this->client->getResponse()->getStatusCode());
    }

    public function testMarketplaceWithAnonymousUser()
    {
        $client = static::createClient();
        $client->request('GET', '/marketplace');
        $this->assertEquals(302, $client->getResponse()->getStatusCode());
    }

    public function testMarketplaceWithUser()
    {
        $this->client->request('GET', '/marketplace');
        $this->assertEquals(200, $this->client->getResponse()->getStatusCode());
    }

    public function testRegisterWithAnonymousUser()
    {
        $client = static::createClient();
        $client->request('GET', '/register/aasdasd');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}

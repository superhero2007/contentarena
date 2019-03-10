<?php

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UserControllerTest extends WebTestCase
{
    public function testPostLoginAction()
    {
        $client = static::createClient();

        $params = array(
            "username" => "juancruztalco@gmail.com",
            "password" => "Q!w2e3r4"
        );

        $client->request('POST', '/api/users/login', $params);

        $response = $client->getResponse();

        //$this->assertEquals(200, $response->getStatusCode());

        $content = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('success', $content);

        $success = $content["success"];

        if ( $success ) {
            $this->assertArrayHasKey('user', $content);
            $user = $content["user"];
            $this->assertArrayHasKey('id', $user);
            $this->assertArrayHasKey('email', $user);
            $this->assertArrayHasKey('firstName', $user);
            $this->assertArrayHasKey('lastName', $user);

        } else {
            $this->assertArrayHasKey('message', $content);
            $this->assertArrayHasKey('code', $content);
        }



    }
}

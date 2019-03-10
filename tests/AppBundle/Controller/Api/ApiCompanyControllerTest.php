<?php

namespace Tests\AppBundle\Controller;


class ApiCompanyControllerTest extends HelperController
{

    public function testInviteCompanyUsers()
    {

        $userData = array(
            "email" => "juancruztalco@gmail.com",
            "firstName" => "Juan",
            "lastName" => "Cruz"
        );

        $this->client->request('POST', '/api/company/invite', array("users" => array($userData)));
        $response = $this->client->getResponse();

        $this->assertEquals(200, $response->getStatusCode());

        $content = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('invitedUsers', $content);
        $this->assertArrayHasKey('skippedUsers', $content);

    }


}

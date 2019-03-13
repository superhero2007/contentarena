<?php

namespace Tests\AppBundle\Controller;

use AppBundle\Error\UserErrors;
use AppBundle\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UserControllerTest extends WebTestCase
{
    private static $container;

    /* @var UserService $userService */
    private static $userService;

    private static $email = "newuser@contentarena.com";

    private static $notExistingEmail = "nonexistinguser@gmailasdasd.com";

    private static $password = "Q!w2e3r4";

    public static function setUpBeforeClass()
    {
        //start the symfony kernel
        $kernel = static::createKernel();
        $kernel->boot();

        self::$container = $kernel->getContainer();
        self::$userService = self::$container->get('AppBundle\Service\UserService');
        self::$userService->removeUserByEmail(self::$email);
    }

    public function testPostRegisterActionWithNewUser()
    {
        $client = static::createClient();

        $params = array(
            "email" => self::$email,
            "firstName" => "John",
            "lastName" => "Doe",
            "companyLegalName" => "Content Arena"
        );

        $client->request('POST', '/api/users/register', $params);

        $response = $client->getResponse();

        $content = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('success', $content);
        $success = $content["success"];
        $this->assertEquals(true, $success);
        $this->assertArrayHasKey('user', $content);
        $user = $content["user"];
        $this->assertArrayHasKey('id', $user);
        $this->assertArrayHasKey('email', $user);
        $this->assertArrayHasKey('firstName', $user);
        $this->assertArrayHasKey('lastName', $user);
    }

    public function testPostRegisterActionWithExistingButNotLoggedUser()
    {
        $client = static::createClient();

        $params = array(
            "email" => self::$email,
            "firstName" => "John",
            "lastName" => "Doe",
            "companyLegalName" => "Content Arena"
        );

        $client->request('POST', '/api/users/register', $params);

        $response = $client->getResponse();
        $content = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('success', $content);
        $success = $content["success"];
        $this->assertEquals(true, $success);
        $this->assertArrayHasKey('user', $content);
        $user = $content["user"];
        $this->assertArrayHasKey('id', $user);
        $this->assertArrayHasKey('email', $user);
        $this->assertArrayHasKey('firstName', $user);
        $this->assertArrayHasKey('lastName', $user);

    }

    public function testPostLoginActionWithNonExistingUser()
    {
        $client = static::createClient();

        $params = array(
            "username" => self::$notExistingEmail,
            "password" => self::$password
        );

        $client->request('POST', '/api/users/login', $params);

        $response = $client->getResponse();
        $content = json_decode($response->getContent(), true);
        $code = UserErrors::USER_NOT_EXISTS;
        $this->assertArrayHasKey('success', $content);
        $this->assertEquals(false, $content["success"]);
        $this->assertArrayHasKey('message', $content);
        $this->assertArrayHasKey('code', $content);
        $this->assertEquals(UserErrors::getErrorMessage($code),$content['message']);
        $this->assertEquals($code, $content['code']);
    }

    public function testPostLoginActionWithExistingUserAndWrongPassword()
    {
        $client = static::createClient();

        $params = array(
            "username" => self::$email,
            "password" => self::$password
        );

        $client->request('POST', '/api/users/login', $params);
        $response = $client->getResponse();
        $content = json_decode($response->getContent(), true);
        $code = UserErrors::USER_INCORRECT_PASSWORD;
        $this->assertArrayHasKey('success', $content);
        $this->assertEquals(false, $content["success"]);
        $this->assertArrayHasKey('message', $content);
        $this->assertArrayHasKey('code', $content);
        $this->assertEquals(UserErrors::getErrorMessage($code),$content['message']);
        $this->assertEquals($code, $content['code']);
    }

    public function testPostLoginActionWithExistingUserAndCorrectPassword()
    {
        $client = static::createClient();

        self::$userService->updatePasswordByEmail(self::$email, self::$password);

        $params = array(
            "username" => self::$email,
            "password" => self::$password
        );

        $client->request('POST', '/api/users/login', $params);
        $response = $client->getResponse();
        $content = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('success', $content);
        $this->assertEquals(true, $content["success"]);
        $this->assertArrayHasKey('user', $content);
        $user = $content["user"];
        $this->assertArrayHasKey('id', $user);
        $this->assertArrayHasKey('email', $user);
        $this->assertArrayHasKey('firstName', $user);
        $this->assertArrayHasKey('lastName', $user);
    }

    public function testPostRegisterActionWithExistingAndLoggedUser()
    {
        $client = static::createClient();

        $params = array(
            "email" => self::$email,
            "firstName" => "John",
            "lastName" => "Doe",
            "companyLegalName" => "Content Arena"
        );

        $client->request('POST', '/api/users/register', $params);

        $response = $client->getResponse();
        $content = json_decode($response->getContent(), true);
        $code = UserErrors::USER_ALREADY_EXISTS;
        $this->assertArrayHasKey('success', $content);
        $this->assertEquals(false, $content["success"]);
        $this->assertArrayHasKey('message', $content);
        $this->assertArrayHasKey('code', $content);
        $this->assertEquals(UserErrors::getErrorMessage($code),$content['message']);
        $this->assertEquals($code, $content['code']);

    }

    public function testPostPasswordRecoverActionWithNonExistingUser()
    {
        $client = static::createClient();
        $params = array(
            "email" => self::$notExistingEmail
        );

        $client->request('POST', '/api/users/password/recover', $params);
        $response = $client->getResponse();
        $content = json_decode($response->getContent(), true);
        $code = UserErrors::USER_NOT_EXISTS;
        $this->assertArrayHasKey('success', $content);
        $this->assertEquals(false, $content["success"]);
        $this->assertArrayHasKey('message', $content);
        $this->assertArrayHasKey('code', $content);
        $this->assertEquals(UserErrors::getErrorMessage($code),$content['message']);
        $this->assertEquals($code, $content['code']);
    }

    public function testPostPasswordRecoverActionWithExistingUser()
    {
        $client = static::createClient();
        $params = array(
            "email" => self::$email
        );

        $client->request('POST', '/api/users/password/recover', $params);
        $response = $client->getResponse();
        $content = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('success', $content);
        $this->assertEquals(true, $content["success"]);
        $this->assertArrayHasKey('user', $content);
        $user = $content["user"];
        $this->assertArrayHasKey('id', $user);
        $this->assertArrayHasKey('email', $user);
        $this->assertArrayHasKey('firstName', $user);
        $this->assertArrayHasKey('lastName', $user);
    }

    public function testPostPasswordUpdateActionWithNonExistingUser()
    {
        $client = static::createClient();
        $params = array(
            "confirmationToken" => self::$notExistingEmail,
            "password" => self::$password
        );

        $client->request('POST', '/api/users/password/update', $params);
        $response = $client->getResponse();
        $content = json_decode($response->getContent(), true);
        $code = UserErrors::USER_NOT_EXISTS;
        $this->assertArrayHasKey('success', $content);
        $this->assertEquals(false, $content["success"]);
        $this->assertArrayHasKey('message', $content);
        $this->assertArrayHasKey('code', $content);
        $this->assertEquals(UserErrors::getErrorMessage($code),$content['message']);
        $this->assertEquals($code, $content['code']);
    }

    public function testPostPasswordUpdateActionWithExistingUser()
    {
        $client = static::createClient();
        $user = self::$userService->getUserByEmail(self::$email);
        $params = array(
            "confirmationToken" => $user->getConfirmationToken(),
            "password" => self::$password
        );

        $client->request('POST', '/api/users/password/update', $params);
        $response = $client->getResponse();
        $content = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('success', $content);
        $this->assertEquals(true, $content["success"]);
        $this->assertArrayHasKey('user', $content);
        $user = $content["user"];
        $this->assertArrayHasKey('id', $user);
        $this->assertArrayHasKey('email', $user);
        $this->assertArrayHasKey('firstName', $user);
        $this->assertArrayHasKey('lastName', $user);
    }
}

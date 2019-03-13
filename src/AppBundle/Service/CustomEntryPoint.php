<?php
/**
 * Created by PhpStorm.
 * User: juancruztalco
 * Date: 25/4/19
 * Time: 02:27
 */

namespace AppBundle\Service;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

class CustomEntryPoint implements AuthenticationEntryPointInterface
{

    public function start(Request $request, AuthenticationException $authException = null)
    {
        $response = new Response("", Response::HTTP_UNAUTHORIZED);

        return $response;
    }

}

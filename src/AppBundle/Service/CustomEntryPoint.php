<?php
/**
 * Created by PhpStorm.
 * User: juancruztalco
 * Date: 25/4/19
 * Time: 02:27
 */

namespace AppBundle\Service;

use Symfony\Component\Routing\Router;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

class CustomEntryPoint implements AuthenticationEntryPointInterface
{

    private $authenticationEntryPoint;

    public function __construct(AuthenticationEntryPointInterface $authenticationEntryPoint)
    {
        $this->authenticationEntryPoint = $authenticationEntryPoint;
    }


    public function start(Request $request, AuthenticationException $authException = null)
    {

        if($request->isXmlHttpRequest()) {
            return new Response("", Response::HTTP_UNAUTHORIZED);
        }

        return $this->authenticationEntryPoint->start($request, $authException);

    }

}

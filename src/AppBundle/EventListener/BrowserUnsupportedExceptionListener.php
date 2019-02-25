<?php
/**
 * Created by PhpStorm.
 * User: juancruztalco
 * Date: 18/2/19
 * Time: 07:16
 */

namespace AppBundle\EventListener;

use AppBundle\Controller\DefaultController;
use AppBundle\Exception\BrowserNotSupportedException;
use AppBundle\Exception\BrowserUnsupportedException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;

class BrowserUnsupportedExceptionListener
{

    private $router;
    private $container;

    public function __construct($router, $container)
    {
        $this->router = $router;
        $this->container = $container;
    }

    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        $exception = $event->getException();

        if (!$exception instanceof BrowserUnsupportedException) {
            return;
        }

        $code = 200;
        $responseData = [
            'error' => [
                'code' => $code,
                'message' => $exception->getMessage()
            ]
        ];

        $event->setResponse(new JsonResponse($responseData, $code));
    }

    public function onKernelRequest(GetResponseEvent $event)
    {

        if ( !$this->isBrowserUnsupported() ) return;

        $route = 'unsupported';

        if ($route === $event->getRequest()->get('_route')) {
            return;
        }

        $url = $this->router->generate($route);
        $response = new RedirectResponse($url);
        $event->setResponse($response);

    }

    private function isBrowserUnsupported(){

        $response = false;

        $ua = htmlentities($_SERVER['HTTP_USER_AGENT'], ENT_QUOTES, 'UTF-8');
        if (preg_match('~MSIE|Internet Explorer~i', $ua) || (strpos($ua, 'Trident/7.0') !== false && strpos($ua, 'rv:11.0') !== false)) {
            // do stuff for IE
            $response = true;

        }


        return $response;

    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::CONTROLLER => 'onKernelController',
        ];
    }
}
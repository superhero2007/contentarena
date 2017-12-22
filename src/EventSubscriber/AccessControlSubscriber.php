<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 21/12/2017
 * Time: 11:17 PM
 */

class AccessControlSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return array(
            KernelEvents::RESPONSE => 'onKernelResponse'
        );
    }

    public function onKernelResponse(FilterResponseEvent $event)
    {
        $httpRequestOrigin = $event->getRequest()->headers->get('origin');

        $event->getResponse()->headers->set('Access-Control-Allow-Origin', $httpRequestOrigin);
        $event->getResponse()->headers->set('Access-Control-Allow-Credentials', 'true');
    }
}
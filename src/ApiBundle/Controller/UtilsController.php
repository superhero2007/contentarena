<?php

namespace ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Intl\Intl;
use FOS\RestBundle\Controller\FOSRestController;

class UtilsController extends FOSRestController
{
    use \ApiBundle\Helper\ControllerHelper;

    public function getCountriesAction()
    {

        $countries = Intl::getRegionBundle()->getCountryNames();
        $view = $this->view($countries);
        return $this->handleView($view);
    }

    public function getPackagesAction()
    {

        $user = $this->getDoctrine()
            ->getRepository('AppBundle:RightsPackage')
            ->findAll();

        $view = $this->view($user);
        return $this->handleView($view);
    }

    public function getRightsAction()
    {

        $user = $this->getDoctrine()
            ->getRepository('AppBundle:Rights')
            ->findAll();

        $view = $this->view($user);
        return $this->handleView($view);
    }
}

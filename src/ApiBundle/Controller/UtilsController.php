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


}

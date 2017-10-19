<?php

namespace ContentArenaLayerBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/layer")
     */
    public function indexAction()
    {
        return $this->render('ContentArenaLayerBundle:Default:index.html.twig');
    }
}

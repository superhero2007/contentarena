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

        $entities = array();
        $em = $this->getDoctrine()->getManager();
        $meta = $em->getMetadataFactory()->getAllMetadata();
        foreach ($meta as $m) {
            $entities[] = $m->getName();
        }

        return $this->render('ContentArenaLayerBundle:Default:index.html.twig', [
            'entities' => $entities
        ]);
    }
}

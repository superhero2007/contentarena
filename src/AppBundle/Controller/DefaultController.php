<?php

namespace AppBundle\Controller;


use AppBundle\Entity\Content;
use AppBundle\Entity\ContentFilter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\ContentService;
use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $user = $this->getUser();


       if ($user == null ){
           return $this->redirectToRoute('fos_user_security_login', array(
           ));

       }
        return $this->redirectToRoute('marketplace', array(
        ));
    }

}
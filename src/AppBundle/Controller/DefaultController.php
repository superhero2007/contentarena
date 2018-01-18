<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

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
        return $this->redirectToRoute('dashboard', array(
        ));
    }

    /**
     * @Route("/genus/feed", name="genus_feed")
     */
    public function feedAction(Request $request)
    {
    }

    /**
     * @Route("/dashboard", name="dashboard")
     */
    public function dashboardAction(Request $request)
    {

        $user = $this->getUser();
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'user' => $user
        ]);

    }

    /**
     * @Route("/buy", name="buy")
     */
    public function buyAction(Request $request)
    {

        $user = $this->getUser();
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'user' => $user
        ]);

    }

    /**
     * @Route("/sell", name="sell")
     */
    public function sellAction(Request $request)
    {

        $user = $this->getUser();

        $packages = $this->getDoctrine()
            ->getRepository('AppBundle:RightsPackage')
            ->findAll();

        $rights = $this->getDoctrine()
            ->getRepository('AppBundle:Rights')
            ->findAll();

        // replace this example code with whatever you need
        return $this->render('sell/sell.html.twig', [
            'user' => $user,
            'packages' => $packages,
            'rights' => $rights,
            'price' => 4
        ]);

    }

    /**
     * @Route("/profile", name="profile")
     */
    public function profileAction(Request $request)
    {

        $user = $this->getUser();
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'user' => $user
        ]);

    }


}

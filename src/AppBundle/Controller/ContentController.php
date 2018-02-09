<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class ContentController extends Controller
{

  /**
   * @Route("/content/{id}", name="show")
   */
  public function show(Request $request)
  {

      $user = $this->getUser();
      $content = "Temporal string to show template.";
      #$content = $this->getDoctrine()->getRepository('AppBundle:Content')->findOneBy(['id' => $request->get("id")]);

      return $this->render('content/content.html.twig', [
          'user' => $user,
          'content' => $content
      ]);

  }

}
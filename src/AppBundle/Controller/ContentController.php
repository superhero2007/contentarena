<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class ContentController extends Controller
{

  /**
   * @Route("/content/{customId}", name="showContent")
   */
  public function show(Request $request)
  {

      $user = $this->getUser();
      $content = $this->getDoctrine()->getRepository('AppBundle:Content')->findOneBy(['customId' => $request->get("customId")]);
      $company = [];
      if($content){
          $company = $content->getCompany();
      }

      return $this->render('content/content.html.twig', [
          'user' => $user,
          'content' => $content,
          'company' => $company
      ]);

  }

}
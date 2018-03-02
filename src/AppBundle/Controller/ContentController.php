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
          //$country = $company->getCountry();
          //var_dump($country); exit;
      }

      $rightsPackages = $content->getRights();
      $distributionPackages = $content->getDistributionPackages();

      foreach ( $rightsPackages as &$rightsPackage ){
          $rightsPackage["rights"] = $this->getRightsContent($rightsPackage["rights"]);
      }

      foreach ( $distributionPackages as &$distributionPackage ){
          $distributionPackage["production"] = $this->getRightsContent($distributionPackage["production"]);
      }

      $content->setRights($rightsPackages);
      $content->setDistributionPackages($distributionPackages);

      return $this->render('content/content.html.twig', [
          'user' => $user,
          'content' => $content,
          'company' => $company
      ]);

  }

  private function getRightsContent( $rights ){

      $rightsRepository = $this->getDoctrine()->getRepository('AppBundle:Rights');
      $rightsItemsRepository = $this->getDoctrine()->getRepository('AppBundle:RightsItemContent');


      foreach ( $rights as &$right ){
          if ( isset ( $right["id"]) ){
              $dbRight = $rightsRepository->findOneBy(['id' => $right["id"]]);
          }

          if ( $right ) {

              $right["name"] = $dbRight->getName();

              foreach ($right["rightItems"] as &$rightItem) {

                  if (isset ($rightItem["id"])) {
                      $dbRightItem = $rightsItemsRepository->findOneBy(['id' => $rightItem["id"]]);
                      $rightItem["name"] = $dbRightItem->getFormContent();
                  }
              }
          }
      }

      return $rights;
  }

}
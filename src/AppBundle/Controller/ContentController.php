<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Bid;
use AppBundle\Entity\Content;
use AppBundle\Entity\Country;
use AppBundle\Service\BidService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;


class ContentController extends Controller
{

    /**
     * @Route("/content/place_bid", name="content_place_bid")
     */
    public function getContentData(Request $request, BidService $bidService)
    {
        if (!empty(json_decode($request->request->get('content-data')))) {

            $user = $this->getUser();

            /**
             * saving data into Bid entity by using bidService class
             */

            if($bidService->saveBidsData($request,$user)){
                $this->addFlash('success', 'Data was saved successfully');
            }

            return $this->redirectToRoute('showContent', ['customId' => $request->request->get('custom-id')]);
        }
        return $this->redirectToRoute('showContent', ['customId' => $request->request->get('custom-id')]);

    }

    /**
     * @Route("/content/{customId}", name="showContent")
     */
    public function show(Request $request)
    {

        $user = $this->getUser();
        $content = $this->getDoctrine()->getRepository('AppBundle:Content')->findOneBy(['customId' => $request->get("customId")]);
        $buyPackages = $this->getDoctrine()->getRepository('AppBundle:Content')->getBuyPackages($content->getSalesPackages());
        $countries = $this->getDoctrine()
            ->getRepository('AppBundle:Content')
            ->getTerritoryInfo($request->get("customId"));

        $rightsPackages = $content->getRights();
        $distributionPackages = $content->getDistributionPackages();

        foreach ($rightsPackages as &$rightsPackage) {
            $rightsPackage["rights"] = $this->getRightsContent($rightsPackage["rights"]);
        }

        foreach ($distributionPackages as &$distributionPackage) {
            $distributionPackage["production"] = $this->getRightsContent($distributionPackage["production"]);
            $distributionPackage["technical"] = $this->getRightsContent($distributionPackage["technical"]);
        }

        $content->setRights($rightsPackages);
        $content->setDistributionPackages($distributionPackages);
        return $this->render('content/content.html.twig', [
            'user' => $user,
            'content' => $content,
            'countries' => $countries,
            'custom_id' => $request->get("customId"),
            'buyPackages' => $buyPackages,
        ]);
    }

    private function getRightsContent($rights)
    {

        $rightsRepository = $this->getDoctrine()->getRepository('AppBundle:Rights');
        $rightsItemsRepository = $this->getDoctrine()->getRepository('AppBundle:RightsItemContent');


        foreach ($rights as &$right) {
            if (isset ($right["id"])) {
                $dbRight = $rightsRepository->findOneBy(['id' => $right["id"]]);
            }

            if ($dbRight) {

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
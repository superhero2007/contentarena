<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Bid;
use AppBundle\Entity\Content;
use AppBundle\Entity\Country;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;


class ContentController extends Controller
{

    /**
     * @Route("/content/get_data", name="get_content_data")
     */
    public function getContentData(Request $request)
    {
        if (!empty(json_decode($request->request->get('content-data')))) {

            $manager = $this->getDoctrine()->getManager();

            $data = json_decode($request->get('content-data'));
            $company = $this->getUser()->getCompany();
            $user = $this->getUser();
            foreach ($data as $item) {

                if (!is_array($item->country)) {
                    $country = [$item->country];
                } else {
                    $country = $item->country;
                }

                $content = $this->getDoctrine()->getRepository('AppBundle:Content')->find($request->request->get('content-id'));
                $currensy = $this->getDoctrine()->getRepository('AppBundle:Currency')->find($item->currency);
                $type = $this->getDoctrine()->getRepository('AppBundle:BidType')->find($item->pricingMethod);
                $countries = $this->getDoctrine()->getRepository('AppBundle:Country')->findCountriesByIds($country);
                $bid = new Bid();
                if ($item->pricingMethod == 3) {
                    $status = $this->getDoctrine()->getRepository('AppBundle:BidStatus')->find(2);
                } else {
                    $status = $this->getDoctrine()->getRepository('AppBundle:BidStatus')->find(1);
                }
                $bid->setType($type);
                $bid->setStatus($status);
                $bid->setContent($content);
                $bid->setCurrency($currensy);
                $bid->setBuyerUser($user);
                $bid->setAmount($item->amount);
                $bid->setCompany($company);
                $bid->setCountries($countries);
                $manager->persist($bid);
            }

            $manager->flush();
            $this->addFlash('success', 'Tha data was saved successfully');
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
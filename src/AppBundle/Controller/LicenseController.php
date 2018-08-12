<?php

namespace AppBundle\Controller;


use AppBundle\Entity\Bid;
use AppBundle\Entity\Content;
use AppBundle\Entity\ContentFilter;
use AppBundle\Entity\RightsPackage;
use AppBundle\Entity\SalesPackage;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\GeneratorBundle\Model\Bundle;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\ContentService;
use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;

class LicenseController extends Controller
{

    private $RIGHT_DEFINITIONS;

    public function __construct()
    {
        $this->RIGHT_DEFINITIONS = array(
            "RUNS" => array("NA","PR", "DT", "HL"),
            "EXPLOITATION_WINDOW" => array("NA","PR", "DT", "HL")
        );

    }

    /**
     * @param Content $content
     * @return array
     */
    private function getRightDefinitions($content){
        $rightDefinitions = array();
        $definitions = $this->RIGHT_DEFINITIONS;

        /* @var RightsPackage $right*/
        foreach ($content->getRightsPackage() as $right){

            foreach ($definitions as $definition => $labels){
                if (in_array($right->getShortLabel(),$labels)) $rightDefinitions[] = $definition;
            }
        }

        return $rightDefinitions;
    }

    /**
     * @param Content $content
     * @return array
     */
    private function getExclusiveRights($content){
        $exclusiveRights = array();
        $selected = $content->getSelectedRightsBySuperRight();

        /* @var RightsPackage $right*/
        foreach ($content->getRightsPackage() as $right){

            if ( $selected[$right->getId()]['exclusive'] ) $exclusiveRights[] = $right->getName();
        }

        return $exclusiveRights;
    }

    /**
     * @Route("/license/bundle/{id}/{listingId}", name="contractBundle")
     */
    public function contractBundle(Request $request, ContentService $contentService){

        $user = $this->getUser();
        $time = new \DateTime();
        /* @var SalesPackage $bundle  */
        $bundle = $this->getDoctrine()
            ->getRepository('AppBundle:SalesPackage')
            ->findOneBy(['id' => $request->get("id")]);
        $content = $this->getDoctrine()
            ->getRepository('AppBundle:Content')
            ->findOneBy(['customId' => $request->get("listingId")]);
        $bundle->getSalesMethod()->getName();
        $rightDefinitions = $this->getRightDefinitions($content);
        $exclusiveRights = $this->getExclusiveRights($content);

        $viewElements = array(
            'user' => $user,
            'bundle' => $bundle,
            'content' => $content,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );
        //return $this->render('contract/layout.html.twig', $viewElements);

        $html = $this->renderView('contract/layout.html.twig', $viewElements);
        return new PdfResponse(
            $this->get('knp_snappy.pdf')->getOutputFromHtml($html),
            'License_Agreement_' . $content->getCompany()->getDisplayName(). '_' . $time->getTimestamp()  . '.pdf'
        );
    }

    /**
     * @Route("/license/bid/{customId}", name="contractBid")
     */
    public function contractBid(Request $request, ContentService $contentService){
        /* @var SalesPackage $bundle  */
        $user = $this->getUser();
        $time = new \DateTime();
        $bid = $this->getDoctrine()
            ->getRepository('AppBundle:Bid')
            ->findOneBy(['customId' => $request->get("customId")]);
        $content = $bid->getContent();
        $rightDefinitions = $this->getRightDefinitions($content);
        $exclusiveRights = $this->getExclusiveRights($content);
        $bid->getSalesPackage()->getCurrency()->getName();
        $bundle = $bid->getSalesPackage();
        $bundle->getSalesMethod()->getName();

        $viewElements = array(
            'user' => $user,
            'bid' => $bid,
            'bundle' => $bundle,
            'content' => $content,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );
        //return $this->render('contract/layout.html.twig', $viewElements);

        $html = $this->renderView('contract/layout.html.twig', $viewElements);
        return new PdfResponse(
            $this->get('knp_snappy.pdf')->getOutputFromHtml($html),
            'License_Agreement_' . $content->getCompany()->getDisplayName(). '_' . $time->getTimestamp()  . '.pdf'
        );
    }

    /**
     * @Route("/license/custom/{customId}/{bundleId}", name="customLicense")
     */
    public function customLicense(Request $request, ContentService $contentService){
        /* @var SalesPackage $bundle  */
        $user = $this->getUser();
        $time = new \DateTime();

        $content = $this->getDoctrine()
            ->getRepository('AppBundle:Content')
            ->findOneBy(['customId' => $request->get("customId")]);
        $bundle = $this->getDoctrine()
            ->getRepository('AppBundle:SalesPackage')
            ->findOneBy(['id' => $request->get("bundleId")]);
        $rightDefinitions = $this->getRightDefinitions($content);
        $exclusiveRights = $this->getExclusiveRights($content);
        $bidStatus = $this->getDoctrine()->getRepository('AppBundle:BidStatus')->findOneBy(array("name"=>"PENDING"));

        $bid = new Bid();

        $bid->setTotalFee($request->query->get("bid"));
        $bid->setSalesPackage($bundle);
        $bid->setBuyerUser($user);
        $bid->setCreatedAt($time);
        $bid->setStatus($bidStatus);

        $viewElements = array(
            'user' => $user,
            'bid' => $bid,
            'bundle' => $bundle,
            'content' => $content,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );
        //return $this->render('contract/layout.html.twig', $viewElements);

        $html = $this->renderView('contract/layout.html.twig', $viewElements);
        return new PdfResponse(
            $this->get('knp_snappy.pdf')->getOutputFromHtml($html),
            'License_Agreement_' . $content->getCompany()->getDisplayName(). '_' . $time->getTimestamp()  . '.pdf'
        );
    }


    /**
     * @Route("/license/preview/{customId}", name="contractPreview")
     */
    public function contractPreviewAction(Request $request){

        $user = $this->getUser();
        $time = new \DateTime();
        $content = $this->getDoctrine()
            ->getRepository('AppBundle:Content')
            ->findOneBy(['customId' => $request->get("customId")]);

        $rightDefinitions = $this->getRightDefinitions($content);
        $exclusiveRights = $this->getExclusiveRights($content);

        $viewElements = array(
            'user' => $user,
            'content' => $content,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );
        //return $this->render('contract/layout.html.twig', $viewElements);

        $html = $this->renderView('contract/layout.html.twig', $viewElements);
        return new PdfResponse(
            $this->get('knp_snappy.pdf')->getOutputFromHtml($html),
            'License_Agreement_' . $content->getCompany()->getDisplayName(). '_' . $time->getTimestamp()  . '.pdf'
        );
    }

}
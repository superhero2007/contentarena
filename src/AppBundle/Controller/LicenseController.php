<?php

namespace AppBundle\Controller;


use AppBundle\Entity\Content;
use AppBundle\Entity\ContentFilter;
use AppBundle\Entity\RightsPackage;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
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
     * @Route("/license/bid/{customId}", name="contractBid")
     */
    public function contractBid(Request $request, ContentService $contentService){

        $user = $this->getUser();
        $time = new \DateTime();
        $bid = $this->getDoctrine()
            ->getRepository('AppBundle:Bid')
            ->findOneBy(['customId' => $request->get("customId")]);
        $content = $bid->getContent();
        $rightDefinitions = $this->getRightDefinitions($content);
        $exclusiveRights = $this->getExclusiveRights($content);
        $bid->getSalesPackage()->getCurrency()->getName();

        $viewElements = array(
            'user' => $user,
            'bid' => $bid,
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
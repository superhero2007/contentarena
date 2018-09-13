<?php

namespace AppBundle\Controller;


use AppBundle\Entity\Bid;
use AppBundle\Entity\Company;
use AppBundle\Entity\Content;
use AppBundle\Entity\ContentFilter;
use AppBundle\Entity\LicenseAgreement;
use AppBundle\Entity\RightsPackage;
use AppBundle\Entity\SalesPackage;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\GeneratorBundle\Model\Bundle;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\ContentService;
use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;
use PDFMerger;

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
    public function getRightDefinitions($content){
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
    public function getExclusiveRights($content){
        $exclusiveRights = array();
        $selected = $content->getSelectedRightsBySuperRight();

        /* @var RightsPackage $right*/
        foreach ($content->getRightsPackage() as $right){

            if ( $selected[$right->getId()]['exclusive'] ) $exclusiveRights[] = $right->getName();
        }

        return $exclusiveRights;
    }

    /**
     * @param $content
     * @param $viewElements
     * @param bool $download
     * @param bool $save
     * @throws \exception
     */
    private function mergeAndSave($content, $viewElements, $download = true, $save = true){

        // Create an instance of PDFMerger
        /* @var Bid $bid*/
        $pdf = new PDFMerger();
        $bid = (isset($viewElements["bid"]) ) ? $viewElements["bid"] : null;

        if ( $bid != null ){
            $license = $this->getDoctrine()
                ->getRepository('AppBundle:LicenseAgreement')
                ->findOneBy([
                    'bid' => $bid,
                    'company' => $bid->getBuyerUser()->getCompany(),
                ]);
        }

        if ( isset($license) && $license != null && $license->getUpdatedAt() != null && $license->getUpdatedAt() > $bid->getUpdatedAt() ){
            $pdf->addPDF($license->getFile(), 'all');
            if ($download) $pdf->merge('download', "License Agreement.pdf");
            return;
        }

        /* @var Content $content  */
        $time = new \DateTime();
        $html = $this->renderView('contract/layout.html.twig', $viewElements);

        $fileName = 'License_Agreement_' . $content->getCompany()->getDisplayName(). '_' . $time->getTimestamp()  . '.pdf';

        // Use $this->get('knp_snappy.pdf')->getOutputFromHtml($html) to generate

        $this->get('knp_snappy.pdf')->generateFromHtml(
            $html,
            $this->container->getParameter("uploads_main_folder") . "/" . $fileName
        );

        // Add 2 PDFs to the final PDF
        $pdf->addPDF($this->container->getParameter("uploads_main_folder") . "/" . $fileName, 'all');

        if ( $content->getAnnex() != null ){
            foreach ($content->getAnnex() as $annex){
                $pdf->addPDF($this->container->getParameter("main_folder") . "/" . $annex->file, 'all');
            }
        }

        $pathForTheMergedPdf = $this->container->getParameter("uploads_main_folder") . "/" . $fileName;
        $pdf->merge('file', $pathForTheMergedPdf);

        if ( $bid != null && $save ){

            if ( $license == null  ){
                $license = new LicenseAgreement();
                $license->setCompany($bid->getBuyerUser()->getCompany());
                $license->setBid($bid);
            }

            $license->setUpdatedAt($time);
            $license->setFile($pathForTheMergedPdf);
            $this->getDoctrine()->getManager()->persist($license);
            $this->getDoctrine()->getManager()->flush();
        }

        if ($download) $pdf->merge('download', "License Agreement.pdf");
    }

    /**
     * @Route("/license/bundle/{id}/{listingId}", name="contractBundle")
     * @throws \exception
     */
    public function contractBundle(Request $request, ContentService $contentService){

        $user = $this->getUser();
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
            'watermark' => true,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );
        //return $this->render('contract/layout.html.twig', $viewElements);

        $this->mergeAndSave($content,$viewElements);

        //return new PdfResponse(
        //    $this->get('knp_snappy.pdf')->getOutputFromHtml($html),
        //    'License_Agreement_' . $content->getCompany()->getDisplayName(). '_' . $time->getTimestamp()  . '.pdf'
        //);
    }

    /**
     * @Route("/license/bid/{customId}", name="contractBid")
     * @param Request $request
     * @param ContentService $contentService
     * @throws \exception
     */
    public function contractBid(Request $request, ContentService $contentService){
        /* @var SalesPackage $bundle  */
        /* @var Content $content  */

        $user = $this->getUser();
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
            'watermark' => $bid->getStatus()->getName() != 'APPROVED',
            'bundle' => $bundle,
            'content' => $content,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );
        //return $this->render('contract/layout.html.twig', $viewElements);
        $this->mergeAndSave($content,$viewElements);

    }

    /**
     * @Route("/license/custom/{customId}/{bundleId}", name="customLicense")
     * @throws \exception
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

        $viewElements = array(
            'user' => $user,
            'watermark' => true,
            'bundle' => $bundle,
            'content' => $content,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );

        if ($bundle->getSalesMethod()->getName() != "FIXED"){
            $bid = new Bid();

            $fee = $request->query->get("bid");
            $fee = $fee == "undefined" ? 0 : $fee;

            $bid->setTotalFee($fee);
            $bid->setSalesPackage($bundle);

            $bid->setCreatedAt($time);
            $bid->setStatus($bidStatus);

            if ($request->query->get("company") != null){
                /* @var Company $company */
                $company = $user->getCompany();
                $customCompany = $request->query->get("company");
                if (isset($customCompany['address'])) $company->setAddress($customCompany['address']);
                if (isset($customCompany['legalName'])) $company->setLegalName($customCompany['legalName']);
                if (isset($customCompany['registrationNumber'])) $company->setRegistrationNumber($customCompany['registrationNumber']);
                if (isset($customCompany['vat'])) $company->setVat($customCompany['vat']);
                if (isset($customCompany['city'])) $company->setCity($customCompany['city']);
                if (isset($customCompany['zip'])) $company->setZip($customCompany['zip']);
                if (isset($customCompany['country']) && isset($customCompany['country']['name'])){
                    $country = $this->getDoctrine()->getRepository('AppBundle:Country')
                        ->findOneBy(array('name' => $customCompany['country']['name']));
                    $company->setCountry($country);
                }

                $user->setCompany($company);

            }
            $bid->setBuyerUser($user);

            $viewElements['bid'] = $bid;
        }

        //return $this->render('contract/layout.html.twig', $viewElements);

        $this->mergeAndSave($content,$viewElements, true, false);
    }


    /**
     * @Route("/license/preview/{customId}", name="contractPreview")
     * @throws \exception
     */
    public function contractPreviewAction(Request $request){

        $user = $this->getUser();
        $content = $this->getDoctrine()
            ->getRepository('AppBundle:Content')
            ->findOneBy(['customId' => $request->get("customId")]);

        $rightDefinitions = $this->getRightDefinitions($content);
        $exclusiveRights = $this->getExclusiveRights($content);

        $viewElements = array(
            'user' => $user,
            'content' => $content,
            'watermark' => true,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );
        //return $this->render('contract/layout.html.twig', $viewElements);
        $this->mergeAndSave($content,$viewElements);
    }

}
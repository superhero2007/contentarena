<?php

namespace AppBundle\Controller;

use AppBundle\Entity\CompanySnapshot;
use AppBundle\Service\BundleService;
use AppBundle\Service\FileUploader;
use AppBundle\Service\TermsService;
use AppBundle\Service\TestService;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
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
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

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
     * @return BinaryFileResponse|void
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
            if ($download) $pdf->merge('browser', "License Agreement.pdf");
            return;
        }

        /* @var Content $content  */
        $time = new \DateTime();
        $html = $this->renderView('contract/layout.html.twig', $viewElements);
        //$htmlGeneralTerms = $this->renderView('contract/la-general-terms-base.html.twig', $viewElements);

        $fileName = 'License_Agreement_' . $content->getCompany()->getDisplayName(). '_' . $time->getTimestamp()  . '.pdf';

        // Use $this->get('knp_snappy.pdf')->getOutputFromHtml($html) to generate

        $this->get('knp_snappy.pdf')->generateFromHtml(
            $html,
            $this->container->getParameter("uploads_main_folder") . "/" . $fileName
        );

        /*$this->get('knp_snappy.pdf')->generateFromHtml(
            $htmlGeneralTerms,
            $this->container->getParameter("uploads_main_folder") . "/general-terms.pdf",
            array(),
            true
        );*/

        $pdf->addPDF($this->container->getParameter("uploads_main_folder") . "/" . $fileName, 'all');

        if ( $content->getAnnex() != null ){
            foreach ($content->getAnnex() as $annex){
                $pdf->addPDF($this->container->getParameter("main_folder") . "/" . $annex->file, 'all');
            }
        }

        //$pdf->addPDF($this->container->getParameter("uploads_main_folder") . "/general-terms.pdf", 'all');

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

        if ($download){
            $response = new BinaryFileResponse($pathForTheMergedPdf);
            $response->headers->set('Content-Type', 'application/pdf');

            $response->setContentDisposition(
                ResponseHeaderBag::DISPOSITION_INLINE,
                $fileName
            );
            return $response;
        }
    }

    /**
     * @Route("/license/bundle/{id}/{listingId}", name="contractBundle")
     * @throws \exception
     */
    public function contractBundle(Request $request, ContentService $contentService, TermsService $termsService){

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
        $terms = $termsService->getCompanyTerms($content->getCompany());
        $definitions = $termsService->getCompanyDefinitions($content->getCompany());
        $viewElements = array(
            'user' => $user,
            'bundle' => $bundle,
            'terms' => $terms,
            'definitions' => $definitions,
            'content' => $content,
            'watermark' => true,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );
        //return $this->render('contract/layout.html.twig', $viewElements);

        return $this->mergeAndSave($content,$viewElements);

        //return new PdfResponse(
        //    $this->get('knp_snappy.pdf')->getOutputFromHtml($html),
        //    'License_Agreement_' . $content->getCompany()->getDisplayName(). '_' . $time->getTimestamp()  . '.pdf'
        //);
    }

    /**
     * @Route("/license/bid/{customId}", name="contractBid")
     * @param Request $request
     * @param ContentService $contentService
     * @return BinaryFileResponse
     * @throws \exception
     */
    public function contractBid(Request $request, ContentService $contentService, TermsService $termsService){
        /* @var SalesPackage $bundle  */
        /* @var Content $content  */

        $user = $this->getUser();
        $bid = $this->getDoctrine()
            ->getRepository('AppBundle:Bid')
            ->findOneBy(['customId' => $request->get("customId")]);
        $bids = [];
        $content = $bid->getStatus()->getName() != 'APPROVED' ? $bid->getContent() : $bid->getSoldListing();
        $rightDefinitions = $this->getRightDefinitions($content);
        $exclusiveRights = $this->getExclusiveRights($content);
        $bid->getSalesPackage()->getCurrency()->getName();
        if ( $bid->getMultiple() !== null ){
            $bids = $this->getDoctrine()
                ->getRepository('AppBundle:Bid')
                ->findBy(['multiple' => $bid->getMultiple()]);
        }
        $bundle = $bid->getSalesPackage();
        $bundle->getSalesMethod()->getName();
        $terms = $termsService->getBidTerms($bid, $content->getCompany());
        $definitions = $termsService->getBidDefinitions($bid, $content->getCompany());
        $viewElements = array(
            'user' => $user,
            'bid' => $bid,
            'watermark' => $bid->getStatus()->getName() != 'APPROVED',
            'bundle' => $bundle,
            'content' => $content,
            'bids' => $bids,
            'terms' => $terms,
            'definitions' => $definitions,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );
        //return $this->render('contract/layout.html.twig', $viewElements);
        return $this->mergeAndSave($content,$viewElements);

    }

    /**
     * @Route("/license/custom/{customId}/{bundleId}", name="customLicense")
     * @throws \exception
     */
    public function customLicense(Request $request, ContentService $contentService, TermsService $termsService){
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
        $terms = $termsService->getCompanyTerms($content->getCompany());
        $definitions = $termsService->getCompanyDefinitions($content->getCompany());
        $viewElements = array(
            'user' => $user,
            'watermark' => true,
            'bundle' => $bundle,
            'terms' => $terms,
            'definitions' => $definitions,
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
                if (isset($customCompany['address2'])) $company->setAddress2($customCompany['address2']);
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
                $buyerCompanySnapshot = new CompanySnapshot($company);
                $bid->setBuyerCompanySnapshot($buyerCompanySnapshot);
            }
            $bid->setBuyerUser($user);


            $viewElements['bid'] = $bid;
        }

        //return $this->render('contract/layout.html.twig', $viewElements);

        return $this->mergeAndSave($content,$viewElements, true, false);
    }

    /**
     * @Route("/license/custom-bids/{customId}", name="customBidsLicense")
     * @param Request $request
     * @param TermsService $termsService
     * @param BundleService $bundleService
     * @return BinaryFileResponse
     * @throws \exception
     */
    public function customBidsLicense(
        Request $request,
        TermsService $termsService,
        BundleService $bundleService
    ){
        /* @var SalesPackage $bundle  */
        $user = $this->getUser();
        $time = new \DateTime();
        $multiple =  $request->get("multiple");

        $content = $this->getDoctrine()
            ->getRepository('AppBundle:Content')
            ->findOneBy(['customId' => $request->get("customId")]);

        $bundles = $this->getDoctrine()->getRepository('AppBundle:SalesPackage')->findBy(["id"=>$request->get("bundleIds")]);

        if ($multiple){
            $refBundle = $bundles[0];
            $bundle = new SalesPackage();
            $bundle->setSold(false);
            $bundle->setCustom(true);
            $bundle->setName($refBundle->getName());
            $bundle->setCurrency($refBundle->getCurrency());
            $bundle->setSalesMethod($this->getDoctrine()->getRepository('AppBundle:BidType')->findOneBy(array('name' => "BIDDING")));
            $bundle->setBundleMethod("SELL_AS_BUNDLE");
            $bundle->setTerritoriesMethod("SELECTED_TERRITORIES");
            $bundle->setFee($refBundle->getFee());
            $bundle->setInstallments($bundleService->getInstallments($bundles));
            $countries = array();

            foreach ( $bundles as $refBundle){
                foreach( $refBundle->getTerritories() as $territory ){
                    $countries[] = $territory;
                }
            }
            $bundle->setTerritories($countries);
            $bundles = array($bundle);
        }


        $rightDefinitions = $this->getRightDefinitions($content);
        $exclusiveRights = $this->getExclusiveRights($content);
        $bidStatus = $this->getDoctrine()->getRepository('AppBundle:BidStatus')->findOneBy(array("name"=>"PENDING"));
        $terms = $termsService->getCompanyTerms($content->getCompany());
        $definitions = $termsService->getCompanyDefinitions($content->getCompany());
        $viewElements = array(
            'user' => $user,
            'watermark' => true,
            'bundles' => $bundles,
            'bundle' => ($bundle) ? $bundle : $bundles[0],
            'terms' => $terms,
            'definitions' => $definitions,
            'content' => $content,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );

        foreach ($bundles as $bundle){
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
                    if (isset($customCompany['address2'])) $company->setAddress2($customCompany['address2']);
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
                    $buyerCompanySnapshot = new CompanySnapshot($company);
                    $bid->setBuyerCompanySnapshot($buyerCompanySnapshot);
                }
                $bid->setBuyerUser($user);

                $viewElements['bid'] = $bid;
            }
        }



        //return $this->render('contract/layout.html.twig', $viewElements);

        return $this->mergeAndSave($content,$viewElements, true, false);
    }


    /**
     * @Route("/license/preview/{customId}", name="contractPreview")
     * @throws \exception
     */
    public function contractPreviewAction(Request $request, TermsService $termsService){

        $user = $this->getUser();
        $content = $this->getDoctrine()
            ->getRepository('AppBundle:Content')
            ->findOneBy(['customId' => $request->get("customId")]);

        $rightDefinitions = $this->getRightDefinitions($content);
        $exclusiveRights = $this->getExclusiveRights($content);
        $terms = $termsService->getCompanyTerms($content->getCompany());
        $definitions = $termsService->getCompanyDefinitions($content->getCompany());
        $viewElements = array(
            'user' => $user,
            'content' => $content,
            'watermark' => true,
            'terms' => $terms,
            'definitions' => $definitions,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );
        //return $this->render('contract/layout.html.twig', $viewElements);
        return $this->mergeAndSave($content,$viewElements);
    }

    /**
     * @Route("/license/test/{customId}", name="contractTest")
     * @param Request $request
     * @param TermsService $termsService
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function contractTestAction(Request $request, TermsService $termsService){

        $user = $this->getUser();
        $content = $this->getDoctrine()
            ->getRepository('AppBundle:Content')
            ->findOneBy(['customId' => $request->get("customId")]);
        $terms = $termsService->getCompanyTerms($content->getCompany());
        $definitions = $termsService->getCompanyDefinitions($content->getCompany());
        $rightDefinitions = $this->getRightDefinitions($content);
        $exclusiveRights = $this->getExclusiveRights($content);

        $viewElements = array(
            'user' => $user,
            'content' => $content,
            'terms' => $terms,
            'definitions' => $definitions,
            'watermark' => true,
            'rightDefinitions' => $rightDefinitions,
            'exclusiveRights' => $exclusiveRights,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );
        return $this->render('contract/layout.html.twig', $viewElements);
    }

    /**
     * @Route("/license/test-general", name="contractTestGeneral")
     * @throws \exception
     */
    public function contractTestGeneralAction(Request $request){

        $user = $this->getUser();

        $viewElements = array(
            'user' => $user,
            'watermark' => true,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );

        return $this->render('contract/la-general-terms-base.html.twig', $viewElements);
    }

    /**
     * @Route("/license/test-general-source", name="contractTestGeneralSource")
     * @throws \exception
     */
    public function contractTestGeneralSourceAction(Request $request){

        $user = $this->getUser();

        $terms = $this->getDoctrine()
            ->getRepository('AppBundle:SourceLicenseTerm')
            ->findAll();

        $viewElements = array(
            'user' => $user,
            'terms' => $terms,
            'watermark' => true,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );

        return $this->render('contract/la-general-terms-source.html.twig', $viewElements);
    }

    //TODO: deprecate uploadGeneralTerms
    /**
     * @Route("/license/upload", name="uploadGeneralTerms")
     * @throws \exception
     */
    public function uploadGeneralTerms(Request $request, FileUploader $fileUploader){

        $user = $this->getUser();
        $data = null;
        $message = "";
        $fileName = "la-general-terms.html.twig";

        $defaultData = array();
        $form = $this->createFormBuilder($defaultData)
            ->add('terms', FileType::class)
            ->add('send', SubmitType::class)
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // data is an array with "name", "email", and "message" keys
            $data = $form->getData();
            $file = $data['terms'];
            $extension = $file->guessExtension();

            if ( $extension == "html"){
                $file->move($this->container->getParameter("upload_general_terms_folder") , $fileName);
                $message = "General Terms updated successfully!";
            } else {
                $message = "Please upload a valid html file";
            }
        }

        $viewElements = array(
            'user' => $user,
            'form' => $form->createView(),
            'message' => $message,
            'data' => $data,
            'watermark' => true,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );




        return $this->render('contract/upload.form.html.twig', $viewElements);
    }

}

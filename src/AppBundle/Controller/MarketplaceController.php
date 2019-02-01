<?php

namespace AppBundle\Controller;

use AppBundle\Entity\CompanySnapshot;
use AppBundle\Helper\ControllerHelper;
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

class MarketplaceController extends Controller
{

    use ControllerHelper;

    const MARKETPLACE_PAGE_SIZE = 2;

    public function __construct()
    {

    }

    /**
     * @Route("/api/marketplace/listings", name="marketplaceListings")
     */
    public function marketplaceListings(Request $request, ContentService $contentService)
    {
        $contents = $contentService->getContent($request);
        $page = $request->get("page");
        $paginate = $this->get('knp_paginator');
        $contents = $paginate->paginate($contents,$request->query->getInt('page',$page),$this::MARKETPLACE_PAGE_SIZE);
        return $this->getSerializedResponse($contents->getItems(), array('listing') );


    }

}
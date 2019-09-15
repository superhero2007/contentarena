<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Bid;
use AppBundle\Entity\Content;
use AppBundle\Entity\SalesPackage;
use AppBundle\Error\ListingErrors;
use AppBundle\Service\BidService;
use AppBundle\Service\ContentService;
use AppBundle\Service\EmailService;
use AppBundle\Service\WatchlistService;
use PDFMerger;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;


class ContentController extends Controller
{


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

        $watchlisted = $this->getDoctrine()->getRepository('AppBundle:Watchlist')->findOneBy(['content'=>$content, 'company'=>$user->getCompany()]);
        return $this->render('content/content.html.twig', [
            'user' => $user,
            'content' => $content,
            'countries' => $countries,
            'custom_id' => $request->get("customId"),
            'buyPackages' => $buyPackages,
            'watchlisted' => $watchlisted,
        ]);
    }

    /**
     * @Route("/content/save/file", name="saveTmpFile")
     */
    public function saveTmpFile(Request $request, ContentService $contentService  )
    {
        $uploadedFile = $request->files->get("file");
        $testPdf = false;
        $success = true;

        if ( $uploadedFile != null && $uploadedFile->guessExtension() == "pdf" ) {
            $testPdf = true;
        }

        $file = $contentService->saveTmpFiles($request);

        if ($testPdf){
            $success = $this->testPdf($file);
        }

        return new JsonResponse(array(
            "success" => $success,
            "file" => $file,
            "name" => $request->files->get("file")->getClientOriginalName(),
            "size" => $request->files->get("file")->getClientSize()
        ));
    }

    /**
     * @Route("/content/save/attachment", name="saveAttachmentFile")
     */
    public function saveAttachmentFile(Request $request, ContentService $contentService  )
    {
        $success = true;
        $file = $contentService->saveTmpFiles($request);

        return new JsonResponse(array(
            "success" => $success,
            "file" => $file,
            'name' => $request->files->get("file")->getClientOriginalName()
        ));
    }

    /**
     * @Route("/content/remove/attachment", name="removeAttachmentFile")
     */
    public function removeAttachmentFile(Request $request, ContentService $contentService  )
    {
        $success = $contentService->removeTmpFiles($request);

        return new JsonResponse(array(
            "success" => $success,
        ));
    }

    private function testPdf( $file ){

        $pdf = new PDFMerger();

        // Add 2 PDFs to the final PDF
        try {
            $pdf->addPDF($file, 'all');
        } catch (\exception $e) {
            return false;
        }

        $pathForTheMergedPdf = $this->container->getParameter("uploads_tmp_folder") . "/test.pdf";
        try {
            $pdf->merge('file', $pathForTheMergedPdf);
        } catch (\exception $e) {
            return false;
        }

        return true;
    }

    /**
     * @Route("/content/draft/save", name="saveContentAsDraft")
     * @param Request $request
     * @param ContentService $contentService
     * @param EmailService $emailService
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function saveContentAsDraft(Request $request, ContentService $contentService , EmailService $emailService )
    {
        $user = $this->getUser();
        $content = $contentService->saveContentAsDraft($user, $request);

        if ( $request->get("id") == null ) $emailService->internalUserListingDraft($user, $content);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($content->getSalesPackages(), 'json',SerializationContext::create()->setGroups(array('listing', 'details')));

        return new JsonResponse(array(
            "success"=>true,
            "contentId"=> $content->getId(),
            "customId" => $content->getCustomId(),
            "status" => $content->getStatus()->getName(),
            "sports" => ($content->getSports() != null) ? $serializer->toArray($content->getSports()) : array(),
            "salesPackages" => ($content->getSalesPackages() != null) ? $serializer->toArray($content->getSalesPackages()) : array()
        ));
    }

}

<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Bid;
use AppBundle\Entity\Content;
use AppBundle\Entity\SalesPackage;
use AppBundle\Error\ListingErrors;
use AppBundle\Service\BidService;
use AppBundle\Service\ContentService;
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
            'name' => $request->files->get("file")->getClientOriginalName()
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
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function saveContentAsDraft(Request $request, ContentService $contentService  )
    {
        $user = $this->getUser();
        $content = $contentService->saveContentAsDraft($user, $request);



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

    /**
     * @Route("/listing/details", name="listingDetails")
     */
    public function listingDetails(Request $request, WatchlistService $watchlistService, BidService $bidService){

        $customId = $request->get('customId');
        $user = $this->getUser();
        $company = $user->getCompany();
        //Take Repositories
        $repository = $this->getDoctrine()->getRepository("AppBundle:Content");
        $statusesForbiddenForNonMembers = array(
            'DRAFT',
            'AUTO_INACTIVE',
            'PENDING',
            'REJECTED',
            'ARCHIVED',
            'SOLD_COPY'
        );

        $statusesAllowedForBuyers = array(
            'SOLD_OUT',
            "EXPIRED",
            'INACTIVE',
        );

        /* @var Content $content */
        $content = $repository->findOneBy(array("customId"=>$customId));

        if (!$content) {
            $response = new JsonResponse(
                $data = array(
                    "success" => false,
                    "code" => ListingErrors::LISTING_NOT_EXISTS,
                    "message" => ListingErrors::getErrorMessage(ListingErrors::LISTING_NOT_EXISTS),
                ),
                $status = Response::HTTP_NOT_FOUND
            );
            return $response;
        }

        $isMember = $content->userIsCompanyMember($user);
        $content->setUserCanNotBuy($isMember);
        $content->setUserCanEdit($isMember);

        $bids = $bidService->getAllBidsByContentAndUser($content, $company);
        $bundlesWithActivity = array();
        $closedDeals = array();
        if ($bids != null){
            foreach ($bids as $bid){
                /* @var Bid $bid*/
                $bundlesWithActivity[] = $bid->getSalesPackage()->getId();

                if ( $bid->getStatus()->getName() == "APPROVED") $closedDeals[] = $bid->getSalesPackage()->getId();

            }
            $content->setBundlesWithActivity($bundlesWithActivity);
            $content->setBundlesSold($closedDeals);
        }


        if (!$isMember
            && (in_array($content->getStatus()->getName(),$statusesForbiddenForNonMembers)
                || (in_array($content->getStatus()->getName(),$statusesAllowedForBuyers) && count($closedDeals) == 0) )) {
            $response = new JsonResponse(
                $data = array(
                    "success" => false,
                    "code" => ListingErrors::LISTING_NOT_OWNER,
                    "message" => ListingErrors::getErrorMessage(ListingErrors::LISTING_NOT_OWNER),
                ),
                $status = Response::HTTP_NOT_FOUND
            );
            return $response;
        }

        foreach ($content->getSalesPackages() as $salesBundle){
            /**
             * @var SalesPackage $salesBundle
             * @var Bid $bid
             */
            $bid = $this->getDoctrine()->getRepository("AppBundle:Bid")->findOneBy(array(
                "salesPackage"=> $salesBundle,
                "buyerCompany" => $user->getCompany()
            ));

            if ( $bid != null){
                $salesBundle->setFee($bid->getAmount());
            }

        }

        /**
         * Strategy to keep camel case on property names
         */
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $watchlist = $watchlistService->isInWatchlist( $user, $content );
        $content->setWatchlist($watchlist);
        $data = $serializer->serialize($content, 'json',SerializationContext::create()->setGroups(array('listing', 'details')));
        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }



}
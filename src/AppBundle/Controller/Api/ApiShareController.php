<?php

namespace AppBundle\Controller\Api;

use AppBundle\Error\GenericErrors;
use AppBundle\Error\ListingErrors;
use AppBundle\Helper\ControllerHelper;
use AppBundle\Service\ContentService;
use AppBundle\Service\EmailService;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiShareController extends Controller
{

    use ControllerHelper;

    /**
     * @Route("/api/share/listing", name="shareListing")
     * @param Request $request
     * @param ContentService $contentService
     * @param EmailService $emailService
     * @Rest\RequestParam(name="recipients", nullable=false,strict=true)
     * @Rest\RequestParam(name="listingId", nullable=false,strict=true)
     * @return JsonResponse
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function shareListing(Request $request, ContentService $contentService, EmailService $emailService  )
    {
        $user = $this->getUser();
        $container = $this->container;
        $message = $request->get("message");
        $listingId = $request->get("listingId");
        $recipients = $request->get("recipients");
        $hostUrl = $container->getParameter("carena_host_url");
        $listing = $contentService->findByCustomId($listingId);
        $params = array(
            "hostUrl" => $hostUrl,
            "user" => $user,
            "listing" => $listing,
            "message" => $message
        );

        if ( $listing == null ) {
            return $this->getErrorResponse(ListingErrors::class, ListingErrors::LISTING_NOT_EXISTS);
        }

        if ( !is_array($recipients) ) {
            return $this->getErrorResponse(GenericErrors::class, GenericErrors::GENERIC_PARAMETER_SHOULD_BE_ARRAY);
        }

        foreach ( $recipients as $recipient){
            if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) continue;
            $emailService->shareListing($params, $recipient);
        }

        $response = array("success" => true );

        return $this->getSerializedResponse($response, array());
    }

}
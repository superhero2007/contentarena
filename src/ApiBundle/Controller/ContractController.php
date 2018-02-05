<?php

namespace ApiBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Intl\Intl;
use FOS\RestBundle\Controller\FOSRestController;
use AppBundle\Service\ContentService;
use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;

class ContractController extends FOSRestController
{
    use \ApiBundle\Helper\ControllerHelper;

    public function postPreviewAction(Request $request)
    {

        $data = json_decode($request->get("content"));
        $contentService = $this->container->get('AppBundle\Service\ContentService');

        if ( isset( $data->id ) ) {
            $content = $this->getDoctrine()
                ->getRepository('AppBundle:Content')
                ->findOneBy(['id' => $data->id]);
        } else {
            $user = $this->getUser();
            $content = $contentService->createContent($user, $data);
        }

        $view = $this->view($content);
        return $this->handleView($view);
    }

}

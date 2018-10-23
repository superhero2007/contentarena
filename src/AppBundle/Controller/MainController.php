<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Content;
use AppBundle\Entity\User;
use AppBundle\Service\UserService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\ContentService;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;

class MainController extends BaseController
{

    /**
     * @Route("/generalterms", name="generalTerms")
     */
    public function generalTermsAction(Request $request, UserService $userService)
    {
        $user = $this->getUser();
        $file = $this->container->getParameter('upload_general_terms_page')."/general-terms.html";
        $file_exists = file_exists($file);

        if ( $user == null ){
            $activationCode = $request->get("activationCode");
            $user = $userService->getUserByActivationCode($activationCode);
        }

        return $this->render('statics/general-terms-base.html.twig', [
            'user'              => $user,
            'hostUrl'           => $this->container->getParameter('local_host'),
            'externalApiUrl'    => $this->container->getParameter('external_api_url'),
            'file_exists'       => $file_exists,
            'file'              => $file
        ]);

    }



}
<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\User;
use AppBundle\Helper\ControllerHelper;
use AppBundle\Service\TermsService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiTermsAndDefinitionsController extends Controller
{

    use ControllerHelper;

    public function __construct()
    {

    }

    /**
     * @Route("/api/terms/company", name="getCompanyTerms")
     * @param Request $request
     * @param TermsService $termsService
     * @return Response
     */
    public function getCompanyTerms(Request $request, TermsService $termsService)
    {
        /* @var User $user*/
        $user = $this->getUser();
        $terms = $termsService->getCompanyTerms($user->getCompany());
        return $this->getSerializedResponse($terms,array('terms') );

    }

    /**
     * @Route("/api/terms/restore", name="restoreCompanyTerms")
     * @param Request $request
     * @param TermsService $termsService
     * @return Response
     */
    public function restoreCompanyTerms(Request $request, TermsService $termsService)
    {

        /* @var User $user*/
        $user = $this->getUser();
        $termsService->restoreTermItems($user->getCompany());
        $terms = $termsService->getCompanyTerms($user->getCompany());
        return $this->getSerializedResponse($terms,array('terms') );
    }

    /**
     * @Route("/api/terms/update", name="updateCompanyTerm")
     */
    public function updateCompanyTerm(Request $request, TermsService $termsService)
    {

        /* @var User $user*/
        $user = $this->getUser();
        $term = $request->get('term');
        if ($term != null ) $term = $termsService->updateTermItem($user->getCompany(), $term );
        return $this->getSerializedResponse( array("success"=>true, "term" => $term), array('terms'));

    }

    /**
     * @Route("/api/definitions/company", name="getCompanyDefinitions")
     */
    public function getCompanyDefinitions(Request $request, TermsService $termsService)
    {

        /* @var User $user*/
        $user = $this->getUser();
        $terms = $termsService->getCompanyDefinitions($user->getCompany());
        return $this->getSerializedResponse($terms,array('terms') );

    }

    /**
     * @Route("/api/definitions/restore", name="restoreDefinitions")
     */
    public function restoreDefinitions(Request $request, TermsService $termsService)
    {

        /* @var User $user*/
        $user = $this->getUser();
        $termsService->restoreDefinitions($user->getCompany());
        $terms = $termsService->getCompanyDefinitions($user->getCompany());
        return $this->getSerializedResponse($terms,array('terms') );
    }

    /**
     * @Route("/api/definitions/update", name="updateCompanyDefinition")
     * @param Request $request
     * @param TermsService $termsService
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function updateCompanyDefinition(Request $request, TermsService $termsService)
    {
        /* @var User $user*/
        $user = $this->getUser();
        $definition = $request->get('definition');
        if ($definition != null ) $definition = $termsService->updateDefinition($user->getCompany(),$definition );

        return $this->getSerializedResponse( array("success"=>true, "definition" => $definition), array('terms'));

    }

    /**
     * @Route("/api/definitions/remove", name="removeCompanyDefinition")
     * @param Request $request
     * @param TermsService $termsService
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function removeCompanyDefinition(Request $request, TermsService $termsService)
    {
        /* @var User $user*/
        $user = $this->getUser();
        $definition = $request->get('definition');
        if ($definition != null ) $termsService->removeDefinition($user->getCompany(),$definition );

        return $this->getSerializedResponse( array("success"=>true) );

    }

}
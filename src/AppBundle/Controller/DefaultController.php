<?php

namespace AppBundle\Controller;


use AppBundle\Entity\Content;
use AppBundle\Service\FileUploader;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\ContentService;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $user = $this->getUser();


       if ($user == null ){
           return $this->redirectToRoute('fos_user_security_login', array(
           ));

       }
        return $this->redirectToRoute('dashboard', array(
        ));
    }

    /**
     * @Route("/genus/feed", name="genus_feed")
     */
    public function feedAction(Request $request)
    {
    }

    /**
     * @Route("/dashboard", name="dashboard")
     */
    public function dashboardAction(Request $request)
    {

        $user = $this->getUser();
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'user' => $user
        ]);

    }

    /**
     * @Route("/buy", name="buy")
     */
    public function buyAction(Request $request)
    {

        $user = $this->getUser();
        $contents = array(['Temporal string to show templates.']);
        return $this->render('buy/buy.html.twig', [
            'user' => $user,
            'contents' => $contents
        ]);

    }

    /**
     * @Route("/buy/{id}", name="showContent")
     */
    public function showContent(Request $request)
    {

        $user = $this->getUser();
        $content = "Temporal string to show template.";
        return $this->render('buy/content.html.twig', [
            'user' => $user,
            'content' => $content
        ]);

    }

    /**
     * @Route("/sell/published", name="sellPublished")
     */
    public function sellPublishedAction(Request $request, ContentService $contentService, FileUploader $fileUploader)
    {
        $user = $this->getUser();

        $contentService->createContent($user, $request);

        // replace this example code with whatever you need
        return $this->render('sell/contentUploaded.html.twig', [
            'user' => $user,
        ]);

    }

    /**
     * @Route("/test/sell/published", name="testSellPublished")
     */
    public function testSellPublishedAction(){

        $user = $this->getUser();

        return $this->render('sell/contentUploaded.html.twig', [
            'user' => $user,
        ]);

    }

    /**
     * @Route("/contract/preview", name="contractPreview")
     */
    public function contractPreviewAction(Request $request){

        $user = $this->getUser();
        $time = new \DateTime();
        $content = $this->getDoctrine()
            ->getRepository('AppBundle:Content')
            ->findOneBy(['id' => $request->get("id")]);


        $html = $this->renderView('contract/layout.html.twig', [
            'user' => $user,
            'content' => $content
        ]);

        return new PdfResponse(
            $this->get('knp_snappy.pdf')->getOutputFromHtml($html),
            'License_Agreement_' . $content->getCompany()->getDisplayName(). '_' . $time->getTimestamp()  . '.pdf'
        );
    }

    /**
     * @Route("/sell", name="sell")
     */
    public function sellAction(Request $request)
    {

        $user = $this->getUser();

        $packages = $this->getDoctrine()
            ->getRepository('AppBundle:RightsPackage')
            ->findAll();

        $rights = $this->getDoctrine()
            ->getRepository('AppBundle:Rights')
            ->findAll();

        // replace this example code with whatever you need
        return $this->render('sell/sell.html.twig', [
            'user' => $user,
            'packages' => $packages,
            'rights' => $rights,
            'price' => 4
        ]);

    }

    /**
     * @Route("/profile", name="profile")
     */
    public function profileAction(Request $request)
    {

        $user = $this->getUser();
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'user' => $user
        ]);

    }




}


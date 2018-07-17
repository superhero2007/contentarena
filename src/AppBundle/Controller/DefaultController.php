<?php

namespace AppBundle\Controller;


use AppBundle\Entity\Content;
use AppBundle\Entity\ContentFilter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
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
        return $this->redirectToRoute('marketplace', array(
        ));
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


        $html = $this->render('contract/layout.html.twig', [
            'user' => $user,
            'content' => $content
        ]);

        return $html;

        /*$html = $this->renderView('contract/layout.html.twig', [
            'user' => $user,
            'content' => $content
        ]);
        return new PdfResponse(
            $this->get('knp_snappy.pdf')->getOutputFromHtml($html),
            'License_Agreement_' . $content->getCompany()->getDisplayName(). '_' . $time->getTimestamp()  . '.pdf'
        );*/
    }

}
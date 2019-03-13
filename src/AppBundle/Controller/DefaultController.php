<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Content;
use AppBundle\Exception\BrowserNotSupportedException;
use AppBundle\Exception\BrowserUnsupportedException;
use AppBundle\Service\UserService;
use FOS\UserBundle\Model\User;
use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;
use Gettext\Translations;

class DefaultController extends BaseController
{

    /**
     * @Route("/", name="home")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function homeAction(Request $request)
    {

        $user = $this->getUser();
        $logger = $this->get('logger');
        $logger->info("USER ENTERED HOME" , array(
            "User" => isset($user) ? $user->getEmail() : "Anonymous",
            "Route" => $request->getRequestUri()
        ));

        if ( $user != null ) return $this->redirect("/marketplace");

        return $this->render('@App/home.html.twig', $this->getInternalParams($request));

    }

    /**
     * @Route("/unsupported", name="unsupported")
     */
    public function unsupportedAction()
    {
        return $this->render('browser.unsupported.html.twig');
    }

    /**
     * @Route("/public/listing/{customId}", name="publicListing")
     * @param Request $request
     * @param UserService $userService
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function publicListing(Request $request, UserService $userService)
    {
        $user = $this->getUser();
        $email = $request->get("email");
        $customId = $request->get("customId");

        if ( $email == null || $customId == null ) throw $this->createNotFoundException("That page doesn't exists, sorry!");

        if ( $user != null ){
            return $this->redirect("/listing/". $customId);
        }

        return $this->redirect("/listing-preview?listingId=".$customId);
    }

    /**
     * @Route(
     *     "/{reactRouting}",
     *     requirements={"reactRouting"="properties|createproperty|manageproperties|terms|listing-preview|register|registration|reset-password|landing|login|marketplace|watchlist|listing|bids|closeddeals|managelistings|commercialoverview|messages|settings|preferences"},
     *     name="homepage",
     *     defaults={"reactRouting": null}
     *     )
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction( Request $request )
    {
        $user = $this->getUser();
        $logger = $this->get('logger');
        $route = $request->get("reactRouting");
        $logger->info("USER ENTERED " . strtoupper($route), array(
            "User" => isset($user) ? $user->getEmail() : "Anonymous",
            "Route" => $request->getRequestUri()
        ));

        return $this->render('@App/home.html.twig', $this->getInternalParams($request));
    }

    /**
     * @Route(
     *     "/{reactRouting}/{reactParam}",
     *     requirements={"reactRouting"="properties|createproperty|register|reset-password|marketplace|listing|bids|messages|contentlisting|commercialoverview|settings|preferences"},
     *     name="homepageParams", defaults={"reactRouting": null, "reactParam" : null})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexParamsAction(Request $request)
    {
        $user = $this->getUser();
        $logger = $this->get('logger');
        $route = $request->get("reactRouting");

        if ( $route == "register") $logger->info("USER ENTERED WALL", array(
            "User" => isset($user) ? $user->getEmail() : "Anonymous",
            "Route" => $request->getRequestUri()
        ));


        return $this->render('@App/home.html.twig', $this->getInternalParams($request));
    }

    /**
     * @Route(
     *     "/{reactRouting}/{reactParam}/{reactParam2}",
     *     requirements={"reactRouting"="properties|createproperty|register|reset-password|marketplace|listing|contentlisting|commercialoverview"},
     *     name="homepageParams2", defaults={"reactParam2" : null, "reactRouting": null, "reactParam" : null})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexParams2Action(Request $request)
    {
        return $this->render('@App/home.html.twig', $this->getInternalParams($request));
    }

    /**
     * @Route(
     *     "/{reactRouting}/{reactParam}/{reactParam2}/{reactParam3}",
     *     name="homepageParams3",
     *     requirements={"reactRouting"="properties|marketplace|listing|contentlisting|commercialoverview"},
     *     defaults={"reactParam3" : null, "reactParam2" : null, "reactRouting": null, "reactParam" : null})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexParams3Action(Request $request)
    {
        return $this->render('@App/home.html.twig', $this->getInternalParams($request));
    }

    private function getInternalParams(Request $request){
        $user = $this->getUser();
        $isOwner = false;
        $refererEmail = $request->get("email");
        $refererListingId = $request->get("listingId");
        $listingId = $request->get('reactParam');
        $rights = $this->getDoctrine()->getRepository('AppBundle:RightsPackage')->findAll();
        $packages = $this->getDoctrine()
            ->getRepository('AppBundle:RightsPackage')
            ->findAll();

        if ($listingId && $listingId != "new" && $listingId != "1"){
            $content = $this->getDoctrine()->getRepository('AppBundle:Content')->findOneBy(['customId' => $listingId]);
            if ($content != null ){
                $content->setUserCanNotView(!$content->userIsCompanyMember($user));
                $isOwner = $content->userIsCompanyMember($user);
            }

        } else{
            $content = new Content();
            if ($user) $content->setCompany($user->getCompany());
        }

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $config = array(
            "cmsEnabled"        => $this->container->getParameter('cms_enabled'),
            "gaTrackingId"      => $this->container->getParameter('google_analytics_key'),
            "testStageMode"     => $this->container->getParameter('test_stage_mode'),
            "properties"        => array(),
            "editTranslation"   => $user && in_array('ROLE_ADMIN', $this->getUser()->getRoles()),
        );

        return [
            'hostUrl'           => $this->container->getParameter('local_host'),
            'externalApiUrl'    => $this->container->getParameter('external_api_url'),
            'newListing'        => $serializer->serialize($content, 'json', SerializationContext::create()->setGroups(array('home'))),
            'config'            => $this->serialize($config),
            'loggedUser'        => $user,
            'refererEmail'      => $refererEmail,
            'refererListingId'  => $refererListingId,
            'isOwner'           => $isOwner,
            'totalCountries'    => $this->getDoctrine()->getRepository("AppBundle:Country")->countAll(),
            'loggedUserData'    => ($user) ? $serializer->serialize($user, 'json',SerializationContext::create()->setGroups(array('home'))): null,
            'company'           => ($user) ? $serializer->serialize($user->getCompany(), 'json',SerializationContext::create()->setGroups(array('details'))): null,
            'rights'            => $this->serialize($rights),
            'packages'          => $serializer->serialize($packages, 'json',SerializationContext::create()->setGroups(array('common'))),
        ];
    }


    /**
     * @Route("/locales/upload", name="uploadLocales")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function uploadLocales(Request $request){

        /* @var User $user*/
        $user = $this->getUser();

        if ($this->isGranted('ROLE_USER') == false) {
            return $this->render('@App/home.html.twig', $this->getInternalParams($request));
        }

        $message = "";

        $viewElements = array(
            'user' => $user,
            'message' => $message,
        );

        return $this->render('upload.locales.html.twig', $viewElements);
    }


}

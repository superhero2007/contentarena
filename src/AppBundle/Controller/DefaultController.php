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
     */
    public function homeAction(Request $request)
    {
        return $this->redirect("/marketplace");
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
        } else {

            $user = $userService->getUserByEmail($email);

            if ( $user != null ) {
                return $this->redirect("/login?email=". $email."&listingId=".$customId);
            } else {
                return $this->redirect("/registration?email=". $email);
            }
        }
    }

    /**
     * @Route(
     *     "/{reactRouting}",
     *     requirements={"reactRouting"="terms|register|registration|reset-password|landing|login|marketplace|watchlist|listing|bids|closeddeals|managelistings|commercialoverview|messages|settings|preferences"},
     *     name="homepage", defaults={"reactRouting": null})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction( Request $request )
    {

        $user = $this->getUser();
        $logger = $this->get('logger');
        $logger->error("USER ENTERED SITE", array( $user, $request->get("reactRouting")) );
        return $this->render('@App/home.html.twig', $this->getInternalParams($request));
    }

    /**
     * @Route(
     *     "/{reactRouting}/{reactParam}",
     *     requirements={"reactRouting"="register|reset-password|marketplace|listing|bids|messages|contentlisting|commercialoverview|settings|preferences"},
     *     name="homepageParams", defaults={"reactRouting": null, "reactParam" : null})
     */
    public function indexParamsAction(Request $request)
    {
        return $this->render('@App/home.html.twig', $this->getInternalParams($request));
    }

    /**
     * @Route(
     *     "/{reactRouting}/{reactParam}/{reactParam2}",
     *     requirements={"reactRouting"="register|reset-password|marketplace|listing|contentlisting|commercialoverview"},
     *     name="homepageParams2", defaults={"reactParam2" : null, "reactRouting": null, "reactParam" : null})
     */
    public function indexParams2Action(Request $request)
    {
        return $this->render('@App/home.html.twig', $this->getInternalParams($request));
    }

    /**
     * @Route(
     *     "/{reactRouting}/{reactParam}/{reactParam2}/{reactParam3}",
     *     name="homepageParams3",
     *     requirements={"reactRouting"="marketplace|listing|contentlisting|commercialoverview"},
     *     defaults={"reactParam3" : null, "reactParam2" : null, "reactRouting": null, "reactParam" : null})
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

        return [
            'hostUrl'           => $this->container->getParameter('local_host'),
            'googleAnalyticsKey'=> $this->container->getParameter('google_analytics_key'),
            'testStageMode'     => $this->container->getParameter('test_stage_mode'),
            'externalApiUrl'    => $this->container->getParameter('external_api_url'),
            'newListing'        => $serializer->serialize($content, 'json', SerializationContext::create()->setGroups(array('home'))),
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
            return $this->render('@App/home.html.twig', $this->getInternalParams());
        }

        $data = null;
        $message = "";
        $defaultData = array();
        $localesPath = $this->container->getParameter("upload_locales");
        $translationsPath = $this->container->getParameter("upload_translations");

        $form = $this->createFormBuilder($defaultData)
            ->add('po', FileType::class, array('label' => 'Upload en.po file'))
            ->add('send', SubmitType::class)
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            /* @var UploadedFile $file*/
            $data = $form->getData();
            $file = $data['po'];
            $fileName = $file->getClientOriginalName();

            if ( $fileName == "en.po"){
                $file->move($localesPath, $fileName);
                $message = "Localization updated successfully!";

                //import from a .po file:
                $translations = Translations::fromPoFile($localesPath . "/". $fileName);

                //Export to a js file
                $prefix = "{\"en\":";
                $test = $translations->toJsonDictionaryString();
                $suffix = ",\"options\": {\"plural_rule\": \"n != 1\",\"plural_number\": \"2\"}}";
                $fs = new Filesystem();

                try {
                    $fs->dumpFile($translationsPath . '/translations.json', $prefix.$test.$suffix);
                }
                catch(IOException $e) {
                }

            } else {
                $message = "Please upload a valid en.po file";
            }
        }

        $viewElements = array(
            'user' => $user,
            'form' => $form->createView(),
            'message' => $message,
            'data' => $data,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );

        return $this->render('upload.locales.html.twig', $viewElements);
    }

    /**
     * @Route("/locales/devfile", name="getLocalesDevFile")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getLocalesDevFile()
    {

        $localesPath = $this->container->getParameter("dev_locales");
        // load the file from the filesystem
        $file = new File($localesPath. '/en.po');

        return $this->file($file);
    }

    /**
     * @Route("/locales/file", name="getLocalesFile")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getLocalesFile()
    {

        $localesPath = $this->container->getParameter("upload_locales");
        // load the file from the filesystem
        $file = new File($localesPath. '/en.po');

        return $this->file($file);
    }

    /**
     * @Route("/locales/template", name="getLocalesTemplates")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getLocalesTemplates()
    {

        $localesPath = $this->container->getParameter("dev_locales");
        // load the file from the filesystem
        $file = new File($localesPath. '/template.pot');

        return $this->file($file);
    }

}

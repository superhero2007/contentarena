<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Content;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;

class DefaultController extends BaseController
{

    /**
     * @Route("/", name="home")
     */
    public function homeAction(Request $request)
    {
        return $this->render('@App/home.html.twig', $this->getInternalParams());
    }

    /**
     * @Route(
     *     "/{reactRouting}",
     *     requirements={"reactRouting"="test|marketplace|watchlist|listing|bids|closeddeals|managelistings|commercialactivity|messages|settings"},
     *     name="homepage", defaults={"reactRouting": null})
     */
    public function indexAction(Request $request)
    {
        return $this->render('@App/home.html.twig', $this->getInternalParams());
    }

    /**
     * @Route(
     *     "/{reactRouting}/{reactParam}",
     *     requirements={"reactRouting"="marketplace|listing|bids|messages|contentlisting|commercialactivity|settings"},
     *     name="homepageParams", defaults={"reactRouting": null, "reactParam" : null})
     */
    public function indexParamsAction(Request $request)
    {
        return $this->render('@App/home.html.twig', $this->getInternalParams($request->get('reactParam')));
    }

    /**
     * @Route(
     *     "/{reactRouting}/{reactParam}/{reactParam2}",
     *     requirements={"reactRouting"="marketplace|listing|contentlisting|commercialactivity"},
     *     name="homepageParams2", defaults={"reactParam2" : null, "reactRouting": null, "reactParam" : null})
     */
    public function indexParams2Action(Request $request)
    {
        return $this->render('@App/home.html.twig', $this->getInternalParams($request->get('reactParam')));
    }

    /**
     * @Route(
     *     "/{reactRouting}/{reactParam}/{reactParam2}/{reactParam3}",
     *     name="homepageParams3",
     *     requirements={"reactRouting"="marketplace|listing|contentlisting|commercialactivity"},
     *     defaults={"reactParam3" : null, "reactParam2" : null, "reactRouting": null, "reactParam" : null})
     */
    public function indexParams3Action(Request $request)
    {
        return $this->render('@App/home.html.twig', $this->getInternalParams());
    }

    private function getInternalParams($listingId = null){
        $user = $this->getUser();
        $rights = $this->getDoctrine()->getRepository('AppBundle:RightsPackage')->findAll();
        $packages = $this->getDoctrine()
            ->getRepository('AppBundle:RightsPackage')
            ->findAll();

        if ($listingId && $listingId != "new" && $listingId != "1"){
            $content = $this->getDoctrine()->getRepository('AppBundle:Content')->findOneBy(['customId' => $listingId]);
        } else{
            $content = new Content();
            if ($user) $content->setCompany($user->getCompany());
        }

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();

        return [
            'hostUrl'           => $this->container->getParameter('local_host'),
            'externalApiUrl'    => $this->container->getParameter('external_api_url'),
            'newListing'    =>  $serializer->serialize($content, 'json'),
            'loggedUser'    => $user,
            'company'       => ($user) ? $serializer->serialize($user->getCompany(), 'json',SerializationContext::create()->enableMaxDepthChecks()): null,
            'rights'        => $this->serialize($rights),
            'packages' => $serializer->serialize($packages, 'json',SerializationContext::create()->setGroups(array('common'))),
        ];
    }

}
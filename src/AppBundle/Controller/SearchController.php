<?php
namespace AppBundle\Controller;

use AppBundle\Entity\RightsPackage;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\RightsGroup;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;

class SearchController extends Controller
{
    /**
     * @Route("/search/tournament", name="searchTournament")
     */
    public function sellNewListingSearch(Request $request){

        //Take request content
        $content = $request->get('content');

        //Make it readable for sql query for like request
        $content = "%".$content."%";

        //Take Repositories
        $tournamentRepo     = $this->getDoctrine()->getRepository("AppBundle:Tournament");

        //Get results
        $tournaments     = $tournamentRepo    ->getSearchResultsByName($content);



        return new JsonResponse($tournaments);
    }

    /**
     * @Route("/search/sports/active", name="searchSportsActive")
     */
    public function searchSportsActive(Request $request){

        //Take Repositories
        $tournamentRepo     = $this->getDoctrine()->getRepository("AppBundle:Content");

        //Get results
        $tournaments     = $tournamentRepo    ->getActiveSports();

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($tournaments, 'json',SerializationContext::create()->setGroups(array('listing')));

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/search/countries/all", name="searchAllCountries")
     */
    public function searchAllCountries(Request $request){

        //Take Repositories
        $sportCategoryRepository = $this->getDoctrine()->getRepository("AppBundle:Country");

        //Get results
        $countries = $sportCategoryRepository->getAll();

        return new JsonResponse($countries);
    }

    /**
     * @Route("/search/countries/full", name="getCountries")
     */
    public function getCountries(Request $request){

        //Take Repositories
        $sportCategoryRepository = $this->getDoctrine()->getRepository("AppBundle:Country");

        //Get results
        $countries = $sportCategoryRepository->getAll();

        return new JsonResponse($countries);
    }

    /**
     * @Route("/search/territories", name="getTerritories")
     */
    public function getTerritories(Request $request){

        //Take Repositories
        $sportCategoryRepository = $this->getDoctrine()->getRepository("AppBundle:Territory");

        //Get results
        $countries = $sportCategoryRepository->getAll();

        return new JsonResponse($countries);
    }

    /**
     * @Route("/search/rights", name="searchRights")
     */
    public function searchRights(Request $request){

        $rightsPackage = $request->get('rightsPackage');
        $groupName = $request->get('group');

        //Take Repositories
        $repository = $this->getDoctrine()->getRepository("AppBundle:Rights");
        $groupRepository = $this->getDoctrine()->getRepository(RightsGroup::class);
        $group = $groupRepository->findBy(array("name"=>$groupName));

            //Get results
        $rights = $repository->getByPackagesAndGroup($rightsPackage, $group);

        /**
         * Strategy to keep camel case on property names
         */
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($rights, 'json',SerializationContext::create()->setGroups(array('common')));

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/search/rights-package", name="searchRightsPackage")
     */
    public function getRightsPackage(Request $request){

        //Take Repositories
        $rightsPackageRepository = $this->getDoctrine()->getRepository("AppBundle:RightsPackage");

        //Get results
        $packageRepositories = $rightsPackageRepository->getAll();

        return new JsonResponse($packageRepositories);
    }
}
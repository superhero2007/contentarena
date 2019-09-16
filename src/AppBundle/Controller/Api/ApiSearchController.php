<?php
namespace AppBundle\Controller\Api;

use AppBundle\Controller\BaseController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\RightsGroup;
use JMS\Serializer\SerializerBuilder;
use AppBundle\Service\CountryRegionService;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;

class ApiSearchController extends BaseController
{
    /**
     * @Route("/api/search/tournament", name="searchTournament")
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
     * @Route("/api/search/sports/active", name="searchSportsActive")
     */
    public function searchSportsActive(Request $request){

        //Take Repositories
        $tournamentRepo = $this->getDoctrine()->getRepository("AppBundle:Content");

        //Get results
        $tournaments = $tournamentRepo->getActiveSports();

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($tournaments, 'json',SerializationContext::create()->setGroups(array('listing')));

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/search/sports/all", name="getAllSports")
     */
    public function getAllSports(Request $request){

        //Take Repositories
        $repo = $this->getDoctrine()->getRepository("AppBundle:Sport");
        $flags = $request->get("flags");

        //Get results
        $tournaments = $repo->findAllByFlag($flags);

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($tournaments, 'json',SerializationContext::create());

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/search/sports/groups", name="getSportsGroups")
     */
    public function getSportsGroups(Request $request){

        //Take Repositories
        $repo = $this->getDoctrine()->getRepository("AppBundle:SportsGroup");

        //Get results
        $sports = $repo->getNonEmptySportsGroups();

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($sports, 'json',SerializationContext::create());

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/search/countries/all", name="searchAllCountries")
     */
    public function searchAllCountries(Request $request){

        //Take Repositories
        $sportCategoryRepository = $this->getDoctrine()->getRepository("AppBundle:Country");

        //Get results
        $countries = $sportCategoryRepository->getAll();



        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $data = $serializer->serialize($countries, 'json',SerializationContext::create()->setGroups(array('countryList')));

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        //->setSharedMaxAge(3600);

        return $response;

    }

    /**
     * @Route("/api/search/countries/full", name="getCountries")
     */
    public function getCountries(Request $request){

        //Take Repositories
        $sportCategoryRepository = $this->getDoctrine()->getRepository("AppBundle:Country");

        //Get results
        $countries = $sportCategoryRepository->getAll();

        return new JsonResponse($countries);
    }

    /**
     * @Route("/api/search/territories", name="getTerritories")
     * @return JsonResponse
     */
    public function getTerritories(){

        $sportCategoryRepository = $this->getDoctrine()->getRepository("AppBundle:Territory");
        $countryRepository = $this->getDoctrine()->getRepository("AppBundle:Country");

        $territories = $sportCategoryRepository->getAll();
        foreach ($territories as &$territory)
        {
            $territory['total'] = $countryRepository->countTerritoriesByTerritoryId($territory['id']);
        }

        $response = new JsonResponse($territories);

        $response->setSharedMaxAge(3600);

        return $response;
    }

    /**
     * @Route("/api/search/regions", name="getRegions")
     * @param CountryRegionService $countryRegionService
     * @return JsonResponse
     */
    public function getRegions(CountryRegionService $countryRegionService ){

        $sportCategoryRepository = $this->getDoctrine()->getRepository("AppBundle:Region");
        $regions = $sportCategoryRepository->getAll();

        foreach ($regions as &$region)
        {
            $region['total'] = $countryRegionService->countRegionsById($region['id']);
        }

        return new JsonResponse($regions);
    }

    /**
     * @Route("/api/search/rights", name="searchRights")
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
     * @Route("/api/search/rights-package", name="searchRightsPackage")
     */
    public function getRightsPackage(Request $request){

        //Take Repositories
        $rightsPackageRepository = $this->getDoctrine()->getRepository("AppBundle:RightsPackage");

        //Get results
        $packageRepositories = $rightsPackageRepository->getAll();

        return new JsonResponse($packageRepositories);
    }
}

<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

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
}
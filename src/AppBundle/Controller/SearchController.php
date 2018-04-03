<?php
/**
 * Created by PhpStorm.
 * User: Name
 * Date: 4/2/2018
 * Time: 2:06 PM
 */

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SearchController extends Controller
{
    /**
     * @Route("/sell-new-listing-search", name="sellNewListingSearch")
     */
    public function sellNewListingSearch(Request $request){

        //Take request content
        $content = $request->get('content');

        //Make it readable for sql query for like request
        $content = "%".$content."%";

        //Take Repositories
        $seasonRepo         = $this->getDoctrine()->getRepository("AppBundle:Season");
        $sportRepo          = $this->getDoctrine()->getRepository("AppBundle:Sport");
        $sportCategoryRepo  = $this->getDoctrine()->getRepository("AppBundle:SportCategory");
        $tournamentRepo     = $this->getDoctrine()->getRepository("AppBundle:Tournament");

        //Get results
        $seasons         = $seasonRepo        ->getSearchResultsByName($content);
        $sports          = $sportRepo         ->getSearchResultsByName($content);
        $sportCategories = $sportCategoryRepo ->getSearchResultsByName($content);
        $tournaments     = $tournamentRepo    ->getSearchResultsByName($content);


        //Create array with parameters
        $parameters = array(
            'seasons'         => $seasons,
            'sports'          => $sports,
            'sportCategories' => $sportCategories,
            'tournaments'     => $tournaments,
        );

        return new JsonResponse($parameters);
    }
}
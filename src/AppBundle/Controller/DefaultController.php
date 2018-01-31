<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Content;
use AppBundle\Entity\Season;
use AppBundle\Entity\Tournament;
use AppBundle\Entity\User;
use AppBundle\Entity\Sport;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

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
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'user' => $user
        ]);

    }

    /**
     * @Route("/sell/published", name="sellPublished")
     */
    public function sellPublishedAction(Request $request)
    {

        $content = new Content();
        $user = $this->getUser();
        $company = $user->getCompany();
        $data = json_decode($request->get("json"));
        $em = $this->getDoctrine()->getEntityManager();

        $content->setEventType($data->eventType);
        $content->setCompany($company);


        /**
         * Set sport
         * Create element in DB if it doesn't exist.
         */
        $sport = $this->getDoctrine()
            ->getRepository('AppBundle:Sport')
            ->findOneBy(array( 'externalId'=> $data->sport->externalId));

        if ( !$sport ){
            $sport = new Sport();
            $sport->setExternalId($data->sport->externalId);
            $sport->setName($data->sport->value);
            $em->persist($sport);
            $em->flush();
        }

        $content->setSport($sport);

        $tournament = $this->getDoctrine()
            ->getRepository('AppBundle:Tournament')
            ->findOneBy(array( 'externalId'=> $data->tournament->externalId));

        if ( !$tournament ){
            $tournament = new Tournament();
            $tournament->setExternalId($data->tournament->externalId);
            $tournament->setName($data->tournament->value);
            $em->persist($tournament);
            $em->flush();
        }

        $content->setTournament($tournament);

        $season = $this->getDoctrine()
            ->getRepository('AppBundle:Season')
            ->findOneBy(array( 'externalId'=> $data->season->externalId));

        if ( !$season ){
            $season = new Season();
            $season->setExternalId($data->season->externalId);
            $season->setName($data->season->value);
            $em->persist($season);
            $em->flush();
        }

        $content->setSeason($season);

        if ( isset($data->rightItems) ){

            $rightItems = array();

            foreach ( $data->rightItems as $rightItem ){

                if ( !isset($rightItem->id) ) continue;

                $item = $this->getDoctrine()
                    ->getRepository('AppBundle:RightsItemContent')
                    ->findOneBy(array( 'id'=> $rightItem->id));

                $rightItems[] = $item;
            }

            $content->setRightsItems($rightItems);
        }

        if ( isset($data->duration) ) $content->setDuration($data->duration->value);
        if ( isset($data->description) ) $content->setDescription($data->description->value);
        if ( isset($data->fee) && isset($data->fee->amount) ) $content->setFee($data->fee->amount);
        if ( isset($data->year) ) $content->setReleaseYear($data->year->value);
        if ( isset($data->website) ) $content->setWebsite($data->website->value);
        if ( isset($data->salesMethod) ) $content->setSalesMethod($data->salesMethod);
        if ( isset($data->availability) ){
            $content->setAvailability(date_create_from_format('d/m/Y', $data->availability->value));
        }

        //var_dump($data->sport);

        $em->persist($content);
        $em->flush();

        // replace this example code with whatever you need
        return $this->render('sell/contentUploaded.html.twig', [
            'user' => $user,
        ]);

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

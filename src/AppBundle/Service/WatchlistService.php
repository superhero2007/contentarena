<?php
/**
 * Created by Petros
 */

namespace AppBundle\Service;


use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Watchlist;
use Symfony\Component\Validator\Constraints\DateTime;

class WatchlistService
{

    private $em;

    public function __construct(EntityManager $entityManager){
        $this->em = $entityManager;
    }

    public function newOrRemove($user, $content){

        $watchlist = $this->em->getRepository('AppBundle:Watchlist')->findOneBy(['content'=>$content, 'user'=>$user]);

        if(!$watchlist){
            $watchlist = new Watchlist();
            $watchlist->setContent($content);
            $watchlist->setUser($user);

            $this->em->persist($watchlist);
            $this->em->flush();

            return 1;
        }else{
            $this->em->remove($watchlist);
            $this->em->flush();

            return 0;
        }
    }

    public function isInWatchlist($user, $content){
        $watchlist = $this->em->getRepository('AppBundle:Watchlist')->findOneBy(['content'=>$content, 'user'=>$user]);
        return !!$watchlist;
    }

}
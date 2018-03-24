<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 23-Mar-18
 * Time: 10:44
 */

namespace AppBundle\Repository;


class ContentFilterRepository extends \Doctrine\ORM\EntityRepository
{

    public function saveNewFilter($contentFilter,$results,$name,$userId){
        $em = $this->getEntityManager();
        $contentFilter->setName($name);
        $contentFilter->setFilterContent($results);
        $contentFilter->userId($userId);
        $em->persist($contentFilter);
        $em->flush();
    }

}
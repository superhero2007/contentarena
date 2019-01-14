<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

use AppBundle\Entity\Company;
use AppBundle\Entity\ContentFilter;
use AppBundle\Entity\ListingStatus;
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\SportCategory;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Doctrine\RandomIdGenerator;
use AppBundle\Entity\User;
use AppBundle\Entity\Content;
use AppBundle\Entity\Season;
use AppBundle\Entity\Tournament;
use AppBundle\Entity\Sport;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


class TermsService
{

    private $em;

    private $idGenerator;

    private $fileUploader;

    protected $fosUserManager;

    public function __construct(EntityManager $entityManager, RandomIdGenerator $idGenerator, FileUploader $fileUploader, \FOS\UserBundle\Doctrine\UserManager $fosUserManager) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
        $this->fosUserManager = $fosUserManager;
    }

    public function getSourceTerms()
    {
        $terms = $this->em
            ->getRepository('AppBundle:SourceLicenseTerm')
            ->findAll();

        $termItemsRepo = $this->em->getRepository('AppBundle:SourceLicenseTermItem');

        foreach ( $terms as $term){
            $items = $termItemsRepo->findBy(array('term' => $term));
            $term->setItems($items);
        }

        return $terms;
    }

    public function getUserByActivationCode( $activationCode )
    {
        if( $activationCode == null ) return null;

        $user = $this->em
            ->getRepository('AppBundle:User')
            ->findOneBy(array('confirmationToken' => $activationCode));

        return $user;
    }

    public function updateUserProfile($user, $profile){

        if ( isset($user) ) {

            $user = $this->em
                ->getRepository('AppBundle:User')
                ->findOneBy(array('id' => $user->getId()));

            if ( isset($profile) ) $user->setProfile($profile);

            $this->em->persist($user);
            $this->em->flush();
            return $user;
        }

        return false;

    }

}
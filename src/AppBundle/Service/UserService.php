<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

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


class UserService
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

    public function updateUser($data){

        if ( isset($data['id']) ) {

            $user = $this->em
                ->getRepository('AppBundle:User')
                ->findOneBy(array('id' => $data['id']));

            if ( isset($data['firstName']) ) $user->setFirstName($data['firstName']);
            if ( isset($data['lastName']) ) $user->setLastName($data['lastName']);
            if ( isset($data['title']) ) $user->setTitle($data['title']);
            if ( isset($data['email']) ) $user->setEmail($data['email']);
            if ( isset($data['phone']) ) $user->setPhone($data['phone']);

            $this->em->persist($user);
            $this->em->flush();
            return $user;
        }

        return false;

    }

    public function updatePassword(Request $request){

        $id = $request->get("id" );

        if ( isset( $id) ) {

            $user = $this->em
                ->getRepository('AppBundle:User')
                ->findOneBy(array('id' => $id));

            $email_exist = $this->fosUserManager->findUserByEmail($user->getEmail());

            if(!$email_exist){
                return false;
            }

            $email_exist->setPlainPassword($request->get("password"));
            $this->fosUserManager->updateUser($email_exist);
            return $user;
        }

        return false;

    }

    public function updateCompany($data, User $user){
        if ( isset($data['id']) ) {

            $company = $this->em
                ->getRepository('AppBundle:Company')
                ->findOneBy(array('id' => $data['id']));

            if ( $user->getCompany()->getId() != $company->getId() ) return false;

            if ( isset($data['vat']) ) $company->setVat($data['vat']);
            if ( isset($data['zip']) ) $company->setZip($data['zip']);
            if ( isset($data['registrationNumber']) ) $company->setRegistrationNumber($data['registrationNumber']);
            if ( isset($data['address']) ) $company->setAddress($data['address']);
            if ( isset($data['city']) ) $company->setCity($data['city']);
            //if ( isset($data['legalName']) ) $company->setLegalName($data['legalName']);
            if ( isset($data['description']) ) $company->setDescription($data['description']);
            if ( isset($data['country']) ) $company->setCountry($this->getCountry($data['country']['name']));

            $this->em->persist($company);
            $this->em->flush();
            return $company;
        }

        return false;

    }

    private function getCountry($country){

        $country =  $this->em
            ->getRepository('AppBundle:Country')
            ->findOneBy(array('name' => $country));

        return $country;
    }

}
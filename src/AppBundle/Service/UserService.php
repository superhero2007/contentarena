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

    public function getUserByActivationCode( $activationCode )
    {
        if( $activationCode == null ) return null;

        $user = $this->em
            ->getRepository('AppBundle:User')
            ->findOneBy(array('confirmationToken' => $activationCode));

        return $user;
    }

    public function updateUser($data){

        if ( isset($data['id']) ) {

            $user = $this->em
                ->getRepository('AppBundle:User')
                ->findOneBy(array('id' => $data['id']));

            $userStatus = $this->em
                ->getRepository('AppBundle:UserStatus')
                ->findOneBy(array('name' => "Active"));

            if ( isset($data['firstName']) ) $user->setFirstName($data['firstName']);
            if ( isset($data['lastName']) ) $user->setLastName($data['lastName']);
            if ( isset($data['title']) ) $user->setTitle($data['title']);
            if ( isset($data['email']) ) $user->setEmail($data['email']);
            if ( isset($data['phone']) ) $user->setPhone($data['phone']);
            $user->setConfirmationToken(null);
            $user->setEnabled(true);
            $user->setStatus($userStatus);

            $this->em->persist($user);
            $this->em->flush();
            return $user;
        }

        return false;

    }

    public function activateUser(Request $request){

        $data = $request->get("user");

        if ( !isset($data['activationCode']) ) throw new BadRequestHttpException();

        $user = $this->em
            ->getRepository('AppBundle:User')
            ->findOneBy(array('confirmationToken' => $data['activationCode']));

        if ($user == null) throw new BadRequestHttpException();

        $user = $this->updateUser($data);
        if ( isset($data['company']) && isset($data['company']['id']) ){
            $this->updateCompany($data['company'], $user);
        } else {
            $this->createCompany($data['company'], $user);
        }

        $this->updatePassword($request);

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
            if ( isset($data['address2']) ) $company->setAddress2($data['address2']);
            if ( isset($data['city']) ) $company->setCity($data['city']);
            if ( isset($data['description']) ) $company->setDescription($data['description']);
            if ( isset($data['country']) ) $company->setCountry($this->getCountry($data['country']['name']));

            $this->em->persist($company);
            $this->em->flush();
            return $company;
        }

        return false;

    }

    public function createCompany($data, User $user){

        $company = new Company();

        if ( isset($data['vat']) ) $company->setVat($data['vat']);
        if ( isset($data['legalName']) ) $company->setLegalName($data['legalName']);
        if ( isset($data['zip']) ) $company->setZip($data['zip']);
        if ( isset($data['registrationNumber']) ) $company->setRegistrationNumber($data['registrationNumber']);
        if ( isset($data['address']) ) $company->setAddress($data['address']);
        if ( isset($data['address2']) ) $company->setAddress2($data['address2']);
        if ( isset($data['city']) ) $company->setCity($data['city']);
        if ( isset($data['description']) ) $company->setDescription($data['description']);
        if ( isset($data['country']) ) $company->setCountry($this->getCountry($data['country']['name']));
        $company->setUsers(array($user));
        $this->em->persist($company);
        $user->setCompany($company);
        $this->em->persist($user);
        $this->em->flush();
        return $company;

    }


    private function getCountry($country){

        $country =  $this->em
            ->getRepository('AppBundle:Country')
            ->findOneBy(array('name' => $country));

        return $country;
    }

}
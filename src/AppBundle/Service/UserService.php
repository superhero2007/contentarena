<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

use AppBundle\Entity\Company;
use FOS\UserBundle\Doctrine\UserManager;
use FOS\UserBundle\Model\UserManagerInterface;
use FOS\UserBundle\Util\TokenGeneratorInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Doctrine\RandomIdGenerator;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


class UserService
{

    private $em;

    private $idGenerator;

    private $fileUploader;

    private $emailService;

    protected $fosUserManager;

    protected $tokenGenerator;

    private $logger;

    public function __construct(
        EntityManagerInterface $entityManager,
        RandomIdGenerator $idGenerator,
        FileUploader $fileUploader,
        UserManagerInterface $fosUserManager,
        TokenGeneratorInterface $tokenGenerator,
        EmailService $emailService,
        LoggerInterface $logger
    ) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
        $this->fosUserManager = $fosUserManager;
        $this->tokenGenerator = $tokenGenerator;
        $this->emailService = $emailService;
        $this->logger = $logger;

    }

    public function getUserByActivationCode( $activationCode )
    {
        if( $activationCode == null ) return null;

        $user = $this->em
            ->getRepository('AppBundle:User')
            ->findOneBy(array('confirmationToken' => $activationCode));

        return $user;
    }

    public function getUserByEmail($email)
    {
        if( $email == null ) return null;

        return $this->em
            ->getRepository('AppBundle:User')
            ->findOneBy(array('email' => $email));

    }

    public function removeUserByEmail( $email )
    {
        if( $email == null ) return null;

        $user = $this->em
            ->getRepository('AppBundle:User')
            ->findOneBy(array('email' => $email));

        if ( $user != null ) $this->em->remove($user);

        $this->em->flush();

    }

    public function updatePasswordByEmail( $email, $password )
    {
        $user = $this->fosUserManager->findUserByEmail($email);

        if(!$user){
            return false;
        }

        $user->setPlainPassword($password);
        $this->fosUserManager->updateUser($user);
    }

    public function updateUser($data){

        if ( isset($data['id']) ) {

            $countryRepo = $userStatus = $this->em
                ->getRepository('AppBundle:Country');

            $sportsRepo = $userStatus = $this->em
                ->getRepository('AppBundle:Sport');

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
            if ( isset($data['preferredProfile']) ) $user->setPreferredProfile($data['preferredProfile']);
            if ( isset($data['preferredSellerAllSports']) ) $user->setPreferredSellerAllSports($data['preferredSellerAllSports']);
            if ( isset($data['preferredBuyerAllSports']) ) $user->setPreferredBuyerAllSports($data['preferredBuyerAllSports']);
            if ( isset($data['receivePreferenceNotifications']) ) $user->setReceivePreferenceNotifications($data['receivePreferenceNotifications']);

            if ( isset($data['preferredBuyerCountries']) && is_array($data['preferredBuyerCountries']) ) {
                $preferredBuyerCountries = [];
                foreach ($data['preferredBuyerCountries'] as $countryData){
                    $country = $countryRepo->findOneBy(array("name" => $countryData["name"]));
                    if ( $country != null) $preferredBuyerCountries[] = $country;
                }
                $user->setPreferredBuyerCountries($preferredBuyerCountries);
            }

            if ( isset($data['preferredSellerSports']) && is_array($data['preferredSellerSports']) ) {
                $preferredSellerSports = [];
                foreach ($data['preferredSellerSports'] as $sportData){
                    $sport = $sportsRepo->findOneBy(array("id" => $sportData["id"]));
                    if ( $sport != null) $preferredSellerSports[] = $sport;
                }
                $user->setPreferredSellerSports($preferredSellerSports);
            }

            if ( isset($data['preferredBuyerSports']) && is_array($data['preferredBuyerSports']) ) {
                $preferredBuyerSports = [];
                foreach ($data['preferredBuyerSports'] as $sportData){
                    $sport = $sportsRepo->findOneBy(array("id" => $sportData["id"]));
                    if ( $sport != null) $preferredBuyerSports[] = $sport;
                }
                $user->setPreferredBuyerSports($preferredBuyerSports);
            }

            $user->setPreferredProfile($data['preferredProfile']);

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

        $this->logger->info("USER IS ACTIVATING", array ( $user, $data ) );

        $user = $this->updateUser($data);

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

    /**
     * @param $data
     * @param User $user
     * @return Company|bool|null|object
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function updateCompany($data, User $user){
        if ( isset($data['id']) ) {

            $company = $this->em
                ->getRepository('AppBundle:Company')
                ->findOneBy(array('id' => $data['id']));

            if ( $user->getCompany()->getId() != $company->getId() ) return false;

            if ( isset($data['legalName']) ) $company->setLegalName($data['legalName']);
            if ( isset($data['vat']) ) $company->setVat($data['vat']);
            if ( isset($data['zip']) ) $company->setZip($data['zip']);
            if ( isset($data['registrationNumber']) ) $company->setRegistrationNumber($data['registrationNumber']);
            if ( isset($data['address']) ) $company->setAddress($data['address']);
            if ( isset($data['address2']) ) $company->setAddress2($data['address2']);
            if ( isset($data['city']) ) $company->setCity($data['city']);
            if ( isset($data['description']) ) $company->setDescription($data['description']);

            if ( isset($data['country']) && isset($data['country']['name']) ) {
                $country = $this->getCountry($data['country']['name']);
                if ( $country != null ) $company->setCountry($country);
            }

            $this->em->persist($company);
            $this->em->flush();
            return $company;
        }

        return false;

    }

    public function createCompany($data, User $user){

        $company = new Company();
        $name = $data['legalName'];

        $companies = $this->em->getRepository("AppBundle:Company")->findByLegalName($name);

        if ( $companies != null ) {
            $name = $name . "-" . $user->getId();
        }

        if ( isset($data['vat']) ) $company->setVat($data['vat']);
        if ( isset($data['legalName']) ) $company->setLegalName($name);
        if ( isset($data['zip']) ) $company->setZip($data['zip']);
        if ( isset($data['registrationNumber']) ) $company->setRegistrationNumber($data['registrationNumber']);
        if ( isset($data['address']) ) $company->setAddress($data['address']);
        if ( isset($data['address2']) ) $company->setAddress2($data['address2']);
        if ( isset($data['city']) ) $company->setCity($data['city']);
        if ( isset($data['description']) ) $company->setDescription($data['description']);

        if ( isset($data['country']) && isset($data['country']['name']) ) {
            $country = $this->getCountry($data['country']['name']);
            if ( $country != null ) $company->setCountry($country);
        }

        $company->setUsers(array($user));
        $this->em->persist($company);
        $user->setCompany($company);
        $this->em->persist($user);
        $this->em->flush();
        return $company;

    }

    public function inviteCompanyUsers(array $users, Company $company)
    {
        $userRepository = $this->em->getRepository('AppBundle:User');
        $invitedUsers = [];
        $skippedUsers = [];

        foreach ( $users as $userData ){
            $user = $userRepository->findOneBy(['email' => $userData["email"]]);

            if ( $user != null ) {
                $skippedUsers[] = $user;
                continue;
            }

            /** @var User $user */
            $user = $this->fosUserManager->createUser();
            $user->setEnabled(true);
            $user->setEmail($userData["email"]);
            $user->setUsername($userData["email"]);
            $user->setFirstName($userData["firstName"]);
            $user->setLastName($userData["lastName"]);
            $user->setRegisteredAt(new \DateTime());
            $user->setCompany($company);
            $user->setPlainPassword('');

            if (null === $user->getConfirmationToken()) {
                $user->setConfirmationToken($this->tokenGenerator->generateToken());
            }

            $this->fosUserManager->updateUser($user);
            $invitedUsers[] = $user;

        }

        return array ( "invitedUsers" => $invitedUsers, "skippedUsers" => $skippedUsers );
    }

    private function getCountry($country){

        $country =  $this->em
            ->getRepository('AppBundle:Country')
            ->findOneBy(array('name' => $country));

        return $country;
    }


}

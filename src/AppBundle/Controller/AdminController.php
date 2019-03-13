<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 26/12/2017
 * Time: 12:05 AM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Company;
use AppBundle\Entity\Sport;
use AppBundle\Service\FileUploader;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use AppBundle\Entity\User;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateIntervalType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class AdminController extends BaseAdminController
{

    use \AppBundle\Helper\EmailHelper;

    static $IMPORT_DATA = array(
        "First Name", //0
        "Last Name", //1
        "Email", //2
        "Company", //3
        "Profile", //4
        "Country", //5
        "Auto Publish", //6
        "Status", //7
        "Preferred Profile", //8
        "Selling Preferred Sports", //9
        "Buying Preferred Sports", //10
        "Buying Preferred Territories", //11
    );

    static $EXPORT_DATA = array(
        "First Name",
        "Last Name",
        "Email",
        "Company",
        "Country",
        "Status",
        "Last Login",
        "Date of Creation",
        "Activation Link",
        "Preferred Profile",
        "Selling Preferred Sports",
        "Buying Preferred Sports",
        "Buying Preferred Territories",
    );

    public function utilsAction(){

    }

    public function createCompanyAction()
    {
        // controllers extending the base AdminController can access to the
        // following variables:
        //   $this->request, stores the current request
        //   $this->em, stores the Entity Manager for this Doctrine entity

        // change the properties of the given entity and save the changes
        $id = $this->request->query->get('id');
        $user = $this->em->getRepository('AppBundle:User')->find($id);
        $company_results = $this->em->getRepository('AppBundle:Company')->findBylegalName($user->getCompanyLegalName());

        if ( $company_results == null || count($company_results) == 0) {
            $company =  new \AppBundle\Entity\Company();
            $company->setLegalName($user->getCompanyLegalName());
            $company->setWebsite($user->getCompanyWebsite());
            $company->setOwner($user);

            $this->em->persist($company);
            $this->em->flush();
        } else {
            $company = $company_results[0];
        }

        $user->setCompany($company);

        // redirect to the 'list' view of the given entity
      /*  return $this->redirectToRoute('easyadmin', array(
            'action' => 'list',
            'entity' => $this->request->query->get('entity'),
        ));*/

        // redirect to the 'edit' view of the given entity item
        return $this->redirectToRoute('easyadmin', array(
            'action' => 'edit',
            'id' => $company->getId(),
            'entity' => 'Company'
        ));
    }


    /**
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendActivationLinkAction()
    {
        // controllers extending the base AdminController can access to the
        // following variables:
        //   $this->request, stores the current request
        //   $this->em, stores the Entity Manager for this Doctrine entity

        // change the properties of the given entity and save the changes
        $id = $this->request->query->get('id');
        $user = $this->em->getRepository('AppBundle:User')->find($id);
        $user->setStatus( $this->em->getRepository('AppBundle:UserStatus')->findByName("Registration Data Sent"));
        $tokenGenerator = $this->get('fos_user.util.token_generator');
        $emailService = $this->get("AppBundle\Service\EmailService");
        if (null === $user->getConfirmationToken()) {
            $user->setConfirmationToken($tokenGenerator->generateToken());
        }

        $this->em->persist($user);
        $this->em->flush();
        $hostUrl = $this->container->getParameter("carena_host_url");
        $confirmationUrl = $this->container->get('router')->generate('fos_user_registration_confirm_new', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL);
        $params = array(
            "hostUrl" => $hostUrl,
            "user" => $user,
            "confirmationUrl" => $confirmationUrl
        );
        $emailService->sendActivationLink($params);


        /*$this->sendEmail(
            'Registration/email.txt.twig',
            'Welcome to Content Arena',
            $user->getEmail(),
            array('user' => $user, 'confirmationUrl' => $confirmationUrl)
        );*/

        return $this->redirectToRoute('easyadmin', array(
            'action' => 'edit',
            'id' => $user->getId(),
            'entity' => 'User'
        ));
    }

    /**
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function createActivationLinkAction()
    {
        $id = $this->request->query->get('id');
        $user = $this->em->getRepository('AppBundle:User')->find($id);
        $tokenGenerator = $this->get('fos_user.util.token_generator');
        if (null === $user->getConfirmationToken()) {
            $user->setConfirmationToken($tokenGenerator->generateToken());
        }

        $this->em->persist($user);
        $this->em->flush();

        return $this->redirectToRoute('easyadmin', array(
            'action' => 'show',
            'id' => $user->getId(),
            'entity' => 'User'
        ));
    }

    /**
     * @Route("/generalterms/upload", name="uploadGeneralTermsPage")
     * @param Request $request
     * @param FileUploader $fileUploader
     * @return Response
     */
    public function uploadGeneralTermsPage(Request $request ){

        $user = $this->getUser();
        $data = null;
        $message = "";
        $fileName = "general-terms.html";

        $defaultData = array();
        $form = $this->createFormBuilder($defaultData)
            ->add('terms', FileType::class)
            ->add('send', SubmitType::class)
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // data is an array with "name", "email", and "message" keys
            $data = $form->getData();
            $file = $data['terms'];
            $extension = $file->guessExtension();

            if ( $extension == "html"){
                $file->move($this->container->getParameter("upload_general_terms_page") , $fileName);
                $message = "General Terms updated successfully!";
            } else {
                $message = "Please upload a valid html file";
            }
        }

        $viewElements = array(
            'user' => $user,
            'form' => $form->createView(),
            'message' => $message,
            'data' => $data,
            'watermark' => true,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );




        return $this->render('contract/upload.form.html.twig', $viewElements);
    }

    /**
     * @Route("/users/import", name="importUsersPage")
     * @param Request $request
     * @return Response
     */
    public function importUsersPage(Request $request){

        $doctrine = $this->getDoctrine();
        $repo = $doctrine->getRepository('AppBundle:User');
        $userStatusRepo = $doctrine->getRepository('AppBundle:UserStatus');
        $companyRepo = $doctrine->getRepository('AppBundle:Company');
        $sportsRepo = $doctrine->getRepository('AppBundle:Sport');
        $countryRepo = $doctrine->getRepository('AppBundle:Country');
        $tokenGenerator = $this->get('fos_user.util.token_generator');
        $user = $this->getUser();
        $now = new \DateTime();
        $data = null;
        $usersCreated = array();
        $usersSkipped = array();
        $usersSkippedByError = array();
        $rows = array();

        $defaultData = array();
        $form = $this->createFormBuilder($defaultData)
            ->add('csvFile', FileType::class)
            ->add('send', SubmitType::class, array(
                'attr' => array('class' => 'btn btn-primary action-new'),
                'label' => 'Import'
            ))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /* @var File $file*/
            $data = $form->getData();
            $file = $data['csvFile'];
            $ignoreFirstLine = true;
            $rows = array();
            if (($handle = fopen($file->getRealPath(), "r")) !== FALSE) {
                $i = 0;
                while (($data = fgetcsv($handle, null, ";")) !== FALSE) {
                    $i++;
                    if ($ignoreFirstLine && $i == 1) { continue; }
                    $rows[] = explode(",", $data[0]);
                }
                fclose($handle);
            }

            foreach ( $rows as $row){
                $user = $repo->findOneBy(array("email" => $row[2]));
                if ( $user == null ) {

                    try {
                        $usersCreated[] = $row;
                        $user = new User();
                        $user->setFirstName(trim($row[0]));
                        $user->setLastName(trim($row[1]));
                        $user->setEmail(trim($row[2]));
                        $user->setProfile(trim($row[4]));
                        $user->setCountry($row[5]);
                        $user->setAutoPublish(trim($row[6]));
                        $user->setConfirmationToken($tokenGenerator->generateToken());
                        $user->setRegisteredAt($now);
                        if ($row[7] != null ) $user->setStatus($userStatusRepo->findByName($row[7]));
                        if ($row[8] != null ) $user->setPreferredProfile(trim($row[8]));
                        if ($row[9] != null ) {
                            if ($row[9] === "All"){
                                $user->setPreferredSellerAllSports(true);
                            } else {

                                $sports = explode("-", $row[9]);
                                $sportsObj = array();
                                foreach ($sports as $sport){
                                    $sportObj = $sportsRepo->findOneBy(array("name" => trim($sport)));
                                    if ( $sportObj != null ) $sportsObj[] = $sportObj;
                                }
                                $user->setPreferredSellerSports($sportsObj);
                            }
                        }
                        if ($row[10] != null ) {
                            if ($row[10] === "All"){
                                $user->setPreferredBuyerAllSports(true);
                            } else {
                                $sports = explode("-", $row[10]);
                                $sportsObj = array();
                                foreach ($sports as $sport){
                                    $sportObj = $sportsRepo->findOneBy(array("name" => trim($sport)));
                                    if ( $sportObj != null ) $sportsObj[] = $sportObj;
                                }
                                $user->setPreferredBuyerSports($sportsObj);
                            }
                        }
                        if ($row[11] != null ) {
                            $countries = explode("-", $row[11]);
                            $sportsObj = array();
                            foreach ($countries as $sport){
                                $sportObj = $countryRepo->findOneBy(array("name" => trim($sport)));
                                if ( $sportObj != null ) $sportsObj[] = $sportObj;
                            }
                            $user->setPreferredBuyerCountries($sportsObj);
                        }
                        if ( $row[3] ){
                            $company = $companyRepo->findOneBy( array( "legalName" => $row[3] ) );
                            if ($company != null){

                            } else {
                                $company = new Company();
                                $company->setLegalName( $row[3] );
                                $doctrine->getManager()->persist($company);
                            }
                            $user->setCompany($company);
                        }
                        $doctrine->getManager()->persist($user);
                    }
                    catch(\Exception $exception) {
                        $usersSkippedByError[] = $row;
                    }

                    $doctrine->getManager()->flush();
                } else {
                    $usersSkipped[] = $row;
                }
            }

        }

        $viewElements = array(
            'user' => $user,
            'form' => $form->createView(),
            'usersCreated' => $usersCreated,
            'usersSkipped' => $usersSkipped,
            'usersSkippedByError' => $usersSkippedByError,
            'usersProcessed' => count($rows),
            'watermark' => true,
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );

        return $this->render('users/import.form.html.twig', $viewElements);
    }

    /**
     * @Route("/users/export", name="exportUsersPage")
     * @param Request $request
     * @return Response
     */
    public function exportUsersPage(Request $request){

        $user = $this->getUser();
        $repo = $this->getDoctrine()->getRepository('AppBundle:User');
        $data = null;
        $defaultData = array();
        $form = $this->createFormBuilder($defaultData)
            ->add('createdAtStart', DateType::class, array(
                'widget' => 'choice',
                'label' => "Date of creation (start)",
                'attr' => array('class' => 'fieldClass')
            ))
            ->add('createdAtEnd', DateType::class, array(
                'widget' => 'choice',
                'label' => "Date of creation (end)",
                'data' => new \DateTime()
            ))
            ->add('lastLogin', ChoiceType::class, array(
                'choices'  => array(
                    'NULL' => false,
                    'not NULL ' => true,
                    'Both' => null,
                ),
                'label' => "Last Login"
            ))
            ->add('send', SubmitType::class, array(
                'attr' => array('class' => 'btn btn-primary action-new'),
                "label" => "Download"
            ))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $users = $repo->findByRangeAndLastLogin($data['createdAtStart'],$data['createdAtEnd'],$data['lastLogin']);
            $content = $this->usersToCsvExport($users);
            return $this->csvResponse($content, "export-users.csv");
        }


        $viewElements = array(
            'user' => $user,
            //'message' => $message,
            'form' => $form->createView(),
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );

        return $this->render('users/export.form.html.twig', $viewElements);
    }

    /**
     * @Route("/users/import/example", name="importUsersExample")
     * @throws \exception
     */
    public function importUsersExample( ){

        $rows[] = implode(',', $this::$IMPORT_DATA);
        $content = implode("\n", $rows);
        $response = new Response($content);

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename="import-users.csv"');

        return $response;
    }

    /**
     * @Route("/users/export/all", name="exportAllUsers")
     * @return Response
     */
    public function exportAllUsers( ){

        $users = $this->getDoctrine()->getRepository('AppBundle:User')->findAll();
        $content = $this->usersToCsvExport($users);
        return $this->csvResponse($content, "export-users.csv");
    }

    private function csvResponse($content, $name = "import-users.csv"){
        $response = new Response($content);

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename="'.$name.'"');

        return $response;
    }

    private function usersToCsv(array $users){
        $rows[] = implode(',', $this::$IMPORT_DATA);

        foreach ( $users as $user ){
            /* @var User $user*/
            $rows[] = implode(',', array(
                $user->getFirstName(),
                $user->getLastName(),
                $user->getEmail(),
                ($user->getCompany() != null) ? $user->getCompany()->getLegalName() : "",
                $user->getProfile(),
                $user->getCountry(),
                $user->isAutoPublish(),
                ( $user->getStatus() != null ) ? $user->getStatus()->getName() : ""

            ));
        }

        return implode("\n", $rows);
    }

    private function usersToCsvExport(array $users){
        $rows[] = implode(',', $this::$EXPORT_DATA);

        foreach ( $users as $user ){
            /* @var User $user */
            $preferredSellerSports = "";
            $preferredBuyerSports = "";
            $preferredBuyerCountries = "";
            $confirmationUrl =  ( $user->getConfirmationToken() != null ) ?
                $this->container->get('router')->generate('fos_user_registration_confirm_new', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL) : "";

            if ($user->getPreferredSellerSports() != null && !$user->isPreferredSellerAllSports()){
                $preferredSellerSports = array_map(function($obj) {
                    /* @var Sport $obj */
                    return $obj->getName();
                    }, iterator_to_array($user->getPreferredSellerSports()));
                $preferredSellerSports = implode("- ", $preferredSellerSports);
            }

            if ($user->isPreferredSellerAllSports()){
                $preferredSellerSports = "All";
            }

            if ($user->getPreferredBuyerSports() != null && !$user->isPreferredBuyerAllSports() ){
                $preferredBuyerSports = array_map(function($obj) {
                    /* @var Sport $obj */
                    return $obj->getName();
                }, iterator_to_array($user->getPreferredBuyerSports()));
                $preferredBuyerSports = implode("- ", $preferredBuyerSports);
            }

            if ( $user->isPreferredBuyerAllSports() ){
                $preferredBuyerSports = "All";
            }

            if ($user->getPreferredBuyerCountries() != null ){
                $preferredBuyerCountries = array_map(function($obj) {
                    /* @var Sport $obj */
                    return $obj->getName();
                }, iterator_to_array($user->getPreferredBuyerCountries()));
                $preferredBuyerCountries = implode("- ", $preferredBuyerCountries);
            }


            $company = $user->getCompany();

            /* @var User $user*/
            $rows[] = implode(',', array(
                $user->getFirstName(),
                $user->getLastName(),
                $user->getEmail(),
                ($company != null) ? $company->getLegalName() : "",
                ($company != null && $company->getCountry() != null) ? $company->getCountry()->getName() : "",
                ( $user->getStatus() != null ) ? $user->getStatus()->getName() : "",
                ( $user->getLastLogin() != null ) ? $user->getLastLogin()->format('Y-m-d H:i:s'): "",
                ( $user->getRegisteredAt() != null ) ? $user->getRegisteredAt()->format('Y-m-d H:i:s'): "",
                ( $user->getConfirmationToken() != null ) ? $confirmationUrl : "",
                ( $user->getPreferredProfile() != null ) ? $user->getPreferredProfile() : "",
                ( $user->getPreferredSellerSports() != null ) ? $preferredSellerSports : "",
                ( $user->getPreferredBuyerSports() != null ) ? $preferredBuyerSports : "",
                ( $user->getPreferredBuyerCountries() != null ) ? $preferredBuyerCountries : "",


            ));
        }

        return implode("\n", $rows);
    }



}

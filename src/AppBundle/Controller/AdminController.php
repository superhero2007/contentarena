<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 26/12/2017
 * Time: 12:05 AM
 */

namespace AppBundle\Controller;

use AppBundle\Service\EmailService;
use AppBundle\Service\FileUploader;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class AdminController extends BaseAdminController
{

    use \AppBundle\Helper\EmailHelper;


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
     * @throws \exception
     */
    public function uploadGeneralTermsPage(Request $request, FileUploader $fileUploader){

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



}
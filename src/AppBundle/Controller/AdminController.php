<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 26/12/2017
 * Time: 12:05 AM
 */

namespace AppBundle\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

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

        if (null === $user->getConfirmationToken()) {
            $user->setConfirmationToken($tokenGenerator->generateToken());
        }

        $this->em->persist($user);
        $this->em->flush();

        $confirmationUrl = $this->container->get('router')->generate('fos_user_registration_confirm_new', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL);

        $this->sendEmail(
            'Registration/email.txt.twig',
            'Welcome to Content Arena',
            $user->getEmail(),
            array('user' => $user, 'confirmationUrl' => $confirmationUrl)
        );


        // redirect to the 'list' view of the given entity
        /*  return $this->redirectToRoute('easyadmin', array(
              'action' => 'list',
              'entity' => $this->request->query->get('entity'),
          ));*/

        // redirect to the 'edit' view of the given entity item
        return $this->redirectToRoute('easyadmin', array(
            'action' => 'edit',
            'id' => $user->getId(),
            'entity' => 'User'
        ));
    }
}
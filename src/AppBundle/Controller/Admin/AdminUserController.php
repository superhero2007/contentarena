<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 26/12/2017
 * Time: 12:05 AM
 */

namespace AppBundle\Controller\Admin;

use Doctrine\ORM\EntityManager;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use AppBundle\Entity\User;
use AppBundle\Entity\Company;
use AppBundle\Entity\Sport;
use AppBundle\Service\FileUploader;
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

class AdminUserController extends BaseAdminController
{

    use \AppBundle\Helper\EmailHelper;

    public function switchUserAction(){

        $id = $this->request->query->get('id');
        $entity = $this->em->getRepository(User::class)->find($id);

        return $this->redirectToRoute('homepage', array(
            '_ghost_mode' => $entity->getEmail(),
        ));
    }

    public function archiveUserAction(){

        $id = $this->request->query->get('id');
        $user = $this->em->getRepository('AppBundle:User')->find($id);
        $userStatus = $this->em
            ->getRepository('AppBundle:UserStatus')
            ->findOneBy(array('name' => User::$ARCHIVED_STATUS));
        $user->setStatus($userStatus);
        $this->em->persist($user);
        $this->em->flush();

        return $this->redirectToRoute('easyadmin', array(
            'action' => 'list',
            'entity' => 'User'
        ));
    }

    /**
     * @param string $entityClass
     * @param string $sortDirection
     * @param null $sortField
     * @param null $dqlFilter
     * @return \Doctrine\ORM\QueryBuilder
     */
    protected function createListQueryBuilder($entityClass, $sortDirection, $sortField = null, $dqlFilter = null)
    {
        /* @var EntityManager */
        $em = $this->getDoctrine()->getManagerForClass($this->entity['class']);
        /* @var DoctrineQueryBuilder */
        $queryBuilder = $em->createQueryBuilder()
            ->select('entity')
            ->from($this->entity['class'], 'entity')
            ->leftJoin('entity.status','status');

        $isSortedByDoctrineAssociation = false !== strpos($sortField, '.');
        if ($isSortedByDoctrineAssociation) {
            $sortFieldParts = explode('.', $sortField);
            $queryBuilder->leftJoin('entity.'.$sortFieldParts[0], $sortFieldParts[0]);
        }


        if (!empty($dqlFilter)) {
            $queryBuilder->andWhere($dqlFilter);
        }

        if (null !== $sortField) {
            $queryBuilder->orderBy(sprintf('%s%s', $isSortedByDoctrineAssociation ? '' : 'entity.', $sortField), $sortDirection);
        }

        return $queryBuilder;
    }

    public function createCompanyAction()
    {
        $id = $this->request->query->get('id');
        $user = $this->em->getRepository('AppBundle:User')->find($id);
        $companyName = ($user->getCompanyLegalName()) ? $user->getCompanyLegalName() : $user->getApplicationCompany();
        $company_results = $this->em->getRepository('AppBundle:Company')->findBylegalName($companyName);

        if ( $company_results == null || count($company_results) == 0) {
            $company =  new \AppBundle\Entity\Company();
            $company->setLegalName($companyName);
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
}

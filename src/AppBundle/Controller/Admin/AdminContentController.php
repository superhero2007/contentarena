<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 26/12/2017
 * Time: 12:05 AM
 */

namespace AppBundle\Controller\Admin;

use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use EasyCorp\Bundle\EasyAdminBundle\Event\EasyAdminEvents;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class AdminContentController extends BaseAdminController
{

    /**
     * The method that is executed when the user performs a 'list' action on an entity.
     *
     * @return Response
     */
    protected function listAction()
    {
        $this->dispatch(EasyAdminEvents::PRE_LIST);
        switch ($this->request->query->get('filters')['status']) {
            case 'draft':
                $dqlFilter = "status.name = 'DRAFT' OR status.name = 'AUTO_INACTIVE'";
                break;
            case 'pending':
                $dqlFilter = "status.name = 'PENDING'";
                break;
            case 'active':
                $dqlFilter = "status.name = 'APPROVED' OR status.name = 'EDITED'";
                break;
            case 'inactive':
                $dqlFilter = "status.name = 'ARCHIVED' OR status.name = 'EXPIRED' OR status.name = 'INACTIVE'";
                break;
            default:
                $dqlFilter = "status.name != 'SOLD_COPY'";
        }

        $fields = $this->entity['list']['fields'];
        $paginator = $this->findAll(
            $this->entity['class'],
            $this->request->query->get('page', 1),
            $this->entity['list']['max_results'],
            $this->request->query->get('sortField'),
            $this->request->query->get('sortDirection'),
            $dqlFilter
        );
        #$paginator = $this->findBy($this->entity['class'], null, array("status.name" => "APPROVED"), $this->request->query->get('page', 1), $this->entity['list']['max_results'], $this->request->query->get('sortField'), $this->request->query->get('sortDirection'), $this->entity['list']['dql_filter']);

        $this->dispatch(EasyAdminEvents::POST_LIST, array('paginator' => $paginator));

        $parameters = array(
            'paginator' => $paginator,
            'fields' => $fields,
            'delete_form_template' => $this->createDeleteForm($this->entity['name'], '__id__')->createView(),
            'filters' => $this->createFilterForm(
                $this->request->query->get('filters', []),
                $this->generateUrl('contentListFilter', $this->request->query->all())
            )->createView()
        );

        return $this->executeDynamicMethod('render<EntityName>Template', array('list', $this->entity['templates']['list'], $parameters));
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

    /**
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function notifyUsersAboutListingAction()
    {

        $id = $this->request->query->get('id');
        $listing = $this->em->getRepository('AppBundle:Content')->find($id);
        $emailService = $this->get("AppBundle\Service\EmailService");
        $notificationsService = $this->get("AppBundle\Service\NotificationService");
        $contentService = $this->get("AppBundle\Service\ContentService");
        $users = $contentService->getUsersToNotify($listing);

        foreach ($users as $user){
            /* @var User $user */
            $notificationsService->createSingleNotification("BUYER_LISTING_MATCH", $listing->getCustomId(),$user, array(
                "%listingName%" => $listing->getName()
            ));

            if($user->isReceivePreferenceNotifications() != null && $user->isReceivePreferenceNotifications() ) {
                $emailService->listingMatch($listing, $user);
            }
        }

        return $this->redirectToRoute('easyadmin', array(
            'action' => 'edit',
            'id' => $listing->getId(),
            'entity' => 'Content'
        ));

    }

    public function createFilterForm($requestFilters, $route)
    {
        $formBuilder = $this->get('form.factory')
            ->createNamedBuilder('filter')
            ->setMethod('POST')
            ->setAction($route);

        $formBuilder->add(
            'status',
            ChoiceType::class,
            array(
                'translation_domain' => 'messages',
                'required' => false,
                'placeholder' => 'All',
                'data' => $requestFilters['status'] ? $requestFilters['status'] : null,
                'choices' => [
                    'Draft' => 'draft',
                    'Pending' => 'pending',
                    'Active' => 'active',
                    'Inactive' => 'inactive'
                ],
                'attr' => array(
                    'class' => 'form-control',
                ),
            )
        );

        $formBuilder->add(
            'submit',
            SubmitType::class,
            [
                'label' => 'Apply',
                'attr' => array(
                    'class' => 'btn btn-primary',
                )
            ]
        );

        $form = $formBuilder->getForm();

        return $form;
    }

}

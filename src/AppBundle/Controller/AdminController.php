<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 26/12/2017
 * Time: 12:05 AM
 */

namespace AppBundle\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;

class AdminController extends BaseAdminController
{

    public function createCompanyAction()
    {
        // controllers extending the base AdminController can access to the
        // following variables:
        //   $this->request, stores the current request
        //   $this->em, stores the Entity Manager for this Doctrine entity

        // change the properties of the given entity and save the changes
        $id = $this->request->query->get('id');
        $entity = $this->em->getRepository('AppBundle:User')->find($id);
        $entity->setApproved(true);
        $this->em->flush();

        $company =  new \AppBundle\Entity\Company();

        // redirect to the 'list' view of the given entity
      /*  return $this->redirectToRoute('easyadmin', array(
            'action' => 'list',
            'entity' => $this->request->query->get('entity'),
        ));*/

        // redirect to the 'edit' view of the given entity item
        return $this->redirectToRoute('easyadmin', array(
            'action' => 'new',
            'entity' => 'Company',
        ));
    }
}
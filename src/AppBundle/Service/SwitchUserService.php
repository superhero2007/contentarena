<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 27-Mar-18
 * Time: 17:16
 */

namespace AppBundle\Service;

use AppBundle\Entity\SoldListing;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Role\SwitchUserRole;

class SwitchUserService
{

    private $em;

    private $tokenStorage;

    private $adminUserId = null;

    public function __construct(
        EntityManagerInterface $entityManager,
        TokenStorageInterface $tokenStorage
    ){
        $this->tokenStorage = $tokenStorage;
        $this->em = $entityManager;
    }

    /**
     * @return bool
     */
    public function isGhostModeActive()
    {
        $ghostMode = false;
        foreach ($this->tokenStorage->getToken()->getRoles() as $role) {
            if ($role instanceof SwitchUserRole) {
                $adminUser = $role->getSource()->getUser();
                if ($adminUser) $this->adminUserId = $adminUser->getId();
                $ghostMode = true;
            }
        }

        return $ghostMode;

    }

    /**
     * @return null
     */
    public function getAdminUser()
    {
        $adminUser = null;
        if ($this->adminUserId == null) $this->isGhostModeActive();
        if ($this->adminUserId != null) $adminUser = $this->em->getRepository("AppBundle:User")->findOneBy(array("id" => $this->adminUserId));
        return $adminUser;
    }



}

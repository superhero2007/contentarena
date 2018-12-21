<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 13/10/2018
 * Time: 5:41 PM
 */

// src/EventListener/SearchIndexerSubscriber.php
namespace AppBundle\EventListener;

use AppBundle\Entity\Content;
use AppBundle\Entity\ListingStatus;
use AppBundle\Entity\User;
use AppBundle\Service\ContentService;
use AppBundle\Service\EmailService;
use Doctrine\Common\EventSubscriber;
// for Doctrine < 2.4: use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

class UpdateListingSubscriber implements EventSubscriber
{

    protected $mailer;
    protected $em;
    protected $container;
    protected $contentService;

    public function __construct(ContentService $contentService, EmailService $mailer, EntityManager $em, ContainerInterface $container)
    {
        $this->mailer = $mailer;
        $this->em = $em;
        $this->contentService = $contentService;
    }

    public function getSubscribedEvents()
    {
        return array(
            'preUpdate',
        );
    }

    /**
     * @param LifecycleEventArgs $args
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function preUpdate(LifecycleEventArgs $args)
    {
        $this->index($args);
    }


    /**
     * @param LifecycleEventArgs $args
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function index(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        // perhaps you only want to act on some "Product" entity
        if ($entity instanceof Content) {

            $changed = $args->getEntityChangeSet();

            if ( isset($changed) && isset($changed["status"]) ){
                if ( $changed["status"][0]->getName() !== "APPROVED" && $changed["status"][1]->getName() === "APPROVED"  ){
                    $this->mailer->listingApproved($entity);
                }
                if ( $changed["status"][0]->getName() !== "REJECTED" && $changed["status"][1]->getName() === "REJECTED"  ){
                    $this->mailer->listingDeactivated($entity);
                }
                if ( $changed["status"][0]->getName() !== "INACTIVE" && $changed["status"][1]->getName() === "INACTIVE"  ){
                    $this->mailer->listingDeactivated($entity);
                }
                if ( $changed["status"][0]->getName() !== "INACTIVE" && $changed["status"][1]->getName() === "INACTIVE"  ){
                    $this->mailer->listingDeactivated($entity);
                }

                if ( ($changed["status"][0]->getName() === "DRAFT" || $changed["status"][0]->getName() === "AUTO_INACTIVE" ||  $changed["status"][0]->getName() === "PENDING" )
                    && $changed["status"][1]->getName() === "APPROVED"  ){

                    $users = $this->contentService->getUsersToNotify($entity);

                    foreach ($users as $user){
                        /* @var User $user */
                        if($user->isReceivePreferenceNotifications() != null && $user->isReceivePreferenceNotifications() ) {
                            $this->mailer->listingMatch($entity, $user);
                        }
                    }


                }


            }

        }
    }
}
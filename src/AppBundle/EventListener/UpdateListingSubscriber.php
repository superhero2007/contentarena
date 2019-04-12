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
use AppBundle\Service\NotificationService;
use Doctrine\Common\EventSubscriber;
// for Doctrine < 2.4: use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Events;
use Symfony\Component\DependencyInjection\ContainerInterface;

class UpdateListingSubscriber implements EventSubscriber
{

    protected $mailer;
    protected $em;
    protected $container;
    protected $contentService;
    protected $notificationService;

    private $preStatus;
    private $postStatus;

    public function __construct(
        ContentService $contentService,
        EmailService $mailer,
        EntityManager $em,
        ContainerInterface $container,
        NotificationService $notificationService
    )
    {
        $this->mailer = $mailer;
        $this->em = $em;
        $this->contentService = $contentService;
        $this->notificationService = $notificationService;
    }

    public function getSubscribedEvents()
    {
        return array(
            Events::preUpdate,
            Events::postUpdate
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
     */
    public function postUpdate(LifecycleEventArgs $args)
    {

        $entity = $args->getObject();

        if ( $entity instanceof Content && isset($this->preStatus) && isset($this->postStatus) ) {

            if ($this->preStatus->getName() !== "APPROVED" && $this->postStatus->getName() === "APPROVED") {
                $this->notificationService->createSingleNotification("SELLER_LISTING_APPROVED", $entity,$entity->getOwner(), array(
                    "%listingName%" => $entity->getName()
                ));
            }
            if ( $this->preStatus->getName() !== "REJECTED" && $this->postStatus->getName() === "REJECTED"  ){
                $this->notificationService->createSingleNotification("SELLER_LISTING_DEACTIVATED", $entity,$entity->getOwner(), array(
                    "%listingName%" => $entity->getName()
                ));
            }
            if ( $this->preStatus->getName() !== "INACTIVE" && $this->postStatus->getName() === "INACTIVE"  ){
                $this->notificationService->createSingleNotification("SELLER_LISTING_DEACTIVATED", $entity,$entity->getOwner(), array(
                    "%listingName%" => $entity->getName()
                ));
            }
            if ( $this->preStatus->getName() !== "INACTIVE" && $this->postStatus->getName() === "INACTIVE"  ){
                $this->notificationService->createSingleNotification("SELLER_LISTING_DEACTIVATED", $entity,$entity->getOwner(), array(
                    "%listingName%" => $entity->getName()
                ));
            }


        }
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

                $this->preStatus = $changed["status"][0];
                $this->postStatus = $changed["status"][1];

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

                    // Notify admins
                    $this->mailer->internalUserListingSubmit( $entity->getOwner(), $entity);
                }
            }
        }
    }
}

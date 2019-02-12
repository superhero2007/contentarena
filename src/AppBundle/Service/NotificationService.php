<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 27-Mar-18
 * Time: 17:16
 */

namespace AppBundle\Service;

use AppBundle\Entity\Company;
use AppBundle\Entity\Content;
use AppBundle\Entity\Notification;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use AppBundle\Doctrine\RandomIdGenerator;
use Symfony\Component\Translation\TranslatorInterface;

class NotificationService
{

    private $em;

    private $idGenerator;

    private $fileUploader;

    private $translator;

    public function __construct(
        EntityManager $entityManager,
        RandomIdGenerator $idGenerator,
        FileUploader $fileUploader,
        TranslatorInterface $translator
    ) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
        $this->translator = $translator;
    }

    public function createSingleNotification($type, $referenceId, $user, $params){

        $notificationType = $this->em->getRepository('AppBundle:NotificationType')->findOneBy(array(
            "name" => $type,
        ));

        $notification = $this->em->getRepository('AppBundle:Notification')->findOneBy(array(
            "type" => $notificationType,
            "user" => $user,
            "referenceId" => $referenceId,
            "seen" => false
        ));

        $text = $this->translator->trans($notificationType->getTranslationKey(), $params);

        if (!$notification) {
            $notification = new Notification();
            $notification->setUser($user);
            $notification->setType($notificationType);
            $notification->setReferenceId($referenceId);
            $notification->setText($text);
        } else {
            $notification->setSeen(false);
        }

        $notification->setCreatedAt(new \DateTime());

        $this->em->persist($notification);
        $this->em->flush();

    }

    public function listingExpiryNotifications( Content $listing){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("SELLER_LISTING_EXPIRING", $listing->getCustomId(), $user, $parameters );
        }

    }

    public function listingExpiredNotifications( Content $listing){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("SELLER_LISTING_EXPIRED", $listing->getCustomId(), $user, $parameters );
        }

    }

    public function listingSoldOutNotifications( Content $listing){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("SELLER_LISTING_SOLD", $listing->getCustomId(), $user, $parameters );
        }

    }

    public function listingBidReceivedNotifications( Content $listing){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("SELLER_BID_RECEIVED", $listing->getCustomId(), $user, $parameters );
        }

    }

    public function listingBidAcceptedNotifications( Content $listing, User $user ){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName(),
            "%userFullName%" => $user->getFullName()
        );

        foreach ($company->getUsers() as $recipient){
            $this->createSingleNotification("SELLER_BID_ACCEPTED", $listing->getCustomId(), $recipient, $parameters );
        }

    }

    public function listingBidPlacedNotifications( Content $listing, User $user ){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName(),
            "%userFullName%" => $user->getFullName()
        );

        foreach ($company->getUsers() as $recipient){
            $this->createSingleNotification("BUYER_BID_PLACED", $listing->getCustomId(), $recipient, $parameters );
        }

    }

    public function listingBidClosedNotifications( Content $listing){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("SELLER_BID_CLOSED", $listing->getCustomId(), $user, $parameters );
        }

    }

    public function listingBidClosedBuyerNotifications( Content $listing, User $user){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName(),
            "%userFullName%" => $user->getFullName()
        );

        foreach ($company->getUsers() as $recipient){
            $this->createSingleNotification("BUYER_BID_CLOSED", $listing->getCustomId(), $recipient, $parameters );
        }

    }

    public function listingBidAcceptedBuyerNotifications( Content $listing){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("BUYER_BID_ACCEPTED", $listing->getCustomId(), $user, $parameters );
        }

    }

    public function listingBidDeclinedBuyerNotifications( Content $listing){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("BUYER_BID_DECLINED", $listing->getCustomId(), $user, $parameters );
        }

    }

    public function getNotifications(User $user){
        return $this->em->getRepository('AppBundle:Notification')->findBy(array(
            "user" => $user
        ), null, 10);
    }


    public function markNotificationAsVisited($notificationId) {
        $notification = $this->em->getRepository('AppBundle:Notification')->findOneBy(array(
            "id" => $notificationId
        ));

        $notification->setVisited(true);

        $this->em->persist($notification);
        $this->em->flush();
    }

    public function markNotificationAsSeen($user) {
        $notifications = $this->em->getRepository('AppBundle:Notification')->findBy(array(
            "user" => $user,
            "seen" => false
        ));

        if(!empty($notifications)) {
            foreach ($notifications as $notification){
                $notification->setSeen(true);
                $this->em->persist($notification);
            }
        }

        $this->em->flush();
    }
}

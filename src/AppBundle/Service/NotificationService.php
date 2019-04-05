<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 27-Mar-18
 * Time: 17:16
 */

namespace AppBundle\Service;

use AppBundle\Entity\Bid;
use AppBundle\Entity\Company;
use AppBundle\Entity\Content;
use AppBundle\Entity\NotifiableInterface;
use AppBundle\Entity\Notification;
use AppBundle\Entity\User;
use AppBundle\Doctrine\RandomIdGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Translation\TranslatorInterface;

class NotificationService
{

    private $em;

    private $idGenerator;

    private $fileUploader;

    private $translator;

    public function __construct(
        EntityManagerInterface $entityManager,
        RandomIdGenerator $idGenerator,
        FileUploader $fileUploader,
        TranslatorInterface $translator
    ) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
        $this->translator = $translator;
    }

    public function createSingleNotification($type, NotifiableInterface $referenceObject, User $user, $params ){

        $image = $referenceObject->getImage();
        $referenceId = $referenceObject->getCustomId();
        $sports = $referenceObject->getSports();


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
            $notification->setImage($image);
            $notification->setSports($sports);
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
            $this->createSingleNotification("SELLER_LISTING_EXPIRING", $listing, $user, $parameters );
        }

    }

    public function listingExpiredNotifications( Content $listing){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("SELLER_LISTING_EXPIRED", $listing, $user, $parameters );
        }

    }

    public function listingSoldOutNotifications( Content $listing){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("SELLER_LISTING_SOLD", $listing, $user, $parameters );
        }

    }

    public function listingBidReceivedNotifications( Content $listing){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("SELLER_BID_RECEIVED", $listing, $user, $parameters );
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
            $this->createSingleNotification("SELLER_BID_ACCEPTED", $listing, $recipient, $parameters );
        }

    }

    public function listingBidPlacedNotifications( Content $listing, User $user ){

        /* @var Company $company*/
        $company = $user->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName(),
            "%userFullName%" => $user->getFullName()
        );

        foreach ($company->getUsers() as $recipient){
            $this->createSingleNotification("BUYER_BID_PLACED", $listing, $recipient, $parameters );
        }

    }

    public function listingBidClosedNotifications( Content $listing){

        /* @var Company $company*/
        $company = $listing->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("SELLER_BID_CLOSED", $listing, $user, $parameters );
        }

    }

    public function listingBidClosedBuyerNotifications( Content $listing, User $user){

        /* @var Company $company*/
        $company = $user->getCompany();
        $parameters = array(
            "%listingName%" => $listing->getName(),
            "%userFullName%" => $user->getFullName()
        );

        foreach ($company->getUsers() as $recipient){
            $this->createSingleNotification("BUYER_BID_CLOSED", $listing, $recipient, $parameters );
        }

    }

    public function listingBidAcceptedBuyerNotifications( Content $listing, Bid $bid){

        /* @var Company $company*/
        $company = $bid->getBuyerCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("BUYER_BID_ACCEPTED", $listing, $user, $parameters );
        }

    }

    public function listingBidDeclinedBuyerNotifications( Content $listing, Bid $bid){

        /* @var Company $company*/
        $company = $bid->getBuyerCompany();
        $parameters = array(
            "%listingName%" => $listing->getName()
        );

        foreach ($company->getUsers() as $user){
            $this->createSingleNotification("BUYER_BID_DECLINED", $listing, $user, $parameters );
        }

    }

    public function setAllNotificationsVisited(User $user){
        $notifications = $this->em->getRepository('AppBundle:Notification')->findBy(array(
            "user" => $user,
        ));

        if(!empty($notifications)) {
            foreach ($notifications as $notification){
                $notification->setVisited(true);
                $this->em->persist($notification);
            }
        }

        $this->em->flush();
    }

    public function removeNotifications(User $user)
    {
        $notifications = $this->em->getRepository('AppBundle:Notification')->findBy(array(
            "user" => $user,
        ));

        if(!empty($notifications)) {
            foreach ($notifications as $notification){
                $this->em->remove($notification);
            }
        }

        $this->em->flush();
    }

    public function getNotifications(User $user){

        $listingRepository = $this->em->getRepository("AppBundle:Content");
        $notifications = $this->em->getRepository('AppBundle:Notification')->findBy(array(
            "user" => $user,
        ), array(
            "createdAt" => "DESC"
        ));

        /**
         * Backwards compatibility for notification images
         */
        foreach ($notifications as $notification){
            if ( $notification->getType()->getName() != "MESSAGE" && $notification->getImage() == null){
                $listing = $listingRepository->findOneBy(array("customId" => $notification->getReferenceId()));
                if ($listing != null) {
                    $notification->setImage($listing->getImage());
                    $notification->setSports($listing->getSports());
                }
            }
        }

        return $notifications;
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

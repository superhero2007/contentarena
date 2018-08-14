<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 27-Mar-18
 * Time: 17:16
 */

namespace AppBundle\Service;

use AppBundle\Entity\Notification;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use AppBundle\Doctrine\RandomIdGenerator;

class NotificationService
{

    private $em;

    private $idGenerator;

    private $fileUploader;

    public function __construct(EntityManager $entityManager, RandomIdGenerator $idGenerator, FileUploader $fileUploader) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
    }

    public function createNotification($type, $referenceId, $user, $text){

        $notificationType = $this->em->getRepository('AppBundle:NotificationType')->findOneBy(array(
            "name" => $type,
        ));

        /* @var Notification $notification*/
        $notification = new Notification();
        $notification->setUser($user);
        $notification->setType($notificationType);
        $notification->setReferenceId($referenceId);
        $notification->setText($text);

        $this->em->persist($notification);
        $this->em->flush();

    }

    public function getNotifications(User $user){
        return $this->em->getRepository('AppBundle:Notification')->findBy(array(
            "user" => $user,
            "seen" => false
        ));
    }



}

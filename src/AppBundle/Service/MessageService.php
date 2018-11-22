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
use AppBundle\Entity\Message;
use AppBundle\Entity\Thread;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Bid;
use AppBundle\Doctrine\RandomIdGenerator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\DateTime;

class MessageService
{

    private $em;

    private $idGenerator;

    private $fileUploader;

    private $notificationService;

    private $emailService;

    public function __construct(
        EntityManager $entityManager,
        RandomIdGenerator $idGenerator,
        NotificationService $notificationService,
        EmailService $emailService,
        FileUploader $fileUploader
    ) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
        $this->notificationService = $notificationService;
        $this->emailService = $emailService;
    }

    public function getAllThreads(Request $request, User $user){
        /* @var Company $ownCompany */
        $ownCompany = $user->getCompany();
        $threads = $this->em->getRepository('AppBundle:Thread')->getAllThreads($ownCompany);

        foreach ($threads as $thread){
            /* @var Thread $thread */
            /* @var Message[]  $lastMessage */
            $lastMessage = $this->em->getRepository('AppBundle:Message')->getThreadLastMessage($thread);
            $oppositeParty = ($ownCompany->getId() == $thread->getBuyerCompany()->getId()) ? $thread->getOwnerCompany() :$thread->getBuyerCompany();
            $thread->setOppositeParty($oppositeParty);


            if ( $lastMessage != null && count($lastMessage) > 0 ){
                $lastMessageContent = ($lastMessage[0]->isAttachment()) ? $lastMessage[0]->getFileName() : $lastMessage[0]->getContent();
                $thread->setLastMessageContent($lastMessageContent);
                $thread->setLastMessageDate($lastMessage[0]->getCreatedAt());
                $thread->setLastMessageUser($lastMessage[0]->getSender());
                $hasUnreadMessagesForCurrentUser = !$lastMessage[0]->readBy($user);
                $thread->setUnreadMessagesForCurrentUser($hasUnreadMessagesForCurrentUser);
            } else if ($thread->getCreatedAt() != null) {
                $thread->setLastMessageDate($thread->getCreatedAt());
            } else {
                $thread->setLastMessageDate(new \DateTime());
            }



        }

        usort($threads, array($this, "sortByLastMessage"));

        return $threads ;
    }

    public function getUnreadThreads(Request $request, User $user){
        /* @var Company $ownCompany */
        $ownCompany = $user->getCompany();
        $threads = $this->em->getRepository('AppBundle:Thread')->getAllThreads($ownCompany);
        $unreadThreads = [];

        foreach ($threads as $thread){
            /* @var Thread $thread */
            /* @var Message[]  $lastMessage */
            $lastMessage = $this->em->getRepository('AppBundle:Message')->getThreadLastMessage($thread);
            $oppositeParty = ($ownCompany->getId() == $thread->getBuyerCompany()->getId()) ? $thread->getOwnerCompany() :$thread->getBuyerCompany();
            $thread->setOppositeParty($oppositeParty);


            if ( $lastMessage != null && count($lastMessage) > 0 ){
                $lastMessageContent = ($lastMessage[0]->isAttachment()) ? $lastMessage[0]->getFileName() : $lastMessage[0]->getContent();
                $thread->setLastMessageContent($lastMessageContent);
                $thread->setLastMessageDate($lastMessage[0]->getCreatedAt());
                $thread->setLastMessageUser($lastMessage[0]->getSender());
                $hasUnreadMessagesForCurrentUser = !$lastMessage[0]->readBy($user);
                $thread->setUnreadMessagesForCurrentUser($hasUnreadMessagesForCurrentUser);
                if ($hasUnreadMessagesForCurrentUser) $unreadThreads[] = $thread;
            }

        }

        usort($unreadThreads, array($this, "sortByLastMessage"));

        return $unreadThreads ;
    }

    public function sortByLastMessage(Thread $a, Thread $b){
        return $a->getLastMessageDate() < $b->getLastMessageDate();
    }

    public function getThread($request, $user){
        $thread = $this->em->getRepository('AppBundle:Thread')->findOneBy(array("customId" => $request->get("customId")));
        $messages = $this->em->getRepository('AppBundle:Message')->getThreadMessages($thread);

        if (count($messages) > 0 ){

            $lastMessageUnread = true;
            $lastMessage = end($messages);
            /* @var Message $lastMessage*/
            $readers = $lastMessage->getReaders();

            foreach ($readers as $reader){
                if ($reader->getId() == $user->getId() ) $lastMessageUnread = false;
            }

            if ($lastMessageUnread){
                $readers[] = $user;
                $lastMessage->setReaders($readers);
                $this->em->persist($lastMessage);
                $this->em->flush();
            }
        }

        return $messages;
    }



    public function getThreadByListingAndSeller(Content $content, User $user, Company $company){
        return $this->em->getRepository('AppBundle:Thread')->findOneBy(array(
            "listing" => $content,
            "buyerCompany" => $user->getCompany(),
            "ownerCompany" => $company,
        ));
    }

    public function getThreadByListingAndBuyer(Content $content, User $user, Company $company){
        return $this->em->getRepository('AppBundle:Thread')->findOneBy(array(
            "listing" => $content,
            "buyerCompany" => $user->getCompany(),
            "ownerCompany" => $company
        ));
    }

    public function getThreadByListing(Content $content, Company $buyerCompany, Company $ownerCompany){
        return $this->em->getRepository('AppBundle:Thread')->findOneBy(array(
            "listing" => $content,
            "buyerCompany" => $buyerCompany,
            "ownerCompany" => $ownerCompany
        ));
    }

    /**
     * @param $request
     * @param User $user
     * @return Message
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Exception
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendMessage($request, User $user){

        $recipient = $request->get('recipient');
        $role = $request->get('role');

        if( isset( $recipient )){
            $company = $this->em->getRepository('AppBundle:Company')->find($recipient);
        }
        $content = $this->em->getRepository('AppBundle:Content')->find($request->get('listing'));
        $threadId = $request->get('thread');

        if ( isset($threadId) ) {
            $thread = $this->em->getRepository('AppBundle:Thread')->find($threadId);
        } else{

            if ( $role && $role == "SELLER"){
                $thread = $this->getThreadByListingAndSeller($content, $user, $company);
            } else {
                $thread = $this->getThreadByListingAndBuyer($content, $user, $company);
            }
        }
        if ( $thread == null ){
            $thread = new Thread();
            $ownerCompany = $content->getCompany();

            if ($ownerCompany->getId() == $company->getId()){
                $company = $user->getCompany();
            }

            $customId = $this->idGenerator->generate($content);
            $thread->setCustomId($customId);
            $thread->setCreatedAt(new \DateTime());
            $thread->setBuyerCompany($company);
            $thread->setOwnerCompany($ownerCompany);
            $thread->setUser($user);
            $thread->setListing($content);
            $this->em->persist($thread);
            $this->em->flush();
        }

        /**
         * Send notification to involved users
         */

        $notificationMessage = "New message: ".$content->getName();

        foreach ($thread->getBuyerCompany()->getUsers() as $companyUser ){
            if ( $companyUser->getId() != $user->getId() ){
                $this->notificationService->createSingleNotification("MESSAGE", $thread->getCustomId(), $companyUser, $notificationMessage );
            }
        }
        foreach ($thread->getOwnerCompany()->getUsers() as $companyUser ){
            if ( $companyUser->getId() != $user->getId() ){
                $this->notificationService->createSingleNotification("MESSAGE", $thread->getCustomId(), $companyUser, $notificationMessage );
            }
        }


        $recipientCompany = ( $thread->getBuyerCompany()->getId() == $user->getCompany()->getId()) ? $thread->getOwnerCompany() : $thread->getBuyerCompany() ;

        $now = new \DateTime();

        if ($thread->getLastNotificationDate() == null || date_diff($now, $thread->getLastNotificationDate())->i > 10){
            $this->emailService->newMessage($content, $thread, $user->getCompany(), $recipientCompany );
            $thread->setLastNotificationDate($now);
            $this->em->persist($thread);
            $this->em->flush();
        }


        $message = new Message();
        $createdAt = new \DateTime();
        $message->setCreatedAt($createdAt);
        $message->setContent($request->get('content'));
        $message->setThread($thread);
        $message->setSender($user);
        $message->setAttachment($request->get("attachment"));
        $message->setFileName($request->get("fileName"));
        $message->setFileSize($request->get("fileSize"));
        $message->setFileExtension($request->get("fileExtension"));
        $this->em->persist($message);
        $this->em->flush();
        return $message;
    }

    public function sendMessageAsOwner(Content $content, User $recipient, $messageContent, User $user){

        $ownerCompany = $content->getCompany();
        $buyerCompany = $recipient->getCompany();
        $thread = $this->getThreadByListing($content, $buyerCompany, $content->getCompany());

        if ( $thread == null ){
            $thread = new Thread();
            $customId = $this->idGenerator->generate($content);
            $thread->setCustomId($customId);
            $thread->setBuyerCompany($buyerCompany);
            $thread->setOwnerCompany($ownerCompany);
            $thread->setCreatedAt(new \DateTime());
            $thread->setUser($user);
            $thread->setListing($content);
            $this->em->persist($thread);
            $this->em->flush();
        }

        /**
         * Send notification to involved users
         */

        $notificationMessage = "New message: ".$content->getName();

        foreach ($thread->getBuyerCompany()->getUsers() as $companyUser ){
            if ( $companyUser->getId() != $user->getId() ){
                $this->notificationService->createSingleNotification("MESSAGE", $thread->getCustomId(), $companyUser, $notificationMessage );
            }
        }
        foreach ($thread->getOwnerCompany()->getUsers() as $companyUser ){
            if ( $companyUser->getId() != $user->getId() ){
                $this->notificationService->createSingleNotification("MESSAGE", $thread->getCustomId(), $companyUser, $notificationMessage );
            }
        }


        $message = new Message();
        $createdAt = new \DateTime();
        $message->setCreatedAt($createdAt);
        $message->setContent($messageContent);
        $message->setThread($thread);
        $message->setSender($user);
        $this->em->persist($message);
        $this->em->flush();
        return $message;
    }

    public function createThread(Content $content, User $user) {
        $thread = new Thread();
        $ownerCompany = $content->getCompany();
        $buyerCompany = $user->getCompany();
        $customId = $this->idGenerator->generate($content);
        $thread->setCustomId($customId);
        $thread->setCreatedAt(new \DateTime());
        $thread->setBuyerCompany($buyerCompany);
        $thread->setOwnerCompany($ownerCompany);
        $thread->setUser($user);
        $thread->setListing($content);
        $this->em->persist($thread);
        $this->em->flush();

        return $thread;
    }
}

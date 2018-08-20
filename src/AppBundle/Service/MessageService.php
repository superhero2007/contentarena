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

    public function __construct(
        EntityManager $entityManager,
        RandomIdGenerator $idGenerator,
        NotificationService $notificationService,
        FileUploader $fileUploader
    ) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
        $this->notificationService = $notificationService;
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
                $thread->setLastMessageContent($lastMessage[0]->getContent());
                $thread->setLastMessageDate($lastMessage[0]->getCreatedAt());
                $thread->setLastMessageUser($lastMessage[0]->getSender());
            }
        }

        return $threads;
    }

    public function getThread($request){
        $thread = $this->em->getRepository('AppBundle:Thread')->findOneBy(array("customId" => $request->get("customId")));
        return $this->em->getRepository('AppBundle:Message')->getThreadMessages($thread);
    }

    public function getThreadByListingAndSeller(Content $content, User $user, Company $company){
        return $this->em->getRepository('AppBundle:Thread')->findOneBy(array(
            "listing" => $content,
            "ownerCompany" => $user->getCompany(),
            "buyerCompany" => $company
        ));
    }

    public function getThreadByListingAndBuyer(Content $content, User $user, Company $company){
        return $this->em->getRepository('AppBundle:Thread')->findOneBy(array(
            "listing" => $content,
            "buyerCompany" => $user->getCompany(),
            "ownerCompany" => $company
        ));
    }

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

        foreach ($thread->getBuyerCompany()->getUsers() as $companyUser ){
            if ( $companyUser->getId() != $user->getId() ){
                $this->notificationService->createNotification("MESSAGE", $thread->getId(), $companyUser, "Unread meessages" );
            }
        }
        foreach ($thread->getOwnerCompany()->getUsers() as $companyUser ){
            if ( $companyUser->getId() != $user->getId() ){
                $this->notificationService->createNotification("MESSAGE", $thread->getId(), $companyUser, "Unread meessages" );
            }
        }


        $message = new Message();
        $createdAt = new \DateTime();
        $message->setCreatedAt($createdAt);
        $message->setContent($request->get('content'));
        $message->setThread($thread);
        $message->setSender($user);

        $this->em->persist($message);
        $this->em->flush();
        return $message;
    }


}

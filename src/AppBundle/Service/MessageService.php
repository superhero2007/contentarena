<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 27-Mar-18
 * Time: 17:16
 */

namespace AppBundle\Service;

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

    public function __construct(EntityManager $entityManager, RandomIdGenerator $idGenerator, FileUploader $fileUploader) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
    }

    public function getAllThreads(Request $request, User $user){
        $threads = $this->em->getRepository('AppBundle:Thread')->getAllThreads($user->getCompany());

        foreach ($threads as $thread){
            /* @var Thread $thread */
            /* @var Message[]  $lastMessage */
            $lastMessage = $this->em->getRepository('AppBundle:Message')->getThreadLastMessage($thread);

            if ( $lastMessage != null && count($lastMessage) > 0 ){
                $thread->setLastMessageContent($lastMessage[0]->getContent());
                $thread->setLastMessageDate($lastMessage[0]->getCreatedAt());
            }

        }

        return $threads;
    }

    public function getThread($request){
        $thread = $this->em->getRepository('AppBundle:Thread')->findOneBy(array("customId" => $request->get("customId")));
        return $this->em->getRepository('AppBundle:Message')->getThreadMessages($thread);
    }

    public function getThreadByListingAndUser(Content $content, User $user){
        return $this->em->getRepository('AppBundle:Thread')->findOneBy(array("listing" => $content, "buyerCompany" => $user->getCompany()));
    }

    public function sendMessage($request, User $user){

        $recipient = $request->get('recipient');

        if( isset( $recipient )){
            $company = $this->em->getRepository('AppBundle:Company')->find($recipient);
        }
        $content = $this->em->getRepository('AppBundle:Content')->find($request->get('listing'));
        $threadId = $request->get('thread');

        if ( isset($threadId) ) {
            $thread = $this->em->getRepository('AppBundle:Thread')->find($threadId);
        } else{
            $thread = $this->getThreadByListingAndUser($content, $user);
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

    public function asdsaveBidsData($request,$user){


        $content = $this->em->getRepository('AppBundle:Content')->find($request->get('content'));
        $type = $this->em->getRepository('AppBundle:BidType')->findOneBy(array("name" =>$request->get('salesMethod')));
        $signature = $request->get('signature');
        $salesPackage = $this->em->getRepository('AppBundle:SalesPackage')->find($request->get('salesPackage'));
        if ($request->get('salesMethod') == "FIXED" ) {
            $status = $this->em->getRepository('AppBundle:BidStatus')->find(2);
        } else {
            $status = $this->em->getRepository('AppBundle:BidStatus')->find(1);
        }

        $exclusive = false;
        foreach ($content->getSelectedRightsBySuperRight() as $val)
        {
            if( $val['exclusive'] ) {
                $exclusive = true;
            }
        }

        $bid = $this->em->getRepository('AppBundle:Bid')->findOneBy(array(
            "content" =>$content,
            "salesPackage" => $salesPackage
        ));

        if ( $bid == null || $bid->getStatus() != $status) {
            $bid = new Bid();
            $customId = $this->idGenerator->generate($content);
            $createdAt = new \DateTime();
            $bid->setCustomId($customId);
            $bid->setCreatedAt($createdAt);
        }

        if ( isset( $signature ) ) {
            $fileName = "signature_".md5(uniqid()).'.jpg';
            $savedSignature = $this->fileUploader->saveImage($signature, $fileName );
            $bid->setSignature($savedSignature);
        }

        $updatedAt = new \DateTime();

        $bid->setType($type);
        $bid->setStatus($status);
        $bid->setContent($content);
        $bid->setSalesPackage($salesPackage);
        $bid->setBuyerUser($user);
        $bid->setAmount($request->get('amount'));
        $bid->setTotalFee($request->get('totalFee'));
        $bid->setUpdatedAt($updatedAt);
        $this->em->persist($bid);
        if ($exclusive && $status->getName() == "APPROVED"){
            $salesPackage->setSold(true);
            $this->em->persist($salesPackage);
        }
        $this->em->flush();
        return true;
    }

    public function asdacceptBid($request){

        /**
         * @var $bid Bid
         */
        $bid = $this->em->getRepository('AppBundle:Bid')->find($request->get('id'));
        $signature = $request->get('signature');
        $salesPackageId = $bid->getSalesPackage()->getId();
        $listingId = $bid->getContent()->getId();
        $listing = $this->em->getRepository('AppBundle:Content')->find($listingId);
        $salesPackage = $this->em->getRepository('AppBundle:SalesPackage')->find($salesPackageId);
        //$listing = $bid->getContent();

        $exclusive = false;
        foreach ($listing->getSelectedRightsBySuperRight() as $val)
        {
            if( $val['exclusive'] ) {
                $exclusive = true;
            }
        }

        if ( isset( $signature ) ) {
            $fileName = "signature_".md5(uniqid()).'.jpg';
            $savedSignature = $this->fileUploader->saveImage($signature, $fileName );
            $bid->setSellerSignature($savedSignature);
        }

        $updatedAt = new \DateTime();

        $bid->setStatus($this->em->getRepository('AppBundle:BidStatus')->findOneBy(array("name"=>"APPROVED")));
        $bid->setUpdatedAt($updatedAt);
        $this->em->persist($bid);
        if ($exclusive){
            $salesPackage->setSold(true);
            $this->em->persist($salesPackage);
        }
        $this->em->flush();
        return true;
    }

    public function rejectBid($request){

        /**
         * @var $bid Bid
         */
        $bid = $this->em->getRepository('AppBundle:Bid')->find($request->get('id'));
        $message = $request->get('message');
        $updatedAt = new \DateTime();

        if ( isset($message) ) {
            $bid->setMessage($message);
        }

        $bid->setStatus($this->em->getRepository('AppBundle:BidStatus')->findOneBy(array("name"=>"REJECTED")));
        $bid->setUpdatedAt($updatedAt);
        $this->em->persist($bid);
        $this->em->flush();
        return true;
    }

    public function removeBid($request, User $user){

        /**
         * @var $bid Bid
         */
        $bid = $this->em->getRepository('AppBundle:Bid')->find($request->get('id'));

        /* @var $buyerUser User */
        $buyerUser = $bid->getBuyerUser();
        if ( $buyerUser->getId() == $user->getId()  ){
            $this->em->remove($bid);
            $this->em->flush();
            return true;
        }

        return false;
    }

}
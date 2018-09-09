<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 27-Mar-18
 * Time: 17:16
 */

namespace AppBundle\Service;

use AppBundle\Entity\Content;
use AppBundle\Entity\SoldListing;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Bid;
use AppBundle\Doctrine\RandomIdGenerator;
use Symfony\Component\Validator\Constraints\DateTime;

class BidService
{

    private $em;

    private $idGenerator;

    private $fileUploader;

    public function __construct(EntityManager $entityManager, RandomIdGenerator $idGenerator, FileUploader $fileUploader) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
    }

    public function getClosedDeals($request){

    }

    public function getPendingBidsByContent($listing){
        return $this->em->getRepository('AppBundle:Bid')->getPendingBidsByContent($listing);
    }

    public function getAllBidsByContent($listing){
        return $this->em->getRepository('AppBundle:Bid')->getAllBidsByContent($listing);
    }

    public function getAllBidsBySalesBundle($salesBundle){
        return $this->em->getRepository('AppBundle:Bid')->getAllBidsBySalesBundle($salesBundle);
    }

    public function saveBidsData($request,$user){

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
            "salesPackage" => $salesPackage,
            "buyerUser" => $user
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

        $amount = ( $request->get('amount') != null )? $request->get('amount') : $request->get('totalFee');

        $bid->setType($type);
        $bid->setStatus($status);
        $bid->setContent($content);
        $bid->setSalesPackage($salesPackage);
        $bid->setBuyerUser($user);
        $bid->setAmount($amount);
        $bid->setTotalFee($request->get('totalFee'));
        $bid->setUpdatedAt($updatedAt);

        if ( $status->getName() == "APPROVED" ){
            $soldListing = clone ($content);
            $soldListing->setCustomId($this->idGenerator->generate($soldListing));
            $soldListing->setStatus($this->em->getRepository("AppBundle:ListingStatus")->findOneBy(array("name"=>"SOLD_COPY")));
            $this->em->persist($soldListing);
            $bid->setSoldListing($soldListing);
        }

        $this->em->persist($bid);
        if ($exclusive && $status->getName() == "APPROVED"){
            $salesPackage->setSold(true);
            $this->em->persist($salesPackage);
        }

        $this->em->flush();
        return $bid;
    }

    public function acceptBid($request){

        /**
         * @var $bid Bid
         */
        $bid = $this->em->getRepository('AppBundle:Bid')->find($request->get('id'));
        $rejectedStatus = $this->em->getRepository('AppBundle:BidStatus')->findOneBy(array("name"=>"REJECTED"));
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
        $soldListing = clone ($listing);
        $soldListing->setCustomId($this->idGenerator->generate($soldListing));
        $soldListing->setStatus($this->em->getRepository("AppBundle:ListingStatus")->findOneBy(array("name"=>"SOLD_COPY")));
        $this->em->persist($soldListing);
        $bid->setSoldListing($soldListing);
        $this->em->persist($bid);
        $this->em->flush();
        if ($exclusive){
            $salesPackage->setSold(true);
            $pendingBids = $this->getPendingBidsByContent($listing);

            foreach ($pendingBids as $pendingBid){
                /* @var Bid $pendingBid*/
                if ($pendingBid->getStatus()->getName() == "PENDING"){
                    $pendingBid->setStatus($rejectedStatus);
                    $this->em->persist($pendingBid);
                }
            }

            $this->em->persist($salesPackage);
            $this->em->flush();
        }

        return $bid;
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
        $salesBundle = $bid->getSalesPackage();
        return $salesBundle;
    }

    public function removeBid($request, User $user){

        /**
         * @var $bid Bid
         */
        $bid = $this->em->getRepository('AppBundle:Bid')->find($request->get('id'));

        /* @var $buyerUser User */
        $buyerUser = $bid->getBuyerUser();
        if ( $buyerUser->getId() == $user->getId() || $bid->getContent()->isOwner($user) ){
            $this->em->remove($bid);
            $this->em->flush();
            return true;
        }

        return false;
    }

    public function getBidById($id) {
        $bid = $this->em->getRepository('AppBundle:Bid')->find($id);
        return $bid;
    }
}
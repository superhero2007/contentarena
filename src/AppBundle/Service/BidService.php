<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 27-Mar-18
 * Time: 17:16
 */

namespace AppBundle\Service;

use AppBundle\Entity\CompanySnapshot;
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

    private $messageService;

    public function __construct(EntityManager $entityManager, RandomIdGenerator $idGenerator, FileUploader $fileUploader, MessageService $messageService) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
        $this->messageService = $messageService;
    }

    public function getClosedDeals($request){

    }

    public function getPendingBidsByContent($listing){
        return $this->em->getRepository('AppBundle:Bid')->getPendingBidsByContent($listing);
    }

    public function getAllBidsByContent($listing){
        return $this->em->getRepository('AppBundle:Bid')->getAllBidsByContent($listing);
    }

    public function getAllBidsByContentAndUser($listing, $company){
        return $this->em->getRepository('AppBundle:Bid')->getAllBidsByContentAndUser($listing, $company);
    }

    public function getAllBidsBySalesBundle($salesBundle){
        return $this->em->getRepository('AppBundle:Bid')->getAllBidsBySalesBundle($salesBundle);
    }

    public function getClosedDealsBySalesBundle($salesBundle){
        return $this->em->getRepository('AppBundle:Bid')->getClosedDealsBySalesBundle($salesBundle);
    }

    public function saveBidsData($request,User $user){

        $content = $this->em->getRepository('AppBundle:Content')->find($request->get('content'));
        $type = $this->em->getRepository('AppBundle:BidType')->findOneBy(array("name" =>$request->get('salesMethod')));
        $signature = $request->get('signature');
        $signatureName = $request->get('signatureName');
        $signaturePosition = $request->get('signaturePosition');
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


        try {
            if ( $request->get("company") != null ){
                $this->saveCompany($request->get("company"));
            }
        }
        catch (\Exception $e){}

        $bid = $this->em->getRepository('AppBundle:Bid')->findOneBy(array(
            "content" =>$content,
            "salesPackage" => $salesPackage,
            "buyerCompany" => $user->getCompany()
        ));
        $buyerCompanySnapshot = new CompanySnapshot($user->getCompany());
        $sellerCompanySnapshot = new CompanySnapshot($content->getCompany());

        $updatedAt = new \DateTime();

        if ( $bid == null) {
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
            $bid->setBuyerSignatureDate($updatedAt);
        }

        if ( isset( $signatureName ) ) {
            $bid->setSignatureName($signatureName);
        }

        if ( isset( $signaturePosition ) ) {
            $bid->setSignaturePosition($signaturePosition);
        }

        $amount = ( $request->get('amount') != null )? $request->get('amount') : $request->get('totalFee');

        $bid->setType($type);
        $bid->setStatus($status);
        $bid->setContent($content);
        $bid->setSalesPackage($salesPackage);
        $bid->setBuyerUser($user);
        $bid->setBuyerCompany($user->getCompany());
        $bid->setAmount($amount);
        $bid->setTotalFee($request->get('totalFee'));
        $bid->setUpdatedAt($updatedAt);
        $bid->setBuyerCompanySnapshot($buyerCompanySnapshot);
        $bid->setSellerCompanySnapshot($sellerCompanySnapshot);

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
        $signatureName = $request->get('signatureName');
        $signaturePosition = $request->get('signaturePosition');
        $salesPackageId = $bid->getSalesPackage()->getId();
        $listingId = $bid->getContent()->getId();
        $listing = $this->em->getRepository('AppBundle:Content')->find($listingId);
        $salesPackage = $this->em->getRepository('AppBundle:SalesPackage')->find($salesPackageId);
        //$listing = $bid->getContent();
        $updatedAt = new \DateTime();
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
            $bid->setSellerSignatureDate($updatedAt);
        }

        if ( isset( $signatureName ) ) {
            $bid->setSellerSignatureName($signatureName);
        }

        if ( isset( $signaturePosition ) ) {
            $bid->setSellerSignaturePosition($signaturePosition);
        }


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

    public function rejectBid($request, User $user){

        /**
         * @var $bid Bid
         * @var Content $listing
         */
        $bid = $this->em->getRepository('AppBundle:Bid')->find($request->get('id'));
        $listing = $bid->getContent();
        $message = $request->get('message');
        $updatedAt = new \DateTime();

        if ( isset($message) && $message != null && $message != "" ) {
            $bid->setMessage($message);
            try{
                $this->messageService->sendMessageAsOwner($listing, $bid->getBuyerUser(), $message, $user);
            }
            catch (\Exception $e){}
        }

        $bid->setStatus($this->em->getRepository('AppBundle:BidStatus')->findOneBy(array("name"=>"REJECTED")));
        $bid->setUpdatedAt($updatedAt);
        $this->em->persist($bid);
        $this->em->flush();
        return $bid;
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

    private function saveCompany($data){
        if ( isset($data['id']) ) {

            $company = $this->em
                ->getRepository('AppBundle:Company')
                ->findOneBy(array('id' => $data['id']));


            if ( isset($data['vat']) ) $company->setVat($data['vat']);
            if ( isset($data['zip']) ) $company->setZip($data['zip']);
            if ( isset($data['registrationNumber']) ) $company->setRegistrationNumber($data['registrationNumber']);
            if ( isset($data['address']) ) $company->setAddress($data['address']);
            if ( isset($data['address2']) ) $company->setAddress2($data['address2']);
            if ( isset($data['city']) ) $company->setCity($data['city']);
            if ( isset($data['legalName']) ) $company->setLegalName($data['legalName']);
            if ( isset($data['country']) && isset($data['country']['name'])) $company->setCountry($this->getCountry($data['country']['name']));

            $this->em->persist($company);
        }


        return $company;
    }

    private function getCountry($country){

        $country =  $this->em
            ->getRepository('AppBundle:Country')
            ->findOneBy(array('name' => $country));

        return $country;
    }
}
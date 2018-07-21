<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 27-Mar-18
 * Time: 17:16
 */

namespace AppBundle\Service;


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

}
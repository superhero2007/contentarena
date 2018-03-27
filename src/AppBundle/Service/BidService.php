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

class BidService
{

    private $em;

    private $idGenerator;

    public function __construct(EntityManager $entityManager, RandomIdGenerator $idGenerator){
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
    }

    public function saveBidsData($request,$user){

        $data = json_decode($request->request->get('content-data'));
        $company = $user->getCompany();


        /**
         * Saving new data into Bid entity
         */

        foreach ($data as $item) {

            $bid = new Bid();

            $content = $this->em->getRepository('AppBundle:Content')->find($request->request->get('content-id'));

            $currency = $this->em->getRepository('AppBundle:Currency')->find($item->currency);
            $type = $this->em->getRepository('AppBundle:BidType')->find($item->pricingMethod);
            $countries = $this->em->getRepository('AppBundle:Country')->findCountriesByIds($item->country);
            if ($item->pricingMethod == 3) {
                $status = $this->em->getRepository('AppBundle:BidStatus')->find(2);
            } else {
                $status = $this->em->getRepository('AppBundle:BidStatus')->find(1);
            }

            $customId = $this->idGenerator->generate($content);

            $bid->setType($type);
            $bid->setStatus($status);
            $bid->setContent($content);
            $bid->setCurrency($currency);
            $bid->setBuyerUser($user);
            $bid->setAmount($item->amount);
            $bid->setCompany($company);
            $bid->setCountries($countries);
            $bid->setCustomId($customId);
            $this->em->persist($bid);
        }

        $this->em->flush();
        return true;
    }

}
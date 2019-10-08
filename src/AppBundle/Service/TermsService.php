<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

use AppBundle\Entity\Bid;
use AppBundle\Entity\BidDefinitions;
use AppBundle\Entity\BidLicenseTermItem;
use AppBundle\Entity\Company;
use AppBundle\Entity\CompanyDefinitions;
use AppBundle\Entity\CompanyLicenseTermItem;
use AppBundle\Entity\Property;
use AppBundle\Entity\PropertyDefinitions;
use AppBundle\Entity\PropertyLicenseTermItem;
use Doctrine\ORM\EntityManagerInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use AppBundle\Doctrine\RandomIdGenerator;

class TermsService
{

    private $em;

    private $idGenerator;

    private $fileUploader;

    protected $fosUserManager;

    public function __construct(EntityManagerInterface $entityManager, RandomIdGenerator $idGenerator, FileUploader $fileUploader, UserManagerInterface $fosUserManager) {
        $this->em = $entityManager;
        $this->idGenerator = $idGenerator;
        $this->fileUploader = $fileUploader;
        $this->fosUserManager = $fosUserManager;
    }

    public function getSourceTerms()
    {
        $terms = $this->em
            ->getRepository('AppBundle:SourceLicenseTerm')
            ->findAll();

        $termItemsRepo = $this->em->getRepository('AppBundle:SourceLicenseTermItem');

        foreach ( $terms as $term){
            $items = $termItemsRepo->findBy(array('term' => $term));
            $term->setItems($items);
        }

        return $terms;
    }

    public function getCompanyTerms(Company $company)
    {
        $terms = $this->em
            ->getRepository('AppBundle:SourceLicenseTerm')
            ->getSortedTerms();

        $companyTermItemsRepo = $this->em->getRepository('AppBundle:CompanyLicenseTermItem');
        $companyTermItems = $companyTermItemsRepo->findBy(array('company' => $company));

        if ( count($companyTermItems) == 0 ) $this->restoreTermItems($company);

        foreach ( $terms as $term){
            $items = $companyTermItemsRepo->findBy(array('term' => $term, 'company' => $company));
            $term->setItems($items);
        }

        return $terms;
    }

    public function storeBidDefinitions(Bid $bid, Company $company){
        $companyRepo = $this->em->getRepository('AppBundle:CompanyDefinitions');
        $bidRepo = $this->em->getRepository('AppBundle:BidDefinitions');
        $companyItems = $companyRepo->findBy(array(
            'company' => $company
        ));

        foreach ( $companyItems as $sourceItem){
            $criteria= array(
                'name' => $sourceItem->getName(),
                'bid' => $bid
            );
            /* @var BidDefinitions $bidItem */
            $bidItem = $bidRepo->findOneBy($criteria);

            if ($bidItem == null) $bidItem = new BidDefinitions();
            $bidItem->setName($sourceItem->getName());
            $bidItem->setPosition($sourceItem->getPosition());
            $bidItem->setContent($sourceItem->getContent());
            $bidItem->setBid($bid);
            $this->em->persist($bidItem);
        }

        $this->em->flush();
    }

    public function storeBidTermItems(Bid $bid, Company $company){
        $companyRepo = $this->em->getRepository('AppBundle:CompanyLicenseTermItem');
        $bidRepo = $this->em->getRepository('AppBundle:BidLicenseTermItem');
        $companyItems = $companyRepo->findBy(array(
            'company' => $company
        ));

        foreach ( $companyItems as $sourceItem){
            $criteria= array(
                'term' => $sourceItem->getTerm(),
                'bid' => $bid
            );
            /* @var BidLicenseTermItem $bidItem */
            $bidItem = $bidRepo->findOneBy($criteria);

            if ($bidItem == null) $bidItem = new BidLicenseTermItem();
            $bidItem->setPosition($sourceItem->getPosition());
            $bidItem->setContent($sourceItem->getContent());
            $bidItem->setBid($bid);
            $bidItem->setTerm($sourceItem->getTerm());
            $this->em->persist($bidItem);
        }

        $this->em->flush();
    }

    public function getBidDefinitions(Bid $bid, Company $company){
        $bidRepo = $this->em->getRepository('AppBundle:BidDefinitions');
        $bidDefinitions = $bidRepo->findBy(array(
            'bid' => $bid
        ));

        if (count($bidDefinitions) > 0) return $bidDefinitions;

        $this->storeBidDefinitions($bid, $company);

        return $bidRepo->findBy(array(
            'bid' => $bid
        ));
    }

    public function getBidTerms(Bid $bid, Company $company)
    {
        $terms = $this->em
            ->getRepository('AppBundle:SourceLicenseTerm')
            ->findAll();

        $bidTermItemsRepo = $this->em->getRepository('AppBundle:BidLicenseTermItem');
        $bidTermItems = $bidTermItemsRepo->findBy(array('bid' => $bid));

        if ( count($bidTermItems) == 0 ) $this->storeBidTermItems($bid, $company);

        foreach ( $terms as $term){
            $items = $bidTermItemsRepo->findBy(array('term' => $term, 'bid' => $bid));
            $term->setItems($items);
        }

        return $terms;
    }

    /**
     * @param Company $company
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function restoreTermItems(Company $company)
    {
        $sourceTermItemsRepo = $this->em->getRepository('AppBundle:SourceLicenseTermItem');
        $companyTermItemsRepo = $this->em->getRepository('AppBundle:CompanyLicenseTermItem');

        $companyItems = $companyTermItemsRepo->findBy(array(
            'company' => $company
        ));

        foreach ($companyItems as $companyItem ){
            $this->em->remove($companyItem);
        }

        $this->em->flush();

        $sourceTermItems = $sourceTermItemsRepo->findAll();

        foreach ( $sourceTermItems as $sourceItem){
            $criteria= array(
                'term' => $sourceItem->getTerm(),
                'position' => $sourceItem->getPosition(),
                'company' => $company
            );
            $companyItem = $companyTermItemsRepo->findOneBy($criteria);

            if ($companyItem == null) $companyItem = new CompanyLicenseTermItem();
            $companyItem->setTerm($sourceItem->getTerm());
            $companyItem->setPosition($sourceItem->getPosition());
            $companyItem->setEditable($sourceItem->isEditable());
            $companyItem->setContent($sourceItem->getContent());
            $companyItem->setEdited(false);
            $companyItem->setCompany($company);
            $this->em->persist($companyItem);

        }
        $this->em->flush();
    }

    /**
     * @param Company $company
     * @param $term
     * @return CompanyLicenseTermItem|null|object
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function updateTermItem(Company $company, $term )
    {
        $companyTermItemsRepo = $this->em->getRepository('AppBundle:CompanyLicenseTermItem');

        $criteria= array(
            'id' => $term['id'],
        );
        $companyItem = $companyTermItemsRepo->findOneBy($criteria);

        if ($companyItem != null && isset( $term['content'])) {
            $companyItem->setContent($term['content']);
            $companyItem->setEdited(true);
        }
        $this->em->flush();
        return $companyItem;
    }

    /**
     * @param Company $company
     * @return CompanyDefinitions[]|CompanyLicenseTermItem[]|\AppBundle\Entity\SourceDefinitions[]|\AppBundle\Entity\SourceLicenseTerm[]|\AppBundle\Entity\SourceLicenseTermItem[]|array
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function getCompanyDefinitions(Company $company)
    {
        $repo = $this->em->getRepository('AppBundle:CompanyDefinitions');
        $definitions = $repo->findBy(array('company' => $company));

        if ( count($definitions) == 0 ) $definitions = $this->restoreDefinitions($company);

        return $definitions;
    }

    /**
     * @param Company $company
     * @return CompanyDefinitions[]|\AppBundle\Entity\SourceDefinitions[]|\AppBundle\Entity\SourceLicenseTerm[]|\AppBundle\Entity\SourceLicenseTermItem[]|array
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function restoreDefinitions(Company $company)
    {
        $sourceRepo = $this->em->getRepository('AppBundle:SourceDefinitions');
        $companyRepo = $this->em->getRepository('AppBundle:CompanyDefinitions');
        $companyItems = $companyRepo->findBy(array(
            'company' => $company
        ));

        foreach ($companyItems as $companyItem ){
            $this->em->remove($companyItem);
        }

        $this->em->flush();

        $sourceItems = $sourceRepo->findAll();

        foreach ( $sourceItems as $sourceItem){
            $criteria= array(
                'name' => $sourceItem->getName(),
                'company' => $company
            );
            $companyItem = $companyRepo->findOneBy($criteria);

            if ($companyItem == null) $companyItem = new CompanyDefinitions();
            $companyItem->setName($sourceItem->getName());
            $companyItem->setPosition($sourceItem->getPosition());
            $companyItem->setEditable($sourceItem->isEditable());
            $companyItem->setContent($sourceItem->getContent());
            $companyItem->setCompany($company);
            $companyItem->setEdited(false);
            $companyItem->setCustom(false);
            $this->em->persist($companyItem);
        }
        $this->em->flush();

        return $companyRepo->findAll();
    }

    /**
     * @param Company $company
     * @param $definition
     * @return CompanyDefinitions|null|object
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function updateDefinition(Company $company, $definition)
    {
        $companyItemsRepo = $this->em->getRepository('AppBundle:CompanyDefinitions');

        if ( !isset($definition['id']) ){
            $companyItem = new CompanyDefinitions();
            if (isset( $definition['content'])) $companyItem->setContent($definition['content']);
            if (isset( $definition['name'])) $companyItem->setName($definition['name']);
            if (isset( $definition['custom'])) $companyItem->setCustom($definition['custom']);
            if (isset( $definition['position'])) $companyItem->setPosition($definition['position']);
            $companyItem->setCompany($company);
            $companyItem->setEditable(true);
            $companyItem->setCustom(true);
            $companyItem->setEdited(false);
            $this->em->persist($companyItem);
        } else {
            $criteria= array(
                'id' => $definition['id'],
                'company' => $company,
            );
            $companyItem = $companyItemsRepo->findOneBy($criteria);
            if (isset( $definition['content'])) {
                $companyItem->setEdited(true);
                $companyItem->setContent($definition['content']);
            }
            if ($companyItem->isCustom() && isset( $definition['name'])) {
                $companyItem->setEdited(true);
                $companyItem->setName($definition['name']);
            }
        }
        $this->em->flush();

        return $companyItem;
    }

    /**
     * @param $company
     * @param $definition
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function removeDefinition($company, $definition)
    {
        $companyItemsRepo = $this->em->getRepository('AppBundle:CompanyDefinitions');

        $criteria= array(
            'id' => $definition['id'],
            'company' => $company,
        );

        $companyItem = $companyItemsRepo->findOneBy($criteria);

        if ($companyItem != null){
            $this->em->remove($companyItem);
        }
        $this->em->flush();
    }



    /**
     * @param Property $property
     * @return array $terms
     */
    public function getPropertyTerms(Property $property)
    {
        $terms = $this->em
            ->getRepository('AppBundle:SourceLicenseTerm')
            ->findAll();

        $propertyTermItemsRepo = $this->em->getRepository('AppBundle:PropertyLicenseTermItem');
        $propertyTermItems = $propertyTermItemsRepo->findBy(array('property' => $property));

        if ( count($propertyTermItems) == 0 ) $this->restorePropertyTermItems($property);

        foreach ( $terms as $term){
            $items = $propertyTermItemsRepo->findBy(array('term' => $term, 'property' => $property));
            $term->setItems($items);
        }

        return $terms;
    }

    /**
     * @param Property $property
     */
    public function restorePropertyTermItems(Property $property)
    {
        $sourceTermItemsRepo = $this->em->getRepository('AppBundle:SourceLicenseTermItem');
        $propertyTermItemsRepo = $this->em->getRepository('AppBundle:PropertyLicenseTermItem');

        $propertyItems = $propertyTermItemsRepo->findBy(array(
            'property' => $property
        ));

        foreach ($propertyItems as $propertyItem ){
            $this->em->remove($propertyItem);
        }

        $this->em->flush();

        $sourceTermItems = $sourceTermItemsRepo->findAll();

        foreach ( $sourceTermItems as $sourceItem){
            $criteria= array(
                'term' => $sourceItem->getTerm(),
                'position' => $sourceItem->getPosition(),
                'property' => $property
            );
            $propertyItem = $propertyTermItemsRepo->findOneBy($criteria);

            if ($propertyItem == null) $propertyItem = new PropertyLicenseTermItem();
            $propertyItem->setTerm($sourceItem->getTerm());
            $propertyItem->setPosition($sourceItem->getPosition());
            $propertyItem->setEditable($sourceItem->isEditable());
            $propertyItem->setContent($sourceItem->getContent());
            $propertyItem->setEdited(false);
            $propertyItem->setProperty($property);
            $this->em->persist($propertyItem);
        }
        $this->em->flush();
    }

    /**
     * @param Property $property
     * @param $term
     * @return PropertyLicenseTermItem|null|object
     */
    public function updatePropertyTermItem(Property $property, $term)
    {
        $propertyTermItemsRepo = $this->em->getRepository('AppBundle:PropertyLicenseTermItem');

        $criteria= array(
            'id' => $term['id'],
            'property' => $property
        );
        $propertyItem = $propertyTermItemsRepo->findOneBy($criteria);

        if ($propertyItem != null && isset( $term['content'])) {
            $propertyItem->setContent($term['content']);
            $propertyItem->setEdited(true);
        }
        $this->em->flush();
        return $propertyItem;
    }

    /**
     * @param Property $property
     * @return PropertyDefinitions[]|PropertyLicenseTermItem[]|\AppBundle\Entity\SourceDefinitions[]|\AppBundle\Entity\SourceLicenseTerm[]|\AppBundle\Entity\SourceLicenseTermItem[]|array
     */
    public function getPropertyDefinitions(Property $property)
    {
        $repo = $this->em->getRepository('AppBundle:PropertyDefinitions');
        $definitions = $repo->findBy(array('property' => $property));

        if ( count($definitions) == 0 ) $definitions = $this->restorePropertyDefinitions($property);

        return $definitions;
    }

    /**
     * @param Property $property
     * @return PropertyDefinitions[]|\AppBundle\Entity\SourceDefinitions[]|\AppBundle\Entity\SourceLicenseTerm[]|\AppBundle\Entity\SourceLicenseTermItem[]|array
     */
    public function restorePropertyDefinitions(Property $property)
    {
        $sourceRepo = $this->em->getRepository('AppBundle:SourceDefinitions');
        $propertyRepo = $this->em->getRepository('AppBundle:PropertyDefinitions');
        $propertyItems = $propertyRepo->findBy(array(
            'property' => $property
        ));

        foreach ($propertyItems as $propertyItem ){
            $this->em->remove($propertyItem);
        }

        $this->em->flush();

        $sourceItems = $sourceRepo->findAll();

        foreach ( $sourceItems as $sourceItem){
            $criteria= array(
                'name' => $sourceItem->getName(),
                'property' => $property
            );
            $propertyItem = $propertyRepo->findOneBy($criteria);

            if ($propertyItem == null) $propertyItem = new PropertyDefinitions();
            $propertyItem->setName($sourceItem->getName());
            $propertyItem->setPosition($sourceItem->getPosition());
            $propertyItem->setEditable($sourceItem->isEditable());
            $propertyItem->setContent($sourceItem->getContent());
            $propertyItem->setProperty($property);
            $propertyItem->setEdited(false);
            $propertyItem->setCustom(false);
            $this->em->persist($propertyItem);
        }
        $this->em->flush();

        return $propertyRepo->findAll();
    }

    /**
     * @param Property $property
     * @param $definition
     * @return PropertyDefinitions|null|object
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function updatePropertyDefinition(Property $property, $definition)
    {
        $propertyItemsRepo = $this->em->getRepository('AppBundle:PropertyDefinitions');

        if ( !isset($definition['id']) ){
            $propertyItem = new PropertyDefinitions();
            if (isset( $definition['content'])) $propertyItem->setContent($definition['content']);
            if (isset( $definition['name'])) $propertyItem->setName($definition['name']);
            if (isset( $definition['custom'])) $propertyItem->setCustom($definition['custom']);
            if (isset( $definition['position'])) $propertyItem->setPosition($definition['position']);
            $propertyItem->setProperty($property);
            $propertyItem->setEditable(true);
            $propertyItem->setCustom(true);
            $propertyItem->setEdited(false);
            $this->em->persist($propertyItem);
        } else {
            $criteria= array(
                'id' => $definition['id'],
                'property' => $property,
            );
            $propertyItem = $propertyItemsRepo->findOneBy($criteria);
            if (isset( $definition['content'])) {
                $propertyItem->setEdited(true);
                $propertyItem->setContent($definition['content']);
            }
            if ($propertyItem->isCustom() && isset( $definition['name'])) {
                $propertyItem->setEdited(true);
                $propertyItem->setName($definition['name']);
            }
        }
        $this->em->flush();

        return $propertyItem;
    }

    /**
     * @param Property $property
     * @param $definition
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function removePropertyDefinition($property, $definition)
    {
        $propertyItemsRepo = $this->em->getRepository('AppBundle:PropertyDefinitions');

        $criteria= array(
            'id' => $definition['id'],
            'property' => $property,
        );

        $propertyItem = $propertyItemsRepo->findOneBy($criteria);

        if ($propertyItem != null){
            $this->em->remove($propertyItem);
        }
        $this->em->flush();
    }
}

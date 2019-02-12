<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

use AppBundle\Entity\Company;
use AppBundle\Entity\CompanyDefinitions;
use AppBundle\Entity\CompanyLicenseTermItem;
use AppBundle\Entity\ContentFilter;
use AppBundle\Entity\ListingStatus;
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\SportCategory;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Doctrine\RandomIdGenerator;
use AppBundle\Entity\User;
use AppBundle\Entity\Content;
use AppBundle\Entity\Season;
use AppBundle\Entity\Tournament;
use AppBundle\Entity\Sport;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


class TermsService
{

    private $em;

    private $idGenerator;

    private $fileUploader;

    protected $fosUserManager;

    public function __construct(EntityManager $entityManager, RandomIdGenerator $idGenerator, FileUploader $fileUploader, \FOS\UserBundle\Doctrine\UserManager $fosUserManager) {
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
            ->findAll();

        $companyTermItemsRepo = $this->em->getRepository('AppBundle:CompanyLicenseTermItem');
        $companyTermItems = $companyTermItemsRepo->findBy(array('company' => $company));

        if ( count($companyTermItems) == 0 ) $this->restoreTermItems($company);

        foreach ( $terms as $term){
            $items = $companyTermItemsRepo->findBy(array('term' => $term));
            $term->setItems($items);
        }

        return $terms;
    }

    public function restoreTermItems(Company $company)
    {
        $sourceTermItemsRepo = $this->em->getRepository('AppBundle:SourceLicenseTermItem');
        $companyTermItemsRepo = $this->em->getRepository('AppBundle:CompanyLicenseTermItem');

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

    public function updateTermItems(Company $company,$terms)
    {
        $companyTermItemsRepo = $this->em->getRepository('AppBundle:CompanyLicenseTermItem');

        foreach ( $terms as $term){

            if (!isset( $term['items'])) continue;
            foreach ( $term['items'] as $item){
                $criteria= array(
                    'id' => $item['id'],
                );
                $companyItem = $companyTermItemsRepo->findOneBy($criteria);

                if ($companyItem != null && isset( $item['content'])) {
                    $companyItem->setContent($item['content']);
                    $companyItem->setEdited(json_decode($item['edited']));
                }
                $this->em->persist($companyItem);
            }
        }
        $this->em->flush();
    }

    public function getCompanyDefinitions(Company $company)
    {
        $repo = $this->em->getRepository('AppBundle:CompanyDefinitions');
        $definitions = $repo->findBy(array('company' => $company));

        if ( count($definitions) == 0 ) $definitions = $this->restoreDefinitions($company);

        return $definitions;
    }

    public function restoreDefinitions(Company $company)
    {
        $sourceRepo = $this->em->getRepository('AppBundle:SourceDefinitions');
        $companyRepo = $this->em->getRepository('AppBundle:CompanyDefinitions');

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
    }

    public function updateDefinitions(Company $company, $definitions)
    {
        $companyItemsRepo = $this->em->getRepository('AppBundle:CompanyDefinitions');

        foreach ( $definitions as $definition){

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
            } else {
                $criteria= array(
                    'id' => $definition['id'],
                    'company' => $company,
                );
                $companyItem = $companyItemsRepo->findOneBy($criteria);
                if (isset( $definition['content'])) {
                    $companyItem->setEdited(json_decode($definition['edited']));
                    $companyItem->setContent($definition['content']);
                }
            }
            if ($companyItem != null){
                if ( isset($definition['removed']) ){
                    $this->em->remove($companyItem);
                } else {
                    $this->em->persist($companyItem);
                }
            }
        }
        $this->em->flush();
    }


}
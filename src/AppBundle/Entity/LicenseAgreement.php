<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * LicenseAgreement
 *
 * @ORM\Table(name="license_agreement")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\LicenseAgreementRepository")
 */
class LicenseAgreement
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="file", type="string", length=255)
     */
    private $file;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Content")
     * @ORM\JoinColumn(nullable=true)
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\SalesPackage")
     * @ORM\JoinColumn(nullable=true)
     */
    private $salesPackage;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Bid")
     * @ORM\JoinColumn(nullable=true)
     */
    private $bid;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company")
     * @ORM\JoinColumn(nullable=true)
     */
    private $company;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set file
     *
     * @param string $file
     *
     * @return LicenseAgreement
     */
    public function setFile($file)
    {
        $this->file = $file;

        return $this;
    }

    /**
     * Get file
     *
     * @return string
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * @return mixed
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param mixed $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return mixed
     */
    public function getSalesPackage()
    {
        return $this->salesPackage;
    }

    /**
     * @param mixed $salesPackage
     */
    public function setSalesPackage($salesPackage)
    {
        $this->salesPackage = $salesPackage;
    }

    /**
     * @return mixed
     */
    public function getBid()
    {
        return $this->bid;
    }

    /**
     * @param mixed $bid
     */
    public function setBid($bid)
    {
        $this->bid = $bid;
    }

    /**
     * @return mixed
     */
    public function getCompany()
    {
        return $this->company;
    }

    /**
     * @param mixed $company
     */
    public function setCompany($company)
    {
        $this->company = $company;
    }


}


<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * CompanyLicenseTermItem
 *
 * @ORM\Table(name="company_license_term_item")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\CompanyLicenseTermItemRepository")
 */
class CompanyLicenseTermItem extends LicenseTermItemBase
{

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company")
     * @ORM\JoinColumn(nullable=true)
     */
    private $company;


    /**
     * @var boolean
     * @ORM\Column(name="editable", type="boolean", options={"default":"1"})
     * @Groups({"terms"})
     *
     */
    private $editable;

    /**
     * @var boolean
     * @ORM\Column(name="edited", type="boolean")
     * @Groups({"terms"})
     */
    private $edited = false;

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

    /**
     * @return bool
     */
    public function isEditable()
    {
        return $this->editable;
    }

    /**
     * @param bool $editable
     */
    public function setEditable($editable)
    {
        $this->editable = $editable;
    }

    /**
     * Get editable
     *
     * @return boolean
     */
    public function getEditable()
    {
        return $this->editable;
    }

    /**
     * Set edited
     *
     * @param boolean $edited
     *
     * @return CompanyLicenseTermItem
     */
    public function setEdited($edited)
    {
        $this->edited = $edited;

        return $this;
    }

    /**
     * Get edited
     *
     * @return boolean
     */
    public function getEdited()
    {
        return $this->edited;
    }
}

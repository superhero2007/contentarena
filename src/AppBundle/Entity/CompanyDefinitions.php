<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * CompanyDefinitions
 *
 * @ORM\Table(name="company_definitions")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\CompanyDefinitionsRepository")
 */
class CompanyDefinitions extends DefinitionsBase
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
     *
     */
    private $edited = false;

    /**
     * @var boolean
     * @ORM\Column(name="custom", type="boolean", options={"default":"0"})
     * @Groups({"terms"})
     *
     */
    private $custom;


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
     * @return bool
     */
    public function isCustom()
    {
        return $this->custom;
    }

    /**
     * @param bool $custom
     */
    public function setCustom($custom)
    {
        $this->custom = $custom;
    }

    /**
     * @return bool
     */
    public function isEdited()
    {
        return $this->edited;
    }

    /**
     * @param bool $edited
     */
    public function setEdited($edited)
    {
        $this->edited = $edited;
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
     * Get edited
     *
     * @return boolean
     */
    public function getEdited()
    {
        return $this->edited;
    }

    /**
     * Get custom
     *
     * @return boolean
     */
    public function getCustom()
    {
        return $this->custom;
    }
}

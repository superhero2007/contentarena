<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * PropertyLicenseTermItem
 *
 * @ORM\Table(name="property_license_term_item")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PropertyLicenseTermItemRepository")
 */
class PropertyLicenseTermItem extends LicenseTermItemBase
{

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Property")
     * @ORM\JoinColumn(nullable=true)
     */
    private $property;


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
    public function getProperty()
    {
        return $this->property;
    }

    /**
     * @param mixed $property
     */
    public function setProperty($property)
    {
        $this->property = $property;
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
     * @return PropertyLicenseTermItem
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

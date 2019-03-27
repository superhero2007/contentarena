<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SourceLicenseTermItem
 *
 * @ORM\Table(name="source_license_term_item")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SourceLicenseTermItemRepository")
 */
class SourceLicenseTermItem extends LicenseTermItemBase
{

    /**
     * @var boolean
     * @ORM\Column(name="editable", type="boolean", options={"default":"1"})
     *
     */
    private $editable;

    /**
     * @var boolean
     * @ORM\Column(name="edited", type="boolean")
     *
     */
    private $edited = false;

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
     * @return SourceLicenseTermItem
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

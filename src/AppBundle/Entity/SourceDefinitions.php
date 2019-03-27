<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * SourceDefinitions
 *
 * @ORM\Table(name="source_definitions")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SourceDefinitionsRepository")
 */
class SourceDefinitions extends DefinitionsBase
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
     * @Groups({"terms"})
     */
    private $edited = false;

    /**
     * @return bool
     */
    public function getEdited()
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
}

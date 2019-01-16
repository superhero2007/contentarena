<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * SourceLicenseTerm
 *
 * @ORM\Table(name="source_license_term")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SourceLicenseTermRepository")
 */
class SourceLicenseTerm
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"terms"})
     */
    private $id;

    /**
     * @var int
     *
     * @ORM\Column(name="position", type="integer", unique=true)
     * @Groups({"terms"})
     */
    private $position;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     * @Groups({"terms"})
     */
    private $name;

    /**
     * @var array;
     * @Groups({"terms"})
     */
    private $items = array();

    public function __toString()
    {
        return $this->getName();
    }


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
     * Set position
     *
     * @param integer $position
     *
     * @return SourceLicenseTerm
     */
    public function setPosition($position)
    {
        $this->position = $position;

        return $this;
    }

    /**
     * Get position
     *
     * @return int
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return SourceLicenseTerm
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return array
     */
    public function getItems()
    {
        return $this->items;
    }

    /**
     * @param array $items
     */
    public function setItems($items)
    {
        $this->items = $items;
    }


}


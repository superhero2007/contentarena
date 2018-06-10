<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * RightsPackage
 *
 * @ORM\Table(name="rights_package")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\RightsPackageRepository")
 */
class RightsPackage extends \AppBundle\Helper\SerializerHelper
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"common", "listing"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, unique=true)
     * @Groups({"common", "listing"})
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="short_label", type="string", length=5, unique=true)
     * @Groups({"common", "listing"})
     */
    private $shortLabel;

    /**
     * One Category has Many Categories.
     * @ORM\ManyToMany(targetEntity="RightsPackage", inversedBy="parent")
     */
    private $children;

    /**
     * Many Categories have One Category.
     * @ORM\ManyToMany(targetEntity="RightsPackage", mappedBy="children")
     */
    private $parent;


    public function __construct() {
        $this->children = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set name
     *
     * @param string $name
     *
     * @return RightsPackage
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

    public function __toString() {
        return $this->name;
    }

    /**
     * @return mixed
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * @param mixed $children
     */
    public function setChildren($children)
    {
        $this->children = $children;
    }

    /**
     * @return mixed
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * @param mixed $parent
     */
    public function setParent($parent)
    {
        $this->parent = $parent;
    }

    /**
     * @return string
     */
    public function getShortLabel()
    {
        return $this->shortLabel;
    }

    /**
     * @param string $shortLabel
     */
    public function setShortLabel($shortLabel)
    {
        $this->shortLabel = $shortLabel;
    }



}


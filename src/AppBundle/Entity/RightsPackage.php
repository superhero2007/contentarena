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
     * @Groups({"common", "listing", "board", "commercial", "home", "preview"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, unique=true)
     * @Groups({"common", "listing", "closed", "board", "commercial", "home", "preview", "property"})
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="short_label", type="string", length=5, unique=true)
     * @Groups({"common", "listing", "closed", "board", "commercial", "home", "preview", "propertyList", "property"})
     */
    private $shortLabel;

    /**
     * @var boolean
     * @Groups({"propertyList", "property"})
     */
    private $exclusive;


    public function __construct() {
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

    /**
     * @return bool
     */
    public function isExclusive()
    {
        return $this->exclusive;
    }

    /**
     * @param bool $exclusive
     */
    public function setExclusive($exclusive)
    {
        $this->exclusive = $exclusive;
    }





}


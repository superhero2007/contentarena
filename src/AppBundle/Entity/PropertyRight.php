<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Groups;

/**
 * PropertyRight
 *
 * @ORM\Table(name="property_right")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PropertyRightRepository")
 */
class PropertyRight
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"listing", "propertyList", "createListing"})
     */
    private $id;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @Groups({"listing", "property", "propertyList"})
     */
    private $name;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="code", type="string", length=2, nullable=false)
     * @Groups({"listing", "property", "propertyList"})
     */
    private $code;

    /**
     * @Serializer\Type("array<PropertyTerritoryItem<AppBundle\Entity\Country>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Country")
     * @ORM\JoinTable(name="property_territories",
     *      joinColumns={@ORM\JoinColumn(name="property_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="property_territory_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "property"})
     */
    private $territories;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="territories_mode", type="string", length=255, nullable=true)
     * @Groups({"listing", "property", "propertyList"})
     */
    private $territoriesMode;

    /**
     * @var boolean
     * @Serializer\Type("boolean")
     * @ORM\Column(name="exclusive", type="boolean")
     * @Groups({"listing", "property", "propertyList"})
     */
    private $exclusive;

    /**
     * @var object
     * @Serializer\Type("JsObject")
     * @ORM\Column(name="details", type="object", nullable=true)
     * @Groups({"listing", "property", "propertyList"})
     */
    private $details;

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @param string $code
     */
    public function setCode($code)
    {
        $this->code = $code;
    }

    /**
     * @return mixed
     */
    public function getTerritories()
    {
        return $this->territories;
    }

    /**
     * @param mixed $territories
     */
    public function setTerritories($territories)
    {
        $this->territories = $territories;
    }

    /**
     * @return string
     */
    public function getTerritoriesMode()
    {
        return $this->territoriesMode;
    }

    /**
     * @param string $territoriesMode
     */
    public function setTerritoriesMode($territoriesMode)
    {
        $this->territoriesMode = $territoriesMode;
    }

    /**
     * @return string
     */
    public function getExclusive()
    {
        return $this->exclusive;
    }

    /**
     * @param string $exclusive
     */
    public function setExclusive($exclusive)
    {
        $this->exclusive = $exclusive;
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
     * @return object
     */
    public function getDetails()
    {
        return $this->details;
    }

    /**
     * @param object $details
     */
    public function setDetails($details)
    {
        $this->details = $details;
    }


}


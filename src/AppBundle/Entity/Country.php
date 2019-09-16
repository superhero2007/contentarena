<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\VirtualProperty;
/**
 * Country
 *
 * @ORM\Table(name="country")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\CountryRepository")
 */
class Country
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"listing","countryList", "home", "settings", "property"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, unique=true)
     * @Groups({"listing", "closed", "commercial", "settings","countryList", "home", "property"})
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="country_code", type="string", length=3, unique=true)
     * @Groups({"countryList"})
     */
    private $country_code;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Territory", fetch="EXTRA_LAZY")
     * @ORM\JoinColumn(name="territory_id", referencedColumnName="id")
     */
    private $territory;


    /**
     * @var integer
     *
     * @ORM\Column(name="territory_id", type="integer", nullable=true)
     * @Groups({"listing", "countryList", "settings", "property"})
     */

    private $territoryId;

    /**
     * Many Countries have Many Regions.
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Region")
     * @ORM\JoinTable(name="country_regions",
     *      joinColumns={@ORM\JoinColumn(name="country_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="region_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "countryList", "settings", "property"})
     */
    private $regions;

    public function __construct() {
        $this->regions = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getRegions()
    {
        return $this->regions;
    }

    /**
     * @param mixed $regions
     */
    public function setRegions($regions)
    {
        $this->regions = $regions;
    }


    /**
     * @return mixed
     */
    public function getTerritoryId()
    {
        return $this->territoryId;
    }

    /**
     * @param mixed $territoryId
     */
    public function setTerritoryId($territoryId)
    {
        $this->territoryId = $territoryId;
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
     * @return Country
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


    public function __toString()
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getCountryCode()
    {
        return $this->country_code;
    }

    /**
     * @param string $country_code
     */
    public function setCountryCode($country_code)
    {
        $this->country_code = $country_code;
    }

    /**
     * @return mixed
     */
    public function getTerritory()
    {
        return $this->territory;
    }

    /**
     * @param mixed $territory
     */
    public function setTerritory($territory)
    {
        $this->territory = $territory;
    }

    /**
     * @return array
     * @VirtualProperty()
     * @Groups({"listing","countryList", "home", "settings", "property"})
     * @SerializedName("territories");
     */
    public function getTerritories()
    {
        return [$this->territory];
    }


}

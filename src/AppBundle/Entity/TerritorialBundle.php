<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation as Serializer;

/**
 * TerritorialBundle
 *
 * @ORM\Table(name="territorial_bundle")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\TerritorialBundleRepository")
 */
class TerritorialBundle
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"listing", "commercial", "home", "propertyList", "property", "createListing"})
     */
    private $id;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @Groups({"listing","closed", "commercial", "home", "propertyList", "property", "createListing"})
     */
    private $name;

    /**
     * @var int
     * @Serializer\Type("integer")
     * @ORM\Column(name="minimum_bid", type="bigint")
     * @Groups({"listing", "commercial", "home", "propertyList", "property", "createListing"})
     */
    private $minimumBid;

    /**
     * @Serializer\Type("CurrencyObject<AppBundle\Entity\Currency>")
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Currency")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"listing", "closed", "commercial", "home", "propertyList", "property", "createListing"})
     */
    private $currency;

    /**
     * @Serializer\Type("array<PropertyTerritoryItem<AppBundle\Entity\Country>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Country")
     * @ORM\JoinTable(name="bundle_territories",
     *      joinColumns={@ORM\JoinColumn(name="bundle_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="bundle_territory_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "closed", "commercial", "home", "propertyList", "property", "createListing"})
     */
    private $territories;

    /**
     * @Groups({"commercial", "propertyList", "property"})
     * @MaxDepth(4)
     */
    private $bids;

    /**
     * @var bool
     * @Serializer\Type("boolean")
     * @ORM\Column(name="sold", type="boolean")
     * @Groups({"listing", "closed", "commercial", "home"})
     */
    private $sold = false;

    /**
     * @var bool
     *
     * @ORM\Column(name="custom", type="boolean", options={"default":"0"})
     * @Groups({"listing", "closed", "commercial", "home"})
     */
    private $custom = false;

    /**
     * @var bool
     *
     * @ORM\Column(name="region_named", type="boolean")
     * @Groups({"listing", "closed", "commercial", "home"})
     */
    private $regionNamed = false;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

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
     * @return int
     */
    public function getMinimumBid()
    {
        return $this->minimumBid;
    }

    /**
     * @param int $minimumBid
     */
    public function setMinimumBid($minimumBid)
    {
        $this->minimumBid = $minimumBid;
    }

    /**
     * @return mixed
     */
    public function getCurrency()
    {
        return $this->currency;
    }

    /**
     * @param mixed $currency
     */
    public function setCurrency($currency)
    {
        $this->currency = $currency;
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
     * @return mixed
     */
    public function getBids()
    {
        return $this->bids;
    }

    /**
     * @param mixed $bids
     */
    public function setBids($bids)
    {
        $this->bids = $bids;
    }

    /**
     * @return bool
     */
    public function isSold()
    {
        return $this->sold;
    }

    /**
     * @param bool $sold
     */
    public function setSold($sold)
    {
        $this->sold = $sold;
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
    public function isRegionNamed()
    {
        return $this->regionNamed;
    }

    /**
     * @param bool $regionNamed
     */
    public function setRegionNamed($regionNamed)
    {
        $this->regionNamed = $regionNamed;
    }



}


<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * SalesPackage
 *
 * @ORM\Table(name="sales_package")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SalesPackageRepository")
 */
class SalesPackage
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"listing", "commercial"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @Groups({"listing", "commercial"})
     */
    private $name;

    /**
     * @var int
     *
     * @ORM\Column(name="fee", type="bigint")
     * @Groups({"listing", "commercial"})
     */
    private $fee;

    /**
     * @var string
     *
     * @ORM\Column(name="territories_method", type="string", length=255, nullable=true)
     * @Groups({"listing","closed", "commercial"})
     */
    private $territoriesMethod = false;

    /**
     * @var string
     *
     * @ORM\Column(name="bundle_method", type="string", length=255, nullable=true)
     * @Groups({"listing", "closed", "commercial"})
     */
    private $bundleMethod = false;

    /**
     * @var object
     * @ORM\Column(name="installments", type="object", nullable=true)
     * @Groups({"listing", "closed", "commercial"})
     */
    private $installments;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Currency")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"listing", "closed", "commercial"})
     */
    private $currency;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\BidType")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"listing", "commercial"})
     */
    private $salesMethod;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Country")
     * @ORM\JoinTable(name="sales_package_territories",
     *      joinColumns={@ORM\JoinColumn(name="country_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="sales_package_sales_package_territory_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "closed", "commercial"})
     */
    private $territories;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Country")
     * @ORM\JoinTable(name="sales_package_excluded_countries",
     *      joinColumns={@ORM\JoinColumn(name="country_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="sales_package_excluded_countries_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing"})
     */
    private $excludedCountries;

    /**
     * @Groups({"commercial"})
     */
    private $bids;

    /**
     * @var bool
     *
     * @ORM\Column(name="sold", type="boolean")
     * @Groups({"listing", "closed", "commercial"})
     */
    private $sold = false;

    public function __construct() {
        $this->excludedCountries = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     * Set name
     *
     * @param string $name
     *
     * @return SalesPackage
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
     * @return int
     */
    public function getFee()
    {
        return $this->fee;
    }

    /**
     * @param int $fee
     */
    public function setFee($fee)
    {
        $this->fee = $fee;
    }

    /**
     * @return string
     */
    public function getTerritoriesMethod()
    {
        return $this->territoriesMethod;
    }

    /**
     * @param string $territoriesMethod
     */
    public function setTerritoriesMethod($territoriesMethod)
    {
        $this->territoriesMethod = $territoriesMethod;
    }

    /**
     * @return string
     */
    public function getBundleMethod()
    {
        return $this->bundleMethod;
    }

    /**
     * @param string $bundleMethod
     */
    public function setBundleMethod($bundleMethod)
    {
        $this->bundleMethod = $bundleMethod;
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
    public function getSalesMethod()
    {
        return $this->salesMethod;
    }

    /**
     * @param mixed $salesMethod
     */
    public function setSalesMethod($salesMethod)
    {
        $this->salesMethod = $salesMethod;
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
    public function getExcludedCountries()
    {
        return $this->excludedCountries;
    }

    /**
     * @param mixed $excludedCountries
     */
    public function setExcludedCountries($excludedCountries)
    {
        $this->excludedCountries = $excludedCountries;
    }

    /**
     * @return object
     */
    public function getInstallments()
    {
        return $this->installments;
    }

    /**
     * @param object $installments
     */
    public function setInstallments($installments)
    {
        $this->installments = $installments;
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

}
<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

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
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @var int
     *
     * @ORM\Column(name="amount", type="bigint")
     */
    private $amount;

    /**
     * @var bool
     *
     * @ORM\Column(name="sellAsPackage", type="boolean")
     */
    private $sellAsPackage = false;

    /**
     * @var bool
     *
     * @ORM\Column(name="worldwide", type="boolean")
     */
    private $worldwide = false;


    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Currency", inversedBy="salesPackages")
     * @ORM\JoinColumn(nullable=true)
     */
    private $currency;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\BidType", inversedBy="salesPackages")
     * @ORM\JoinColumn(nullable=true)
     */
    private $salesMethod;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Country", inversedBy="salesPackages",fetch="EAGER")
     * @ORM\JoinTable(name="sales_package_selected_countries",
     *      joinColumns={@ORM\JoinColumn(name="country_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="sales_package_selected_countries_id", referencedColumnName="id")}
     *      )
     */
    private $selectedCountries;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Country", inversedBy="salesPackages",fetch="EAGER")
     * @ORM\JoinTable(name="sales_package_excluded_countries",
     *      joinColumns={@ORM\JoinColumn(name="country_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="sales_package_excluded_countries_id", referencedColumnName="id")}
     *      )
     */
    private $excludedCountries;

    public function __construct() {
        $this->selectedCountries = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set amount
     *
     * @param integer $amount
     *
     * @return SalesPackage
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * Get amount
     *
     * @return int
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * Set sellAsPackage
     *
     * @param boolean $sellAsPackage
     *
     * @return SalesPackage
     */
    public function setSellAsPackage($sellAsPackage)
    {
        $this->sellAsPackage = $sellAsPackage;

        return $this;
    }

    /**
     * Get sellAsPackage
     *
     * @return bool
     */
    public function getSellAsPackage()
    {
        return $this->sellAsPackage;
    }

    /**
     * @return bool
     */
    public function isWorldwide()
    {
        return $this->worldwide;
    }

    /**
     * @param bool $worldwide
     */
    public function setWorldwide($worldwide)
    {
        $this->worldwide = $worldwide;
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
    public function getSelectedCountries()
    {
        return $this->selectedCountries;
    }

    /**
     * @param mixed $selectedCountries
     */
    public function setSelectedCountries($selectedCountries)
    {
        $this->selectedCountries = $selectedCountries;
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



}


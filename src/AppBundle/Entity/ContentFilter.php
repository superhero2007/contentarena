<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ContentFilter
 *
 * @ORM\Table(name="content_filter")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ContentFilterRepository")
 */
class ContentFilter
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
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="contentFilter")
     * @ORM\JoinColumn(nullable=true)
     */
    private $user;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Sport", inversedBy="contentFilter")
     * @ORM\JoinTable(name="content_filter_sports",
     *      joinColumns={@ORM\JoinColumn(name="content_filter_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="content_filter_sports_id", referencedColumnName="id")}
     *      )
     */
    private $sports;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Country", inversedBy="contentFilter",fetch="EAGER")
     * @ORM\JoinTable(name="content_filter_countries",
     *      joinColumns={@ORM\JoinColumn(name="country_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="content_filter_countries_id", referencedColumnName="id")}
     *      )
     */
    private $countries;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Territory", inversedBy="contentFilter",fetch="EAGER")
     * @ORM\JoinTable(name="content_filter_territories",
     *      joinColumns={@ORM\JoinColumn(name="content_filter_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="content_filter_territory_id", referencedColumnName="id")}
     *      )
     */
    private $territories;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\RightsPackage", inversedBy="contentFilter",fetch="EAGER")
     * @ORM\JoinTable(name="content_filter_super_rights",
     *      joinColumns={@ORM\JoinColumn(name="content_filter_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="content_filter_super_rights_id", referencedColumnName="id")}
     *      )
     */
    private $superRights;

    /**
     * @var string
     *
     * @ORM\Column(name="order_by", type="string", length=255)
     */
    private $orderBy = "createdAt";

    /**
     * @var string
     *
     * @ORM\Column(name="sort_order", type="string", length=255)
     */
    private $sortOrder = "DESC";

    /**
     * @ORM\Column(type="datetime", name="from_date", nullable=true)
     */
    private $fromDate= null;

    /**
     * @ORM\Column(type="datetime", name="to_date", nullable=true)
     */
    private $toDate = null;



    public function __construct(  )
    {
        $this->countries = new \Doctrine\Common\Collections\ArrayCollection();
        $this->sports = new \Doctrine\Common\Collections\ArrayCollection();
        $this->superRights = new \Doctrine\Common\Collections\ArrayCollection();
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
     * @return ContentFilter
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
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return mixed
     */
    public function getSports()
    {
        return $this->sports;
    }

    /**
     * @param mixed $sports
     */
    public function setSports($sports)
    {
        $this->sports = $sports;
    }

    /**
     * @return mixed
     */
    public function getCountries()
    {
        return $this->countries;
    }

    /**
     * @param mixed $countries
     */
    public function setCountries($countries)
    {
        $this->countries = $countries;
    }

    /**
     * @return mixed
     */
    public function getSuperRights()
    {
        return $this->superRights;
    }

    /**
     * @param mixed $superRights
     */
    public function setSuperRights($superRights)
    {
        $this->superRights = $superRights;
    }

    /**
     * @return string
     */
    public function getOrderBy()
    {
        return $this->orderBy;
    }

    /**
     * @param string $orderBy
     */
    public function setOrderBy($orderBy)
    {
        $this->orderBy = $orderBy;
    }

    /**
     * @return string
     */
    public function getSortOrder()
    {
        return $this->sortOrder;
    }

    /**
     * @param string $sortOrder
     */
    public function setSortOrder($sortOrder)
    {
        $this->sortOrder = $sortOrder;
    }

    /**
     * @return mixed
     */
    public function getFromDate()
    {
        return $this->fromDate;
    }

    /**
     * @param mixed $fromDate
     */
    public function setFromDate($fromDate)
    {
        $this->fromDate = $fromDate;
    }

    /**
     * @return mixed
     */
    public function getToDate()
    {
        return $this->toDate;
    }

    /**
     * @param mixed $toDate
     */
    public function setToDate($toDate)
    {
        $this->toDate = $toDate;
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
     * @param string $sortBy
     * @return string
     */
    public function getSortByKey($sortBy = null)
    {
        if($sortBy === 'expiry') {
            $this->setSortOrder('ASC');
            return $this->getSortOrder();
        } else {
            $this->setSortOrder('DESC');
            return $this->getSortOrder();
        }
    }

    /**
     * @param string $sortBy
     * @return string
     */
    public function getOrderByKey($sortBy = null)
    {
        if($sortBy === 'expiry') {
            $this->setOrderBy('expiresAt');
            return $this->getOrderBy();
        } else {
            $this->setOrderBy('publishedAt');
            return $this->getOrderBy();
        }
    }
}

<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Content
 *
 * @ORM\Table(name="content")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ContentRepository")
 */
class Content
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
     * @ORM\Column(name="custom_id", type="string", unique=true, nullable=true)
     */
    protected $customId;

    /**
     * @var string
     *
     * @ORM\Column(name="eventType", type="string", length=255)
     */
    private $eventType;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="fee", type="string", length=255, nullable=true)
     */
    private $fee;

    /**
     * @var string
     *
     * @ORM\Column(name="salesMethod", type="string", length=255, nullable=true)
     */
    private $salesMethod;

    /**
     * @var int
     *
     * @ORM\Column(name="releaseYear", type="smallint", nullable=true)
     */
    private $releaseYear;

    /**
     * @var boolean
     *
     * @ORM\Column(name="approved", type="boolean")
     */
    protected $approved = false;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="availability", type="date", nullable=true)
     */
    private $availability;

    /**
     * @var string
     *
     * @ORM\Column(name="duration", type="string", length=255, nullable=true)
     */
    private $duration;

    /**
     * @var string
     *
     * @ORM\Column(name="website", type="string", length=255, nullable=true)
     */
    private $website;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company", inversedBy="content")
     * @ORM\JoinColumn(nullable=true)
     */
    private $company;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Sport", inversedBy="content")
     * @ORM\JoinColumn(nullable=true)
     */
    private $sport;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Tournament", inversedBy="content")
     * @ORM\JoinColumn(nullable=true)
     */
    private $tournament;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Season", inversedBy="content")
     * @ORM\JoinColumn(nullable=true)
     */
    private $season;

    /**
     * Many Content have Many RightsItemContent.
     * @ORM\ManyToMany(targetEntity="RightsItemContent")
     * @ORM\JoinTable(name="content_rights_items",
     *      joinColumns={@ORM\JoinColumn(name="content_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="right_items_content_id", referencedColumnName="id")}
     *      )
     */
    private $rightsItems;

    /** @ORM\Column(type="datetime", name="created_at", nullable=true) */
    private $createdAt;

    public function __construct() {
        $this->rightsItems = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set eventType
     *
     * @param string $eventType
     *
     * @return Content
     */
    public function setEventType($eventType)
    {
        $this->eventType = $eventType;

        return $this;
    }

    /**
     * Get eventType
     *
     * @return string
     */
    public function getEventType()
    {
        return $this->eventType;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Content
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set fee
     *
     * @param string $fee
     *
     * @return Content
     */
    public function setFee($fee)
    {
        $this->fee = $fee;

        return $this;
    }

    /**
     * Get fee
     *
     * @return string
     */
    public function getFee()
    {
        return $this->fee;
    }

    /**
     * Set salesMethod
     *
     * @param string $salesMethod
     *
     * @return Content
     */
    public function setSalesMethod($salesMethod)
    {
        $this->salesMethod = $salesMethod;

        return $this;
    }

    /**
     * Get salesMethod
     *
     * @return string
     */
    public function getSalesMethod()
    {
        return $this->salesMethod;
    }

    /**
     * Set releaseYear
     *
     * @param integer $releaseYear
     *
     * @return Content
     */
    public function setReleaseYear($releaseYear)
    {
        $this->releaseYear = $releaseYear;

        return $this;
    }

    /**
     * Get releaseYear
     *
     * @return int
     */
    public function getReleaseYear()
    {
        return $this->releaseYear;
    }

    /**
     * Set availability
     *
     * @param \DateTime $availability
     *
     * @return Content
     */
    public function setAvailability($availability)
    {
        $this->availability = $availability;

        return $this;
    }

    /**
     * Get availability
     *
     * @return \DateTime
     */
    public function getAvailability()
    {
        return $this->availability;
    }

    /**
     * Set duration
     *
     * @param string $duration
     *
     * @return Content
     */
    public function setDuration($duration)
    {
        $this->duration = $duration;

        return $this;
    }

    /**
     * Get duration
     *
     * @return string
     */
    public function getDuration()
    {
        return $this->duration;
    }

    /**
     * @return mixed
     */
    public function getCompany()
    {
        return $this->company;
    }

    /**
     * @param mixed $company
     */
    public function setCompany($company)
    {
        $this->company = $company;
    }

    /**
     * @return string
     */
    public function getWebsite()
    {
        return $this->website;
    }

    /**
     * @param string $website
     */
    public function setWebsite($website)
    {
        $this->website = $website;
    }

    /**
     * @return mixed
     */
    public function getSport()
    {
        return $this->sport;
    }

    /**
     * @param mixed $sport
     */
    public function setSport($sport)
    {
        $this->sport = $sport;
    }

    /**
     * @return Collection|RightsItemContent[]
     */
    public function getRightsItems()
    {
        return $this->rightsItems;
    }

    /**
     * @param mixed $rightsItems
     */
    public function setRightsItems($rightsItems)
    {
        $this->rightsItems = $rightsItems;
    }

    /**
     * @return mixed
     */
    public function getTournament()
    {
        return $this->tournament;
    }

    /**
     * @param mixed $tournament
     */
    public function setTournament($tournament)
    {
        $this->tournament = $tournament;
    }

    /**
     * @return mixed
     */
    public function getSeason()
    {
        return $this->season;
    }

    /**
     * @param mixed $season
     */
    public function setSeason($season)
    {
        $this->season = $season;
    }

    /**
     * @return mixed
     */
    public function getCustomId()
    {
        return $this->customId;
    }

    /**
     * @param mixed $customId
     */
    public function setCustomId($customId)
    {
        $this->customId = $customId;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param mixed $createAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return bool
     */
    public function isApproved()
    {
        return $this->approved;
    }

    /**
     * @param bool $approved
     */
    public function setApproved($approved)
    {
        $this->approved = $approved;
    }



}


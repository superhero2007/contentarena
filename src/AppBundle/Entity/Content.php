<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\Date;
use Doctrine\Common\Collections\ArrayCollection;

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
     * @ORM\Column(type="datetime", name="expires_at", nullable=true)
     */
    private $expiresAt;

    /**
     * @var string
     *
     * @ORM\Column(name="programName", type="string", length=255, nullable=true)
     */
    private $programName;

    /**
     * @var string
     *
     * @ORM\Column(name="programType", type="string", length=255, nullable=true)
     */
    private $programType;

    /**
     * @var string
     *
     * @ORM\Column(name="seriesType", type="string", length=255, nullable=true)
     */
    private $seriesType;

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
     * @var integer
     *
     * @ORM\Column(name="step", type="integer")
     */
    protected $step = 1;

    /**
     * @var boolean
     *
     * @ORM\Column(name="draft", type="boolean")
     */
    protected $draft = false;

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
     * @var array
     *
     * @ORM\Column(name="website", type="array", length=255, nullable=true)
     */
    private $website;

    /**
     * Many Content have Many Sales Packages.
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\SalesPackage",cascade={"persist"},fetch="LAZY")
     * @ORM\JoinTable(name="content_sales_package",
     *      joinColumns={@ORM\JoinColumn(name="content_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="content_sales_package_id", referencedColumnName="id")}
     *      )
     */
    private $salesPackages;

    /**
     * @var string
     *
     * @ORM\Column(name="own_license", type="string", length=255, nullable=true)
     */
    private $ownLicense;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", length=255, nullable=true)
     */
    private $image;

    /**
     * @var string
     *
     * @ORM\Column(name="brochure", type="string", length=255, nullable=true)
     */
    private $brochure;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company", inversedBy="content")
     * @ORM\JoinColumn(nullable=true)
     */
    private $company;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Sport")
     * @ORM\JoinTable(name="content_sports",
     *      joinColumns={@ORM\JoinColumn(name="content_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="content_sport_id", referencedColumnName="id")}
     *      )
     */
    private $sports;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\SportCategory")
     * @ORM\JoinColumn(nullable=true)
     */
    private $sportCategory;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Tournament")
     * @ORM\JoinColumn(nullable=true)
     */
    private $tournament;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Season")
     * @ORM\JoinTable(name="content_season",
     *      joinColumns={@ORM\JoinColumn(name="content_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="season_content_id", referencedColumnName="id")}
     *      )
     */
    private $seasons;


    /**
     * Many Content have Many RightsPackage.
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\RightsPackage", fetch="LAZY")
     * @ORM\JoinTable(name="content_rights_package",
     *      joinColumns={@ORM\JoinColumn(name="content_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="rights_package_id", referencedColumnName="id")}
     *      )
     */
    private $rightsPackage;

    /**
     * Many Content have Many ContentSelectedRights.
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\ContentSelectedRight",cascade={"persist"}, fetch="LAZY")
     * @ORM\JoinTable(name="content_selected_rights",
     *      joinColumns={@ORM\JoinColumn(name="content_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="content_selected_right_id", referencedColumnName="id")}
     *      )
     */
    private $selectedRights;


    /**
     * @ORM\Column(type="datetime", name="created_at", nullable=true)
     */
    private $createdAt;

    /**
     * Many Content have Many Installments.
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Installments",cascade={"persist"},fetch="LAZY")
     * @ORM\JoinTable(name="content_installments",
     *      joinColumns={@ORM\JoinColumn(name="content_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="content_installments_id", referencedColumnName="id")}
     *      )
     */
    private $installments;

    public function __construct() {
        $this->rightsPackage = new \Doctrine\Common\Collections\ArrayCollection();
        $this->seasons = new \Doctrine\Common\Collections\ArrayCollection();
        $this->selectedRights = new \Doctrine\Common\Collections\ArrayCollection();
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
     * @return array
     */
    public function getWebsite()
    {
        return $this->website;
    }

    /**
     * @param array $website
     */
    public function setWebsite($website)
    {
        $this->website = $website;
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
     * @return Collection|Season[]
     */
    public function getSeasons()
    {
        return $this->seasons;
    }

    /**
     * @param mixed $seasons
     */
    public function setSeason($seasons)
    {
        $this->seasons = $seasons;
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

    /**
     * @return string
     */
    public function getOwnLicense()
    {
        return $this->ownLicense;
    }

    /**
     * @param string $ownLicense
     */
    public function setOwnLicense($ownLicense)
    {
        $this->ownLicense = $ownLicense;
    }

    /**
     * @return string
     */
    public function getBrochure()
    {
        return $this->brochure;
    }

    /**
     * @param string $brochure
     */
    public function setBrochure($brochure)
    {
        $this->brochure = $brochure;
    }

    /**
     * @return mixed
     */
    public function getExpiresAt()
    {
        return $this->expiresAt;
    }

    /**
     * @param mixed $expiresAt
     */
    public function setExpiresAt($expiresAt)
    {
        $this->expiresAt = $expiresAt;
    }

    /**
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param string $image
     */
    public function setImage($image)
    {
        $this->image = $image;
    }

    /**
     * @return string
     */
    public function getProgramName()
    {
        return $this->programName;
    }

    /**
     * @param string $programName
     */
    public function setProgramName($programName)
    {
        $this->programName = $programName;
    }

    /**
     * @return string
     */
    public function getProgramType()
    {
        return $this->programType;
    }

    /**
     * @param string $programType
     */
    public function setProgramType($programType)
    {
        $this->programType = $programType;
    }

    /**
     * @return string
     */
    public function getSeriesType()
    {
        return $this->seriesType;
    }

    /**
     * @param string $seriesType
     */
    public function setSeriesType($seriesType)
    {
        $this->seriesType = $seriesType;
    }

    /**
     * @return mixed
     */
    public function getSportCategory()
    {
        return $this->sportCategory;
    }

    /**
     * @param mixed $sportCategory
     */
    public function setSportCategory($sportCategory)
    {
        $this->sportCategory = $sportCategory;
    }

    /**
     * @return mixed
     */
    public function getRightsPackage()
    {
        return $this->rightsPackage;
    }

    /**
     * @param mixed $rightsPackage
     */
    public function setRightsPackage($rightsPackage)
    {
        $this->rightsPackage = new ArrayCollection($rightsPackage);
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
    public function getSalesPackages()
    {
        return $this->salesPackages;
    }

    /**
     * @param mixed $salesPackages
     */
    public function setSalesPackages($salesPackages)
    {
        $this->salesPackages = $salesPackages;
    }

    /**
     * @param User $user
     * @return bool
     */
    public function isOwner(User $user)
    {
        if(!is_null($this->company)){
            return $this->company->getId() == $user->getCompany()->getId();
        }
        return false;
    }

    /**
     * @param \DateTime|null $now
     * @return bool
     */
    public function isExpired(\DateTime $now = null)
    {
        if ( $now == null ) $now = new \DateTime();
        return $this->expiresAt < $now;
    }

    /**
     * @return bool
     */
    public function isActive(){
        return $this->approved;
    }
    /**
     * @return bool
     */
    public function isDraft()
    {
        return $this->draft;
    }

    /**
     * @param bool $draft
     */
    public function setDraft($draft)
    {
        $this->draft = $draft;
    }

    /**
     * @return mixed
     */
    public function getSelectedRights()
    {
        return $this->selectedRights;
    }

    /**
     * @param mixed $selectedRights
     */
    public function setSelectedRights($selectedRights)
    {
        $this->selectedRights = $selectedRights;
    }


    public function getInstallments()
    {
        return $this->installments;
    }

    /**
     * @param mixed $installments
     */
    public function setInstallments($installments)
    {
        $this->installments = $installments;
    }

    public function getListingName(){
        $name = '';
        $seasons = $this->getSeasons();
        foreach($seasons as $season){
            $name = $name.' '.$season->getTournament()->getName().' '.$season->getName();
        }
        return $name;
    }

 /**
     * @return int
     */
    public function getStep()
    {
        return $this->step;
    }


    /**
     * @param int $step
     */
    public function setStep($step)
    {
        $this->step = $step;
    }}


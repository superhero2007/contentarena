<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints\Date;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\Groups;

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
     * @Groups({"listing", "closed", "board", "commercial"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\ListingStatus", inversedBy="content")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"listing", "board", "commercial"})
     */
    private $status;

    /**
     * @var string
     * @ORM\Column(name="custom_id", type="string", unique=true, nullable=true)
     * @Groups({"listing", "closed", "board", "commercial"})
     */
    protected $customId;

    /**
     * @var mixed
     *
     * @ORM\Column(name="signature", type="string", nullable=true)
     */
    private $signature;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     * @Groups({"listing"})
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="program_description", type="text", nullable=true)
     * @Groups({"listing"})
     */
    private $programDescription;

    /**
     * @ORM\Column(type="datetime", name="expires_at", nullable=true)
     * @Groups({"listing", "board"})
     */
    private $expiresAt;

    /**
     * @var integer
     *
     * @ORM\Column(name="step", type="integer")
     * @Groups({"board"})
     */
    protected $step = 1;

    /**
     * @var boolean
     * @Groups({"listing"})
     *
     */
    protected $watchlist = false;

    /**
     * @var object
     *
     * @ORM\Column(name="website", type="object", nullable=true)
     * @Groups({"listing"})
     */
    private $website;

    /**
     * Many Content have Many Sales Packages.
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\SalesPackage",cascade={"persist"},fetch="LAZY")
     * @ORM\JoinTable(name="content_sales_package",
     *      joinColumns={@ORM\JoinColumn(name="content_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="content_sales_package_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "board", "commercial"})
     */
    private $salesPackages;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", length=255, nullable=true)
     * @Groups({"listing", "commercial"})
     */
    private $image;

    /**
     * @var string
     *
     * @ORM\Column(name="start_date_mode", type="string", length=50, nullable=true)
     * @Groups({"listing"})
     */
    private $startDateMode;

    /**
     * @var string
     *
     * @ORM\Column(name="end_date_mode", type="string", length=50, nullable=true)
     * @Groups({"listing"})
     */
    private $endDateMode;

    /**
     * @var integer
     *
     * @ORM\Column(name="end_date_limit", type="integer", nullable=true)
     * @Groups({"listing"})
     */
    private $endDateLimit;

    /**
     * @ORM\Column(type="datetime", name="end_date", nullable=true)
     * @Groups({"listing"})
     */
    private $endDate;

    /**
     * @ORM\Column(type="datetime", name="start_date", nullable=true)
     * @Groups({"listing"})
     */
    private $startDate;

    /**
     * @var string
     *
     * @ORM\Column(name="vat", type="string", length=5, nullable=true)
     * @Groups({"listing"})
     */
    private $vat;

    /**
     * @var string
     *
     * @ORM\Column(name="edited_program_name", type="string", length=255, nullable=true)
     * @Groups({"listing"})
     */
    private $editedProgramName;

    /**
     * @var string
     *
     * @ORM\Column(name="edited_program_year", type="string", length=5, nullable=true)
     */
    private $editedProgramYear;

    /**
     * @var integer
     *
     * @ORM\Column(name="vat_percentage", type="integer", nullable=true)
     * @Groups({"listing"})
     */
    private $vatPercentage;

    /**
     * @var object
     * @ORM\Column(name="programs", type="object", nullable=true)
     * @Groups({"listing", "board"})
     */
    private $programs;

    /**
     * @var object
     * @ORM\Column(name="attachments", type="object", nullable=true)
     * @Groups({"listing"})
     */
    private $attachments;

    /**
     * @var object
     * @ORM\Column(name="annex", type="object", nullable=true)
     * @Groups({"listing"})
     */
    private $annex;

    /**
     * @var string
     *
     * @ORM\Column(name="custom_tournament", type="string", length=255, nullable=true)
     * @Groups({"listing"})
     */
    private $customTournament;

    /**
     * @var string
     *
     * @ORM\Column(name="custom_category", type="string", length=255, nullable=true)
     * @Groups({"listing"})
     */
    private $customCategory;

    /**
     * @var string
     *
     * @ORM\Column(name="custom_sport", type="string", length=255, nullable=true)
     * @Groups({"listing"})
     */
    private $customSport;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @Groups({"listing", "closed", "board", "commercial"})
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="brochure", type="string", length=255, nullable=true)
     */
    private $brochure;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Country")
     * @ORM\JoinColumn(name="jurisdiction", referencedColumnName="id")
     */
    private $jurisdiction;

    /**
     * @var boolean
     * @ORM\Column(name="apply_vat_in_jurisdiction", type="boolean")
     * @Groups({"listing"})
     *
     */
    private $applyVatInJurisdiction = false;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company", inversedBy="content")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"listing", "closed", "commercial"})
     */
    private $company;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Sport")
     * @ORM\JoinTable(name="content_sports",
     *      joinColumns={@ORM\JoinColumn(name="content_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="content_sport_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "commercial"})
     */
    private $sports;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\SportCategory")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"listing", "commercial"})
     */
    private $sportCategory;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Tournament")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"listing", "board", "commercial"})
     */
    private $tournament;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Season",cascade={"persist"})
     * @ORM\JoinTable(name="content_season",
     *      joinColumns={@ORM\JoinColumn(name="content_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="season_content_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "board", "commercial"})
     */
    private $seasons;

    /**
     * Many Content have Many RightsPackage.
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\RightsPackage", fetch="LAZY")
     * @ORM\JoinTable(name="content_rights_package",
     *      joinColumns={@ORM\JoinColumn(name="content_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="rights_package_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "closed", "board", "commercial"})
     */
    private $rightsPackage;

    /**
     * @var object
     * @ORM\Column(name="selected_rights_by_super_right", type="object", nullable=true)
     * @Groups({"listing", "board", "commercial"})
     */
    private $selectedRightsBySuperRight;

    /**
     * @var object
     * @ORM\Column(name="schedules_by_season", type="object", nullable=true)
     * @Groups({"listing", "commercial"})
     */
    private $schedulesBySeason;

    /**
     * @var object
     * @ORM\Column(name="fixtures_by_season", type="object", nullable=true)
     * @Groups({"listing", "commercial"})
     */
    private $fixturesBySeason;

    /**
     * @var object
     * @ORM\Column(name="extra_data", type="object", nullable=true)
     * @Groups({"listing", "commercial"})
     */
    private $extraData;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Country")
     * @ORM\JoinColumn(name="law", referencedColumnName="id")
     * @Groups({"listing", "commercial"})
     */
    private $law;

    /**
     * @ORM\Column(type="datetime", name="created_at", nullable=true)
     * @Groups({"listing", "commercial"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", name="last_action_date", nullable=true)
     * @Groups({"board"})
     */
    private $lastActionDate;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\ListingLastAction", inversedBy="content")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"board"})
     */
    private $lastAction;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="content")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"board"})
     */
    private $lastActionUser;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="content")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"listing","board"})
     */
    private $owner;

    /**
     * @var mixed
     *
     * @ORM\Column(name="seller_signature_date", type="datetime", nullable=true)
     */
    private $sellerSignatureDate;

    /**
     * @var boolean;
     * @Groups({"board"})
     */
    private $editable = true;

    /**
     * @var boolean;
     * @Groups({"board"})
     */
    private $hasPendingBids = false;

    /**
     * @var boolean;
     * @Groups({"board"})
     */
    private $hasActivity = false;

    /**
     * @var boolean;
     * @Groups({"board"})
     */
    private $userCanNotView = false;

    /**
     * @var boolean;
     * @Groups({"details"})
     */
    private $userCanNotBuy = false;

    /**
     * @var array;
     * @Groups({"details"})
     */
    private $bundlesWithActivity = array();

    /**
     * @var array;
     * @Groups({"details"})
     */
    private $bundlesSold = array();


    public function __construct() {
        $this->rightsPackage = new ArrayCollection();
        $this->seasons = new ArrayCollection();
        $this->selectedRights = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->getName();
    }

    public function __clone()
    {
        $this->id = null;
    }

    /**
     * @return bool
     */
    public function isHasActivity()
    {
        return $this->hasActivity;
    }

    /**
     * @param bool $hasActivity
     */
    public function setHasActivity($hasActivity)
    {
        $this->hasActivity = $hasActivity;
    }

    /**
     * @return bool
     */
    public function isHasPendingBids()
    {
        return $this->hasPendingBids;
    }

    /**
     * @param bool $hasPendingBids
     */
    public function setHasPendingBids($hasPendingBids)
    {
        $this->hasPendingBids = $hasPendingBids;
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
     * @return bool
     */
    public function getApplyVatInJurisdiction()
    {
        return $this->applyVatInJurisdiction;
    }

    /**
     * @param bool $applyVatInJurisdiction
     */
    public function setApplyVatInJurisdiction($applyVatInJurisdiction)
    {
        $this->applyVatInJurisdiction = $applyVatInJurisdiction;
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
     * @param mixed $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
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
     * @return object
     */
    public function getSelectedRightsBySuperRight()
    {
        return $this->selectedRightsBySuperRight;
    }

    /**
     * @param object $selectedRightsBySuperRight
     */
    public function setSelectedRightsBySuperRight($selectedRightsBySuperRight)
    {
        $this->selectedRightsBySuperRight = $selectedRightsBySuperRight;
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
        return true;
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
    }

    /**
     * @return string
     */
    public function getCustomTournament()
    {
        return $this->customTournament;
    }

    /**
     * @param string $customTournament
     */
    public function setCustomTournament($customTournament)
    {
        $this->customTournament = $customTournament;
    }

    /**
     * @return string
     */
    public function getCustomSport()
    {
        return $this->customSport;
    }

    /**
     * @param string $customSport
     */
    public function setCustomSport($customSport)
    {
        $this->customSport = $customSport;
    }


    /**
     * Add salesPackage
     *
     * @param \AppBundle\Entity\SalesPackage $salesPackage
     *
     * @return Content
     */
    public function addSalesPackage(SalesPackage $salesPackage)
    {
        $this->salesPackages[] = $salesPackage;

        return $this;
    }

    /**
     * Remove salesPackage
     *
     * @param \AppBundle\Entity\SalesPackage $salesPackage
     */
    public function removeSalesPackage(SalesPackage $salesPackage)
    {
        $this->salesPackages->removeElement($salesPackage);
    }

    /**
     * Add sport
     *
     * @param \AppBundle\Entity\Sport $sport
     *
     * @return Content
     */
    public function addSport(Sport $sport)
    {
        $this->sports[] = $sport;

        return $this;
    }

    /**
     * Remove sport
     *
     * @param \AppBundle\Entity\Sport $sport
     */
    public function removeSport(Sport $sport)
    {
        $this->sports->removeElement($sport);
    }

    /**
     * Add season
     *
     * @param \AppBundle\Entity\Season $season
     *
     * @return Content
     */
    public function addSeason(Season $season)
    {
        $this->seasons[] = $season;

        return $this;
    }

    /**
     * Remove season
     *
     * @param \AppBundle\Entity\Season $season
     */
    public function removeSeason(Season $season)
    {
        $this->seasons->removeElement($season);
    }

    /**
     * Add rightsPackage
     *
     * @param \AppBundle\Entity\RightsPackage $rightsPackage
     *
     * @return Content
     */
    public function addRightsPackage(RightsPackage $rightsPackage)
    {
        $this->rightsPackage[] = $rightsPackage;

        return $this;
    }

    /**
     * Remove rightsPackage
     *
     * @param \AppBundle\Entity\RightsPackage $rightsPackage
     */
    public function removeRightsPackage(RightsPackage $rightsPackage)
    {
        $this->rightsPackage->removeElement($rightsPackage);
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
     * @return object
     */
    public function getSchedulesBySeason()
    {
        return $this->schedulesBySeason;
    }

    /**
     * @param object $schedulesBySeason
     */
    public function setSchedulesBySeason($schedulesBySeason)
    {
        $this->schedulesBySeason = $schedulesBySeason;
    }

    /**
     * @return object
     */
    public function getFixturesBySeason()
    {
        return $this->fixturesBySeason;
    }

    /**
     * @param object $fixturesBySeason
     */
    public function setFixturesBySeason($fixturesBySeason)
    {
        $this->fixturesBySeason = $fixturesBySeason;
    }

    /**
     * @return string
     */
    public function getStartDateMode()
    {
        return $this->startDateMode;
    }

    /**
     * @param string $startDateMode
     */
    public function setStartDateMode($startDateMode)
    {
        $this->startDateMode = $startDateMode;
    }

    /**
     * @return string
     */
    public function getEndDateMode()
    {
        return $this->endDateMode;
    }

    /**
     * @param string $endDateMode
     */
    public function setEndDateMode($endDateMode)
    {
        $this->endDateMode = $endDateMode;
    }

    /**
     * @return mixed
     */
    public function getEndDate()
    {
        return $this->endDate;
    }

    /**
     * @param mixed $endDate
     */
    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;
    }

    /**
     * @return mixed
     */
    public function getStartDate()
    {
        return $this->startDate;
    }

    /**
     * @param mixed $startDate
     */
    public function setStartDate($startDate)
    {
        $this->startDate = $startDate;
    }

    /**
     * @return string
     */
    public function getVat()
    {
        return $this->vat;
    }

    /**
     * @param string $vat
     */
    public function setVat($vat)
    {
        $this->vat = $vat;
    }

    /**
     * @return int
     */
    public function getVatPercentage()
    {
        return $this->vatPercentage;
    }

    /**
     * @param int $vatPercentage
     */
    public function setVatPercentage($vatPercentage)
    {
        $this->vatPercentage = $vatPercentage;
    }

    /**
     * @return object
     */
    public function getPrograms()
    {
        return $this->programs;
    }

    /**
     * @param object $programs
     */
    public function setPrograms($programs)
    {
        $this->programs = $programs;
    }

    /**
     * @return int
     */
    public function getEndDateLimit()
    {
        return $this->endDateLimit;
    }

    /**
     * @param int $endDateLimit
     */
    public function setEndDateLimit($endDateLimit)
    {
        $this->endDateLimit = $endDateLimit;
    }

    /**
     * @return mixed
     */
    public function getJurisdiction()
    {
        return $this->jurisdiction;
    }

    /**
     * @param mixed $jurisdiction
     */
    public function setJurisdiction($jurisdiction)
    {
        $this->jurisdiction = $jurisdiction;
    }

    /**
     * @return object
     */
    public function getAttachments()
    {
        return $this->attachments;
    }

    /**
     * @param object $attachments
     */
    public function setAttachments($attachments)
    {
        $this->attachments = $attachments;
    }

    /**
     * @return bool
     */
    public function isWatchlist()
    {
        return $this->watchlist;
    }

    /**
     * @param bool $watchlist
     */
    public function setWatchlist($watchlist)
    {
        $this->watchlist = $watchlist;
    }

    /**
     * @return mixed
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

    /**
     * @return bool
     */
    public function isEditable()
    {
        return $this->editable;
    }

    /**
     * @param bool $editable
     */
    public function setEditable($editable)
    {
        $this->editable = $editable;
    }

    /**
     * @return mixed
     */
    public function getLastActionDate()
    {
        return $this->lastActionDate;
    }

    /**
     * @param mixed $lastActionDate
     */
    public function setLastActionDate($lastActionDate)
    {
        $this->lastActionDate = $lastActionDate;
    }

    /**
     * @return mixed
     */
    public function getLastAction()
    {
        return $this->lastAction;
    }

    /**
     * @param mixed $lastAction
     */
    public function setLastAction($lastAction)
    {
        $this->lastAction = $lastAction;
    }

    /**
     * @return mixed
     */
    public function getLastActionUser()
    {
        return $this->lastActionUser;
    }

    /**
     * @param mixed $lastActionUser
     */
    public function setLastActionUser($lastActionUser)
    {
        $this->lastActionUser = $lastActionUser;
    }

    /**
     * @return string
     */
    public function getProgramDescription()
    {
        return $this->programDescription;
    }

    /**
     * @param string $programDescription
     */
    public function setProgramDescription($programDescription)
    {
        $this->programDescription = $programDescription;
    }

    /**
     * @return object
     */
    public function getExtraData()
    {
        return $this->extraData;
    }

    /**
     * @param object $extraData
     */
    public function setExtraData($extraData)
    {
        $this->extraData = $extraData;
    }

    /**
     * @return mixed
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * @param mixed $owner
     */
    public function setOwner($owner)
    {
        $this->owner = $owner;
    }

    /**
     * @return mixed
     */
    public function getSignature()
    {
        return $this->signature;
    }

    /**
     * @param mixed $signature
     */
    public function setSignature($signature)
    {
        $this->signature = $signature;
    }

    /**
     * @return string
     */
    public function getCustomCategory()
    {
        return $this->customCategory;
    }

    /**
     * @param string $customCategory
     */
    public function setCustomCategory($customCategory)
    {
        $this->customCategory = $customCategory;
    }

    /**
     * @return object
     */
    public function getAnnex()
    {
        return $this->annex;
    }

    /**
     * @param object $annex
     */
    public function setAnnex($annex)
    {
        $this->annex = $annex;
    }

    /**
     * @return string
     */
    public function getLaw()
    {
        return $this->law;
    }

    /**
     * @param string $law
     */
    public function setLaw($law)
    {
        $this->law = $law;
    }

    /**
     * @return mixed
     */
    public function getSellerSignatureDate()
    {
        return $this->sellerSignatureDate;
    }

    /**
     * @param mixed $sellerSignatureDate
     */
    public function setSellerSignatureDate($sellerSignatureDate)
    {
        $this->sellerSignatureDate = $sellerSignatureDate;
    }

    /**
     * @return string
     */
    public function getEditedProgramName()
    {
        return $this->editedProgramName;
    }

    /**
     * @param string $editedProgramName
     */
    public function setEditedProgramName($editedProgramName)
    {
        $this->editedProgramName = $editedProgramName;
    }


    public function userIsCompanyMember($user){

        $isMember = false;
        /* @var Company $company*/
        $company = $this->getCompany();
        foreach ($company->getUsers() as $users){ if ($users == $user) $isMember= true; }

        return $isMember;
    }

    /**
     * @return bool
     */
    public function isUserCanNotView()
    {
        return $this->userCanNotView;
    }

    /**
     * @param bool $userCanNotView
     */
    public function setUserCanNotView($userCanNotView)
    {
        $this->userCanNotView = $userCanNotView;
    }

    /**
     * @return bool
     */
    public function isUserCanNotBuy()
    {
        return $this->userCanNotBuy;
    }

    /**
     * @param bool $userCanNotBuy
     */
    public function setUserCanNotBuy($userCanNotBuy)
    {
        $this->userCanNotBuy = $userCanNotBuy;
    }

    /**
     * @return array
     */
    public function getBundlesWithActivity()
    {
        return $this->bundlesWithActivity;
    }

    /**
     * @param array $bundlesWithActivity
     */
    public function setBundlesWithActivity($bundlesWithActivity)
    {
        $this->bundlesWithActivity = $bundlesWithActivity;
    }

    /**
     * @return string
     */
    public function getEditedProgramYear()
    {
        return $this->editedProgramYear;
    }

    /**
     * @param string $editedProgramYear
     */
    public function setEditedProgramYear($editedProgramYear)
    {
        $this->editedProgramYear = $editedProgramYear;
    }

    /**
     * @return array
     */
    public function getBundlesSold()
    {
        return $this->bundlesSold;
    }

    /**
     * @param array $bundlesSold
     */
    public function setBundlesSold($bundlesSold)
    {
        $this->bundlesSold = $bundlesSold;
    }




}

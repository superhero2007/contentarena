<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\VirtualProperty;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Listing
 *
 * @ORM\Table(name="listing")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ListingRepository")
 */
class Listing implements NotifiableInterface
{

    static protected $FINAL_STEP = 5;

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"listing", "closed", "commercial", "thread", "home", "property", "draft"})
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="custom_id", type="string", unique=true, nullable=true)
     * @Groups({"listing", "closed", "commercial", "thread", "home", "propertyList", "property", "draft", "createListing"})
     */
    protected $customId;

    /**
     * @Serializer\Type("array<AppBundle\Entity\ListingRight>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\ListingRight",cascade={"persist"})
     * @ORM\JoinTable(name="listing_rights",
     *      joinColumns={@ORM\JoinColumn(name="listing_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="listing_right_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "property", "createListing"})
     */
    private $rights;

    /**
     * @Serializer\Type("array<PropertyEventItem<AppBundle\Entity\Tournament>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Tournament",cascade={"persist"})
     * @ORM\JoinTable(name="listing_tournaments",
     *      joinColumns={@ORM\JoinColumn(name="listing_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="listing_tournament_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "property", "createListing"})
     */
    private $tournaments;

    /**
     * @Serializer\Type("array<PropertyEventItem<AppBundle\Entity\Sport>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Sport")
     * @ORM\JoinTable(name="listing_sports",
     *      joinColumns={@ORM\JoinColumn(name="listing_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="listing_sport_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "property"})
     */
    private $sports;

    /**
     * @Serializer\Type("array<PropertyEventItem<AppBundle\Entity\SportCategory>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\SportCategory",cascade={"persist"})
     * @ORM\JoinTable(name="listing_sport_categories",
     *      joinColumns={@ORM\JoinColumn(name="listing_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="listing_sport_category_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "property"})
     */
    private $sportCategories;

    /**
     * @Serializer\Type("array<PropertyEventItem<AppBundle\Entity\Season>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Season",cascade={"persist"})
     * @ORM\JoinTable(name="listing_season",
     *      joinColumns={@ORM\JoinColumn(name="listing_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="season_listing_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "property", "createListing"})
     */
    private $seasons;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="description", type="text", nullable=true)
     * @Groups({"listing", "home", "preview", "createListing"})
     */
    private $description;

    /**
     * @ORM\Column(type="datetime", name="expires_at", nullable=true)
     * @Groups({"listing", "board", "home", "propertyList", "property", "createListing"})
     */
    private $expiresAt;

    /**
     * @var integer
     * @Serializer\Type("integer")
     * @ORM\Column(name="step", type="integer")
     * @Groups({"board", "home", "property", "createListing"})
     */
    protected $step = 1;

    /**
     * @var integer
     *
     * @ORM\Column(name="maxStep", type="smallint")
     * @Groups({"listing", "board", "home", "createListing"})
     */
    protected $maxStep = 1;

    /**
     * @var array
     * @Serializer\Type("string")
     * @ORM\Column(name="website", type="object", nullable=true)
     * @Groups({"listing", "home", "createListing"})
     */
    private $website;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", length=255, nullable=true)
     * @Groups({"listing", "commercial", "home", "preview", "createListing"})
     */
    private $image;

    /**
     * @Serializer\Type("array<PropertyEventItem<AppBundle\Entity\EditedProgram>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\EditedProgram",cascade={"persist"})
     * @ORM\JoinTable(name="listing_edited_programs",
     *      joinColumns={@ORM\JoinColumn(name="listing_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="edited_program_listing_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "property", "createListing"})
     */
    private $programs;

    /**
     * @Serializer\Type("array<AppBundle\Entity\TerritorialBundle>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\TerritorialBundle",cascade={"persist"})
     * @ORM\JoinTable(name="listing_bundles",
     *      joinColumns={@ORM\JoinColumn(name="listing_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="bundle_listing_id", referencedColumnName="id")}
     *      )
     * @Groups({"listing", "createListing"})
     */
    private $bundles;

    /**
     * @var object
     * @Serializer\Type("array")
     * @ORM\Column(name="attachments", type="object", nullable=true)
     * @Groups({"details", "home", "createListing"})
     */
    private $attachments;

    /**
     * @var object
     * @Serializer\Type("array")
     * @ORM\Column(name="annex", type="object", nullable=true)
     * @Groups({"details", "home", "createListing"})
     */
    private $annex;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @Groups({"listing", "closed", "board", "commercial", "thread", "home", "preview", "propertyList", "property"})
     */
    private $name;

    /**
     * @var int
     *
     * @ORM\Column(name="relevance", type="smallint", options={"default":1})
     * @Assert\Range(
     *     min = 1,
     *     max = 5,
     *     minMessage = "Min value is {{ limit }}",
     *     maxMessage = "Max value is {{ limit }}"
     *     )
     */
    private $relevance;

    /**
     * @var string
     * @ORM\Column(name="jurisdiction", type="string", length=255, nullable=true)
     * @Groups({"home"})
     */
    private $jurisdiction;

    /**
     * @var boolean
     * @ORM\Column(name="featured", type="boolean", options={"default":"0"})
     * @Groups({"listing", "commercial", "home", "preview"})
     *
     */
    private $featured = false;

    /**
     * @var int
     * @ORM\Column(name="featured_position", type="smallint", nullable=true)
     * @Groups({"listing", "home"})
     *
     */
    private $featuredPosition;

    /**
     * @var boolean
     * @ORM\Column(name="expiry_notified", type="boolean")
     * @Groups({"listing", "home"})
     *
     */
    private $expiryNotified = false;

    /**
     * @var boolean
     * @ORM\Column(name="expired_notified", type="boolean")
     * @Groups({"listing", "home"})
     *
     */
    private $expiredNotified = false;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"listing", "closed", "commercial", "home", "property", "createListing"})
     */
    private $company;

    /**
     * @Serializer\Type("CustomIdItem<AppBundle\Entity\Property>")
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Property")
     * @ORM\JoinColumn(nullable=true)
     */
    private $property;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Country")
     * @ORM\JoinColumn(name="law", referencedColumnName="id")
     * @Groups({"listing", "commercial", "home"})
     */
    private $law;

    /**
     * @ORM\Column(type="datetime", name="created_at", nullable=true)
     * @Groups({"listing", "commercial", "home", "property"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", name="published_at", nullable=true)
     * @Groups({"listing", "commercial", "home"})
     */
    private $publishedAt;

    /**
     * @ORM\Column(type="datetime", name="last_action_date", nullable=true)
     * @Groups({"board", "home", "propertyList", "property"})
     */
    private $lastActionDate;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\ListingLastAction")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"board", "home", "propertyList", "property"})
     */
    private $lastAction;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"board", "home", "property"})
     */
    private $lastActionUser;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"listing","board", "home", "propertyList", "property"})
     */
    private $owner;

    /**
     * @var boolean;
     * @Groups({"board", "home"})
     */
    private $editable = true;

    /**
     * @var boolean;
     * @Groups({"board"})
     */
    private $hasPendingBids = false;

    /**
     * @var boolean;
     * @Groups({"board", "propertyList", "property"})
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
     * @var boolean;
     */
    private $active = false;

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

    /**
     * @ORM\Column(type="datetime", name="main_event_date", nullable=true)
     * @Groups({"listing", "home"})
     */
    private $mainEventDate;

    /**
     * @var mixed;
     *
     * @Groups({"listing"})
     */
    private $addedBy;

    /**
     * @Groups({"propertyList", "property"})
     */
    private $bids;

    public function __construct()
    {
        $this->seasons = new ArrayCollection();
    }

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
    public function getCustomId()
    {
        return $this->customId;
    }

    /**
     * @param string $customId
     */
    public function setCustomId($customId)
    {
        $this->customId = $customId;
    }

    /**
     * @return mixed
     */
    public function getRights()
    {
        return $this->rights;
    }

    /**
     * @param mixed $rights
     */
    public function setRights($rights)
    {
        $this->rights = $rights;
    }

    /**
     * @return mixed
     */
    public function getTournaments()
    {
        return $this->tournaments;
    }

    /**
     * @param mixed $tournaments
     */
    public function setTournaments($tournaments)
    {
        $this->tournaments = $tournaments;
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
    public function getSportCategories()
    {
        return $this->sportCategories;
    }

    /**
     * @param mixed $sportCategories
     */
    public function setSportCategories($sportCategories)
    {
        $this->sportCategories = $sportCategories;
    }

    /**
     * @return mixed
     */
    public function getSeasons()
    {
        return $this->seasons;
    }

    /**
     * @param mixed $seasons
     */
    public function setSeasons($seasons)
    {
        $this->seasons = $seasons;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
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
     * @return int
     */
    public function getMaxStep()
    {
        return $this->maxStep;
    }

    /**
     * @param int $maxStep
     */
    public function setMaxStep($maxStep)
    {
        $this->maxStep = $maxStep;
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
    public function getRelevance()
    {
        return $this->relevance;
    }

    /**
     * @param int $relevance
     */
    public function setRelevance($relevance)
    {
        $this->relevance = $relevance;
    }

    /**
     * @return string
     */
    public function getJurisdiction()
    {
        return $this->jurisdiction;
    }

    /**
     * @param string $jurisdiction
     */
    public function setJurisdiction($jurisdiction)
    {
        $this->jurisdiction = $jurisdiction;
    }

    /**
     * @return bool
     */
    public function isFeatured()
    {
        return $this->featured;
    }

    /**
     * @param bool $featured
     */
    public function setFeatured($featured)
    {
        $this->featured = $featured;
    }

    /**
     * @return int
     */
    public function getFeaturedPosition()
    {
        return $this->featuredPosition;
    }

    /**
     * @param int $featuredPosition
     */
    public function setFeaturedPosition($featuredPosition)
    {
        $this->featuredPosition = $featuredPosition;
    }

    /**
     * @return bool
     */
    public function isExpiryNotified()
    {
        return $this->expiryNotified;
    }

    /**
     * @param bool $expiryNotified
     */
    public function setExpiryNotified($expiryNotified)
    {
        $this->expiryNotified = $expiryNotified;
    }

    /**
     * @return bool
     */
    public function isExpiredNotified()
    {
        return $this->expiredNotified;
    }

    /**
     * @param bool $expiredNotified
     */
    public function setExpiredNotified($expiredNotified)
    {
        $this->expiredNotified = $expiredNotified;
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
     * @return mixed
     */
    public function getProperty()
    {
        return $this->property;
    }

    /**
     * @param mixed $property
     */
    public function setProperty($property)
    {
        $this->property = $property;
    }

    /**
     * @return mixed
     */
    public function getLaw()
    {
        return $this->law;
    }

    /**
     * @param mixed $law
     */
    public function setLaw($law)
    {
        $this->law = $law;
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
     * @return mixed
     */
    public function getPublishedAt()
    {
        return $this->publishedAt;
    }

    /**
     * @param mixed $publishedAt
     */
    public function setPublishedAt($publishedAt)
    {
        $this->publishedAt = $publishedAt;
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
     * @param User $user
     * @return bool
     * @VirtualProperty()
     */
    public function userCanEdit(User $user)
    {
        return $this->getCompany()->getId() == $user->getCompany()->getId();
    }

    /**
     * @return bool
     */
    public function isActive()
    {
        return $this->active;
    }

    /**
     * @param bool $active
     */
    public function setActive($active)
    {
        $this->active = $active;
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

    /**
     * @return mixed
     */
    public function getMainEventDate()
    {
        return $this->mainEventDate;
    }

    /**
     * @param mixed $mainEventDate
     */
    public function setMainEventDate($mainEventDate)
    {
        $this->mainEventDate = $mainEventDate;
    }

    /**
     * @return mixed
     */
    public function getAddedBy()
    {
        return $this->addedBy;
    }

    /**
     * @param mixed $addedBy
     */
    public function setAddedBy($addedBy)
    {
        $this->addedBy = $addedBy;
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
     * @return mixed
     */
    public function getBundles()
    {
        return $this->bundles;
    }

    /**
     * @param mixed $bundles
     */
    public function setBundles($bundles)
    {
        $this->bundles = $bundles;
    }

    public function incrementStep()
    {
        if ($this->getMaxStep() < $this->getStep()) {
            $this->setMaxStep($this->getStep());
        }

    }


}


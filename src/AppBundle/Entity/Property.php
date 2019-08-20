<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Groups;

/**
 * Property
 *
 * @ORM\Table(name="property")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PropertyRepository")
 */
class Property implements NotifiableInterface
{
    /**
     * @var int
     * @Serializer\Type("integer")
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"property", "propertyList"})
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="custom_id", type="string", unique=true, nullable=true)
     * @Groups({"property", "propertyList"})
     */
    protected $customId;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", length=255, nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $image;

    /**
     * @var string
     *
     * @ORM\Column(name="website", type="string", length=255, nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $website;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $description;

    /**
     * @var object
     * @ORM\Column(name="attachments", type="object", nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $attachments;

    /**
     * @ORM\Column(type="datetime", name="created_at", nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $createdAt;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $company;

    /**
     * @Serializer\Type("array<PropertyEventItem<AppBundle\Entity\Sport>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Sport",cascade={"persist"})
     * @ORM\JoinTable(name="property_sports",
     *      joinColumns={@ORM\JoinColumn(name="property_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="property_sport_id", referencedColumnName="id")}
     *      )
     * @Groups({"property", "propertyList"})
     */
    private $sports;

    /**
     * @Serializer\Type("array<PropertyEventItem<AppBundle\Entity\SportCategory>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\SportCategory",cascade={"persist"})
     * @ORM\JoinTable(name="property_sport_categories",
     *      joinColumns={@ORM\JoinColumn(name="property_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="property_sport_category_id", referencedColumnName="id")}
     *      )
     * @Groups({"property"})
     */
    private $sportCategory;

    /**
     * @Serializer\Type("array<PropertyEventItem<AppBundle\Entity\Tournament>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Tournament",cascade={"persist"})
     * @ORM\JoinTable(name="property_tournaments",
     *      joinColumns={@ORM\JoinColumn(name="property_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="property_tournament_id", referencedColumnName="id")}
     *      )
     * @Groups({"property"})
     */
    private $tournament;

    /**
     * @Serializer\Type("array<PropertyEventItem<AppBundle\Entity\Season>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Season",cascade={"persist"})
     * @ORM\JoinTable(name="property_season",
     *      joinColumns={@ORM\JoinColumn(name="property_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="season_property_id", referencedColumnName="id")}
     *      )
     * @Groups({"property"})
     */
    private $seasons;

    /**
     * @Serializer\Type("array<AppBundle\Entity\PropertyRight>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\PropertyRight",cascade={"persist"})
     * @ORM\JoinTable(name="property_rights",
     *      joinColumns={@ORM\JoinColumn(name="property_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="property_right_id", referencedColumnName="id")}
     *      )
     * @Groups({"property"})
     */
    private $rights;

    /**
     * @Serializer\Type("array<AppBundle\Entity\Content>")
     * @var array<AppBundle\Entity\Content>
     * @Groups({"property", "propertyList"})
     */
    private $listings;

    /**
     * @var integer
     * @Groups({"property", "propertyList"})
     */
    private $openBids;

    /**
     * @var integer
     * @Groups({"property", "propertyList"})
     */
    private $closedBids;

    /**
     * @var integer
     * @Groups({"property", "propertyList"})
     */
    private $declinedBids;

    /**
     * @Serializer\Type("array<AppBundle\Entity\EditedProgram>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\EditedProgram",cascade={"persist"})
     * @ORM\JoinTable(name="property_edited_programs",
     *      joinColumns={@ORM\JoinColumn(name="property_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="property_edited_program_id", referencedColumnName="id")}
     *      )
     * @Groups({"property"})
     */
    private $programs;

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
     * @return array
     */
    public function getListings()
    {
        return $this->listings;
    }

    /**
     * @param array $listings
     */
    public function setListings($listings)
    {
        $this->listings = $listings;
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
     * Set description
     *
     * @param string $description
     *
     * @return Property
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
     * @return Season
     */
    public function getSeasons()
    {
        return $this->seasons;
    }

    /**
     * @param array $seasons
     */
    public function setSeasons($seasons)
    {
        $this->seasons = $seasons;
    }

    /**
     * @return array
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
     * @return int
     */
    public function getOpenBids()
    {
        return $this->openBids;
    }

    /**
     * @param int $openBids
     */
    public function setOpenBids($openBids)
    {
        $this->openBids = $openBids;
    }

    /**
     * @return int
     */
    public function getClosedBids()
    {
        return $this->closedBids;
    }

    /**
     * @param int $closedBids
     */
    public function setClosedBids($closedBids)
    {
        $this->closedBids = $closedBids;
    }

    /**
     * @return int
     */
    public function getDeclinedBids()
    {
        return $this->declinedBids;
    }

    /**
     * @param int $declinedBids
     */
    public function setDeclinedBids($declinedBids)
    {
        $this->declinedBids = $declinedBids;
    }

    /**
     * @return array
     */
    public function getPrograms()
    {
        return $this->programs;
    }

    /**
     * @param array $programs
     */
    public function setPrograms($programs)
    {
        $this->programs = $programs;
    }

}


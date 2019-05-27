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




}


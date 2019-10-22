<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation as Serializer;

/**
 * Fixture
 *
 * @ORM\Table(name="deal")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\DealRepository")
 */
class Deal
{
    /**
     * @var int
     *
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
     * @var int
     * @Serializer\Type("integer")
     * @ORM\Column(name="fee", type="bigint")
     * @Groups({"property", "propertyList"})
     */
    private $fee;

    /**
     * @var string
     *
     * @ORM\Column(name="buyer_company_name", type="string", length=255, nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $buyerCompanyName;

    /**
     * @Serializer\Type("CustomIdItem<AppBundle\Entity\Property>")
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Property" )
     * @ORM\JoinColumn(nullable=true)
     */
    private $property;

    /**
     * @Serializer\Type("CustomIdItem<AppBundle\Entity\Listing>")
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Listing" )
     * @ORM\JoinColumn(nullable=true)
     */
    private $listing;

    /**
     * @var boolean
     * @ORM\Column(name="custom", type="boolean")
     * @Groups({"property", "propertyList"})
     */
    private $custom = false;

    /**
     * @Serializer\Type("array<AppBundle\Entity\DealRight>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\DealRight",cascade={"persist"})
     * @ORM\JoinTable(name="deal_rights",
     *      joinColumns={@ORM\JoinColumn(name="deal_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="deal_right_id", referencedColumnName="id")}
     *      )
     * @Groups({"property", "propertyList"})
     */
    private $rights;

    /**
     * @Serializer\Type("array<PropertyEventItem<AppBundle\Entity\Season>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Season")
     * @ORM\JoinTable(name="deal_season",
     *      joinColumns={@ORM\JoinColumn(name="deal_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="season_deal_id", referencedColumnName="id")}
     *      )
     * @Groups({"property", "propertyList"})
     */
    private $seasons;

    /**
     * @ORM\Column(type="datetime", name="created_at", nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", name="updated_at", nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $updatedAt;

    /**
     * @Serializer\Type("array<AppBundle\Entity\TerritorialBundle>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\TerritorialBundle",cascade={"persist"})
     * @ORM\JoinTable(name="deal_bundles",
     *      joinColumns={@ORM\JoinColumn(name="deal_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="bundle_deal_id", referencedColumnName="id")}
     *      )
     * @Groups({"property", "propertyList"})
     */
    private $bundles;

    /**
     * @var object
     * @Serializer\Type("array")
     * @ORM\Column(name="attachments", type="object", nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $attachments;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $company;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $closedBy;

    /**
     * @var string
     * @ORM\Column(name="status", type="string", length=255, nullable=false)
     * @Groups({"property", "propertyList"})
     */
    private $status;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @Groups({"property", "propertyList"})
     */
    private $name;

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
     * @return string
     */
    public function getBuyerCompanyName()
    {
        return $this->buyerCompanyName;
    }

    /**
     * @param string $buyerCompanyName
     */
    public function setBuyerCompanyName($buyerCompanyName)
    {
        $this->buyerCompanyName = $buyerCompanyName;
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
    public function getListing()
    {
        return $this->listing;
    }

    /**
     * @param mixed $listing
     */
    public function setListing($listing)
    {
        $this->listing = $listing;
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
    public function getClosedBy()
    {
        return $this->closedBy;
    }

    /**
     * @param mixed $closedBy
     */
    public function setClosedBy($closedBy)
    {
        $this->closedBy = $closedBy;
    }

    /**
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param string $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
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
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @param mixed $updatedAt
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
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



}

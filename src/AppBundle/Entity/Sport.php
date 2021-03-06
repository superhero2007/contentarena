<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Groups;

/**
 * Sport
 *
 * @ORM\Table(name="sport")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SportRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Sport
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"listing", "commercial", "settings", "home", "notification", "preview", "property", "propertyList"})
     */
    private $id;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="name", type="string", length=255)
     * @Groups({"listing", "commercial", "settings", "home", "preview", "property", "propertyList"})
     */
    private $name;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="externalId", type="string", length=255, unique=true, nullable=true)
     * @Groups({"home", "notification", "property", "propertyList"})
     */
    private $externalId;

    /**
     * @var boolean
     * @ORM\Column(name="shown_in_create", type="boolean", options={"default":"1"})
     * @Groups({"listing", "commercial", "settings", "preview"})
     *
     */
     private $shownInCreate = false;

    /**
     * @var boolean
     * @ORM\Column(name="shown_in_wall", type="boolean", options={"default":"0"})
     * @Groups({"listing", "commercial", "settings"})
     *
     */
    private $shownInWall = false;

    /**
     * @var boolean
     * @ORM\Column(name="top_sport", type="boolean", options={"default":"0"})
     * @Groups({"listing", "commercial", "settings"})
     *
     */
    private $topSport = false;

    /**
     * @ORM\PrePersist
     */
    public function setDefaultExternalId() {

        if ($this->externalId !== null) return;
        $time = new \DateTime();
        $this->setExternalId("ca:sport:".$time->getTimestamp());
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
     * @return Sport
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
     * Set externalId
     *
     * @param string $externalId
     *
     * @return Sport
     */
    public function setExternalId($externalId)
    {
        $this->externalId = $externalId;

        return $this;
    }

    /**
     * Get externalId
     *
     * @return string
     */
    public function getExternalId()
    {
        return $this->externalId;
    }

    public function __toString()
    {
        return $this->name;
    }

    /**
     * @return bool
     */
    public function isShownInCreate()
    {
        return $this->shownInCreate;
    }

    /**
     * @param bool $shownInCreate
     */
    public function setShownInCreate($shownInCreate)
    {
        $this->shownInCreate = $shownInCreate;
    }

    /**
     * @return bool
     */
    public function isShownInWall()
    {
        return $this->shownInWall;
    }

    /**
     * @param bool $shownInWall
     */
    public function setShownInWall($shownInWall)
    {
        $this->shownInWall = $shownInWall;
    }

    /**
     * @return bool
     */
    public function isTopSport()
    {
        return $this->topSport;
    }

    /**
     * @param bool $topSport
     */
    public function setTopSport($topSport)
    {
        $this->topSport = $topSport;
    }



}


<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * Fixture
 *
 * @ORM\Table(name="fixture")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FixtureRepository")
 */
class Fixture
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"property"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @Groups({"property"})
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="round", type="string", length=255, nullable=true)
     * @Groups({"property"})
     */
    private $round;

    /**
     * @var string
     * @ORM\Column(name="externalId", type="string", length=255, nullable=true, unique=true)
     * @Groups({"property"})
     */
    private $externalId;

    /**
     * @ORM\Column(type="datetime", name="date", nullable=true)
     * @Groups({"property"})
     */
    private $date;

    /**
     * @var string
     *
     * @ORM\Column(name="time", type="string", length=5, nullable=true)
     * @Groups({"property"})
     */
    private $time;

    /**
     * @var string
     * @ORM\Column(name="timezone", type="string", length=255, nullable=true)
     * @Groups({"property"})
     */
    private $timezone;
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Season" )
     * @ORM\JoinColumn(nullable=true)
     */
    private $season;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Property" )
     * @ORM\JoinColumn(nullable=true)
     */
    private $property;

    /**
     * @var boolean
     * @ORM\Column(name="custom", type="boolean")
     * @Groups({"property"})
     */
    private $custom = false;


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
     * @return Fixture
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
     * @return string
     */
    public function getExternalId()
    {
        return $this->externalId;
    }

    /**
     * @param string $externalId
     */
    public function setExternalId($externalId)
    {
        $this->externalId = $externalId;
    }

    /**
     * @return mixed
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @param mixed $date
     */
    public function setDate($date)
    {
        $this->date = $date;
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
     * @return bool
     */
    public function isExternal()
    {
        return strpos($this->externalId, 'sr:') !== false;
    }

    /**
     * @return string
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * @param string $time
     */
    public function setTime($time)
    {
        $this->time = $time;
    }

    /**
     * @return string
     */
    public function getTimezone()
    {
        return $this->timezone;
    }

    /**
     * @param string $timezone
     */
    public function setTimezone($timezone)
    {
        $this->timezone = $timezone;
    }

    /**
     * @return string
     */
    public function getRound()
    {
        return $this->round;
    }

    /**
     * @param string $round
     */
    public function setRound($round)
    {
        $this->round = $round;
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




}


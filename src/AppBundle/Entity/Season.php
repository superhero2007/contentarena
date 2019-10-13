<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Groups;

/**
 * Season
 *
 * @ORM\Table(name="season")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SeasonRepository")
 */
class Season
{
    /**
     * @var int
     * @Serializer\Type("integer")
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"listing", "home", "preview", "property", "createListing"})
     */
    private $id;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="name", type="string", length=255)
     * @Groups({"listing", "board", "commercial", "home", "property", "createListing"})
     */
    private $name;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="externalId", type="string", length=255, nullable=true, unique=true)
     * @Groups({"listing", "home", "property", "createListing"})
     */
    private $externalId;

    /**
     * @Serializer\Type("DateTime<'Y-m-d'>")
     * @ORM\Column(type="datetime", name="start_date", nullable=true)
     * @Groups({"listing", "home", "preview", "property", "createListing"})
     */
    private $startDate;

    /**
     * @Serializer\Type("DateTime<'Y-m-d'>")
     * @ORM\Column(type="datetime", name="end_date", nullable=true)
     * @Groups({"listing", "home", "preview", "property", "createListing"})
     */
    private $endDate;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="year", type="string", length=255, nullable=true)
     * @Groups({"listing", "board", "commercial", "home", "preview", "property", "createListing"})
     */
    private $year;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Tournament" )
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"home", "property"})
     */
    private $tournament;

    /**
     * @Serializer\Type("boolean")
     * @var boolean
     * @ORM\Column(name="user_season", type="boolean")
     * @Groups({"home"})
     */
    private $userSeason = false;

    /**
     * @Serializer\Type("array")
     * @Groups({"property", "createListing"})
     */
    private $fixtures = array();


    /**
     * Set name
     *
     * @param string $name
     *
     * @return Season
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
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
     * @return Season
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
     * @return string
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * @param string $year
     */
    public function setYear($year)
    {
        $this->year = $year;
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
     * @return bool
     */
    public function isUserSeason()
    {
        return $this->userSeason;
    }

    /**
     * @param bool $userSeason
     */
    public function setUserSeason($userSeason)
    {
        $this->userSeason = $userSeason;
    }

    /**
     * @return mixed
     */
    public function getFixtures()
    {
        return $this->fixtures;
    }

    /**
     * @param mixed $fixtures
     */
    public function setFixtures($fixtures)
    {
        $this->fixtures = $fixtures;
    }




}


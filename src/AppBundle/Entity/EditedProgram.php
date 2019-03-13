<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Groups;

/**
 * EditedProgram
 *
 * @ORM\Table(name="edited_program")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EditedProgramRepository")
 */
class EditedProgram
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
     * @Serializer\Type("array<PropertyTerritoryItem<AppBundle\Entity\Country>>")
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Country")
     * @ORM\JoinTable(name="edited_program_territories",
     *      joinColumns={@ORM\JoinColumn(name="edited_program_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="edited_program_territory_id", referencedColumnName="id")}
     *      )
     * @Groups({"property"})
     */
    private $territories;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="territories_mode", type="string", length=255, nullable=true)
     * @Groups({"property"})
     */
    private $territoriesMode;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @Groups({"property"})
     */
    private $name;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="type", type="string", length=255, nullable=true)
     * @Groups({"property"})
     */
    private $type;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="description", type="text", nullable=true)
     * @Groups({"property"})
     */
    private $description;

    /**
     * @var integer
     * @Serializer\Type("integer")
     * @ORM\Column(name="release_year", type="integer", length=4, nullable=true)
     * @Groups({"property"})
     */
    private $releaseYear;

    /**
     * @var integer
     * @Serializer\Type("integer")
     * @ORM\Column(name="episodes", type="integer", length=5, nullable=true)
     * @Groups({"property"})
     */
    private $episodes;

    /**
     * @var integer
     * @Serializer\Type("integer")
     * @ORM\Column(name="episode_duration", type="integer", length=4, nullable=true)
     * @Groups({"property"})
     */
    private $episodeDuration;

    /**
     * @var boolean
     * @Serializer\Type("boolean")
     * @ORM\Column(name="similar_episodes_length", type="boolean")
     * @Groups({"property"})
     */
    private $similarEpisodesLength;

    /**
     * @var boolean
     * @Serializer\Type("boolean")
     * @ORM\Column(name="exclusive", type="boolean")
     * @Groups({"property"})
     */
    private $exclusive;

    /**
     * @var object
     * @Serializer\Type("JsObject")
     * @ORM\Column(name="languages", type="object", nullable=true)
     * @Groups({"property"})
     */
    private $languages;

    /**
     * @var object
     * @Serializer\Type("JsObject")
     * @ORM\Column(name="subtitles", type="object", nullable=true)
     * @Groups({"property"})
     */
    private $subtitles;

    /**
     * @var object
     * @Serializer\Type("JsObject")
     * @ORM\Column(name="scripts", type="object", nullable=true)
     * @Groups({"property"})
     */
    private $scripts;

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
     * @return mixed
     */
    public function getTerritories()
    {
        return $this->territories;
    }

    /**
     * @param mixed $territories
     */
    public function setTerritories($territories)
    {
        $this->territories = $territories;
    }

    /**
     * @return string
     */
    public function getTerritoriesMode()
    {
        return $this->territoriesMode;
    }

    /**
     * @param string $territoriesMode
     */
    public function setTerritoriesMode($territoriesMode)
    {
        $this->territoriesMode = $territoriesMode;
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
     * @return int
     */
    public function getReleaseYear()
    {
        return $this->releaseYear;
    }

    /**
     * @param int $releaseYear
     */
    public function setReleaseYear($releaseYear)
    {
        $this->releaseYear = $releaseYear;
    }

    /**
     * @return int
     */
    public function getEpisodes()
    {
        return $this->episodes;
    }

    /**
     * @param int $episodes
     */
    public function setEpisodes($episodes)
    {
        $this->episodes = $episodes;
    }

    /**
     * @return int
     */
    public function getEpisodeDuration()
    {
        return $this->episodeDuration;
    }

    /**
     * @param int $episodeDuration
     */
    public function setEpisodeDuration($episodeDuration)
    {
        $this->episodeDuration = $episodeDuration;
    }

    /**
     * @return bool
     */
    public function isSimilarEpisodesLength()
    {
        return $this->similarEpisodesLength;
    }

    /**
     * @param bool $similarEpisodesLength
     */
    public function setSimilarEpisodesLength($similarEpisodesLength)
    {
        $this->similarEpisodesLength = $similarEpisodesLength;
    }

    /**
     * @return bool
     */
    public function isExclusive()
    {
        return $this->exclusive;
    }

    /**
     * @param bool $exclusive
     */
    public function setExclusive($exclusive)
    {
        $this->exclusive = $exclusive;
    }

    /**
     * @return object
     */
    public function getLanguages()
    {
        return $this->languages;
    }

    /**
     * @param object $languages
     */
    public function setLanguages($languages)
    {
        $this->languages = $languages;
    }

    /**
     * @return object
     */
    public function getSubtitles()
    {
        return $this->subtitles;
    }

    /**
     * @param object $subtitles
     */
    public function setSubtitles($subtitles)
    {
        $this->subtitles = $subtitles;
    }

    /**
     * @return object
     */
    public function getScripts()
    {
        return $this->scripts;
    }

    /**
     * @param object $scripts
     */
    public function setScripts($scripts)
    {
        $this->scripts = $scripts;
    }


}


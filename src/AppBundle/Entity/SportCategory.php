<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Groups;

/**
 * SportCategory
 *
 * @ORM\Table(name="sport_category")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SportCategoryRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class SportCategory
{
    /**
     * @var int
     * @Serializer\Type("integer")
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"listing", "home", "property"})
     */
    private $id;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="name", type="string", length=255)
     * @Groups({"listing", "commercial", "home", "property", "propertyList"})
     */
    private $name;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="externalId", type="string", length=255, nullable=true, unique=true)
     * @Groups({"home", "property"})
     */
    private $externalId;

    /**
     * @var string
     *
     * @ORM\Column(name="country_code", type="string", length=255, nullable=true)
     * @Groups({"home"})
     */
    private $countryCode;

    /**
     * @ORM\PrePersist
     */
    public function setDefaultExternalId() {

        if ($this->externalId !== null) return;
        $time = new \DateTime();
        $this->setExternalId("ca:sportCategory:".$time->getTimestamp());
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
     * @return SportCategory
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
     * @return SportCategory
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

    public function __toString() {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getCountryCode()
    {
        return $this->countryCode;
    }

    /**
     * @param string $countryCode
     */
    public function setCountryCode($countryCode)
    {
        $this->countryCode = $countryCode;
    }


}


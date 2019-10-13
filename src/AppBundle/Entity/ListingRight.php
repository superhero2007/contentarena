<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Groups;

/**
 * ListingRight
 *
 * @ORM\Table(name="listing_right")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ListingRightRepository")
 */
class ListingRight
{

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"listing", "propertyList", "createListing"})
     */
    private $id;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @Groups({"listing", "property", "propertyList", "createListing"})
     */
    private $name;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(name="code", type="string", length=2, nullable=false)
     * @Groups({"listing", "property", "propertyList", "createListing"})
     */
    private $code;


    /**
     * @var boolean
     * @Serializer\Type("boolean")
     * @ORM\Column(name="exclusive", type="boolean")
     * @Groups({"listing", "property", "propertyList", "createListing"})
     */
    private $exclusive;

    /**
     * @var object
     * @Serializer\Type("JsObject")
     * @ORM\Column(name="details", type="object", nullable=true)
     * @Groups({"listing", "property", "createListing"})
     */
    private $details;

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
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @param string $code
     */
    public function setCode($code)
    {
        $this->code = $code;
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
    public function getDetails()
    {
        return $this->details;
    }

    /**
     * @param object $details
     */
    public function setDetails($details)
    {
        $this->details = $details;
    }



}


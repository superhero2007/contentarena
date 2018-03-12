<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Territory
 *
 * @ORM\Table(name="territory")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\TerritoryRepository")
 */
class Territory
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;


    /**
     * @ORM\OneToMany(targetEntity="Country", mappedBy="territory")
     */
    private $country;

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
     * @return Territory
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

    public function getCountry(){
        return $this->counetry;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->country = new ArrayCollection();
    }

    /**
     * Add country
     *
     * @param \AppBundle\Entity\Country $country
     *
     * @return Territory
     */
    public function addCountry(\AppBundle\Entity\Country $country)
    {
        $this->country[] = $country;

        return $this;
    }

    /**
     * Remove country
     *
     * @param \AppBundle\Entity\Country $country
     */
    public function removeCountry(\AppBundle\Entity\Country $country)
    {
        $this->country->removeElement($country);
    }
}

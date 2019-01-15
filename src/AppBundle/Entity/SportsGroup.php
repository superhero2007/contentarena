<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\JoinTable;

/**
 * SportsGroup
 *
 * @ORM\Table(name="sports_group")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SportsGroupRepository")
 */
class SportsGroup
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
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Sport")
     * @JoinTable(name="sports_group_sports",
     *      joinColumns={@JoinColumn(name="sports_group_id", referencedColumnName="id")},
     *      inverseJoinColumns={@JoinColumn(name="sport_id", referencedColumnName="id", unique=true)}
     *      )
     */
    private $sports;

    public function __construct()
    {
        $this->sports = new \Doctrine\Common\Collections\ArrayCollection();
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


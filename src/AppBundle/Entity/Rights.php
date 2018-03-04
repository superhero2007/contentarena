<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\JoinTable;
use Doctrine\ORM\Mapping\JoinColumn;

/**
 * Rights
 *
 * @ORM\Table(name="rights")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\RightsRepository")
 */
class Rights
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
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\RightsGroup", inversedBy="groups")
     * @ORM\JoinColumn(nullable=true)
     */
    private $group;

    /**
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\RightsPackage")
     * @JoinTable(name="rights_package_join"),
     *      joinColumns={@JoinColumn(name="rights_id", referencedColumnName="id")},
     *      inverseJoinColumns={@JoinColumn(name="rights_package_id", referencedColumnName="id")}
     *      )
     */
    private $packages;

    /**
     * @var string
     *
     * @ORM\Column(name="definition", type="text", nullable=true)
     */
    private $definition;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\RightsItemContent", inversedBy="rights")
     * @JoinTable(name="rights_items_join")
     */
    private $items;

    /**
     * @var boolean
     *
     * @ORM\Column(name="multiple", type="boolean")
     */
    private $multiple;

    /**
     * @var boolean
     *
     * @ORM\Column(name="hidden", type="boolean")
     */
    private $hidden = false;

    /**
     * @var boolean
     *
     * @ORM\Column(name="$all_enabled", type="boolean")
     */
    private $all_enabled;

    /**
     * @var boolean
     *
     * @ORM\Column(name="collectively", type="boolean")
     */
    private $collectively;

    public function __construct()
    {
        $this->packages = new ArrayCollection();
    }

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
     * @return mixed
     */
    public function getGroup()
    {
        return $this->group;
    }

    /**
     * @param mixed $group
     */
    public function setGroup($group)
    {
        $this->group = $group;
    }

    /**
     * @return Collection|RightsPackage[]
     */
    public function getPackages()
    {
        return $this->packages;
    }

    public function getPackagesIds()
    {
        $ids = [];

        foreach ($this->packages as $key => $val){
            $ids[] = $val->getId();
        }

        return $ids;
    }

    /**
     * @param mixed $packages
     */
    public function setPackages($packages)
    {
        $this->packages = $packages;
    }

    /**
     * @return string
     */
    public function getDefinition()
    {
        return $this->definition;
    }

    /**
     * @param string $definition
     */
    public function setDefinition($definition)
    {
        $this->definition = $definition;
    }

    /**
     * @return mixed
     */
    public function getItems()
    {
        return $this->items;
    }

    /**
     * @param mixed $items
     */
    public function setItems($items)
    {
        $this->items = $items;
    }

    /**
     * @return boolean
     */
    public function isMultiple()
    {
        return $this->multiple;
    }

    /**
     * @param boolean $multiple
     */
    public function setMultiple($multiple)
    {
        $this->multiple = $multiple;
    }

    /**
     * @return boolean
     */
    public function isAllEnabled()
    {
        return $this->all_enabled;
    }

    /**
     * @param boolean $all_enabled
     */
    public function setAllEnabled($all_enabled)
    {
        $this->all_enabled = $all_enabled;
    }


    public function __toString() {
        return $this->name;
    }

    /**
     * @return bool
     */
    public function isCollectively()
    {
        return $this->collectively;
    }

    /**
     * @param bool $collectively
     */
    public function setCollectively($collectively)
    {
        $this->collectively = $collectively;
    }

    /**
     * @return bool
     */
    public function isHidden()
    {
        return $this->hidden;
    }

    /**
     * @param bool $hidden
     */
    public function setHidden($hidden)
    {
        $this->hidden = $hidden;
    }




}


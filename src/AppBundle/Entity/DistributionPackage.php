<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DistributionPackage
 *
 * @ORM\Table(name="distribution_package")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\DistributionPackageRepository")
 */
class DistributionPackage
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
     * @ORM\Column(name="name", type="string", length=255, unique=true)
     */
    private $name;

    /**
     * Many DP have Many Rights.
     * @ORM\ManyToMany(targetEntity="Rights", inversedBy="distribution_packages")
     * @ORM\JoinTable(name="distribution_packages_rights")
     */
    private $rights;

    /**
     * Many Distribution Packages have Many Packages.
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\RightsPackage")
     * @ORM\JoinTable(name="distribution_packages_rights_packages")
     */
    private $rights_package;


    public function __construct() {
        $this->rights = new \Doctrine\Common\Collections\ArrayCollection();
        $this->rights_package = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function __toString()
    {
        return $this->getName();
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
     * @return DistributionPackage
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
    public function getRightsPackage()
    {
        return $this->rights_package;
    }

    /**
     * @param mixed $rights_package
     */
    public function setRightsPackage($rights_package)
    {
        $this->rights_package = $rights_package;
    }



}


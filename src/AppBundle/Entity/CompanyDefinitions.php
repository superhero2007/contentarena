<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * CompanyDefinitions
 *
 * @ORM\Table(name="company_definitions")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\CompanyDefinitionsRepository")
 */
class CompanyDefinitions
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"terms"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company")
     * @ORM\JoinColumn(nullable=true)
     */
    private $company;

    /**
     * @var int
     *
     * @ORM\Column(name="position", type="integer")
     * @Groups({"terms"})
     */
    private $position;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     * @Groups({"terms"})
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="text")
     * @Groups({"terms"})
     */
    private $content;

    /**
     * @var boolean
     * @ORM\Column(name="editable", type="boolean", options={"default":"1"})
     * @Groups({"terms"})
     *
     */
    private $editable;

    /**
     * @var boolean
     * @ORM\Column(name="custom", type="boolean", options={"default":"0"})
     * @Groups({"terms"})
     *
     */
    private $custom;


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
    public function getCompany()
    {
        return $this->company;
    }

    /**
     * @param mixed $company
     */
    public function setCompany($company)
    {
        $this->company = $company;
    }

    /**
     * @return int
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * @param int $position
     */
    public function setPosition($position)
    {
        $this->position = $position;
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
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param string $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return bool
     */
    public function isEditable()
    {
        return $this->editable;
    }

    /**
     * @param bool $editable
     */
    public function setEditable($editable)
    {
        $this->editable = $editable;
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



}


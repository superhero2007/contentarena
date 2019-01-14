<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SourceLicenseTermItem
 *
 * @ORM\Table(name="source_license_term_item")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SourceLicenseTermItemRepository")
 */
class SourceLicenseTermItem
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
     * @var int
     *
     * @ORM\Column(name="position", type="integer")
     */
    private $position;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="text")
     */
    private $content;

    /**
     * @var boolean
     * @ORM\Column(name="editable", type="boolean", options={"default":"1"})
     *
     */
    private $editable;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\SourceLicenseTerm" )
     * @ORM\JoinColumn(nullable=true)
     */
    private $term;

    public function __toString()
    {
        // TODO: Implement __toString() method.
        return $this->getTerm()->getPosition() . "." . $this->position;
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
     * @return SourceLicenseTerm
     */
    public function getTerm()
    {
        return $this->term;
    }

    /**
     * @param mixed $term
     */
    public function setTerm($term)
    {
        $this->term = $term;
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
     * Set position
     *
     * @param integer $position
     *
     * @return SourceLicenseTermItem
     */
    public function setPosition($position)
    {
        $this->position = $position;

        return $this;
    }

    /**
     * Get position
     *
     * @return int
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * Set content
     *
     * @param string $content
     *
     * @return SourceLicenseTermItem
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }
}


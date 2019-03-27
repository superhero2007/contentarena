<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * @ORM\MappedSuperclass()
 */
abstract class LicenseTermItemBase
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"terms"})
     */
    protected $id;

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
     * @ORM\Column(name="content", type="text")
     * @Groups({"terms"})
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\SourceLicenseTerm" )
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"terms"})
     */
    private $term;

    public function __toString()
    {
        // TODO: Implement __toString() method.
        return $this->getTerm()->getPosition() . "." . $this->position;
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
     * @return mixed
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


}

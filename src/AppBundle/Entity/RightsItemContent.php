<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * RightsItemContent
 *
 * @ORM\Table(name="rights_item_content")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\RightsItemContentRepository")
 */
class RightsItemContent
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
     * @var string
     *
     * @ORM\Column(name="form_content", type="text", nullable=true)
     */
    private $form_content;

    /**
     * @var string
     *
     * @ORM\Column(name="contract_content", type="text", nullable=true)
     */
    private $contract_content;

    /**
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Rights", mappedBy="items")
     */
    private $rights;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var boolean
     *
     * @ORM\Column(name="not_optional", type="boolean", )
     */
    private $notOptional = false;


    public function __construct() {
        $this->rights = new ArrayCollection();
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
    public function getFormContent()
    {
        return $this->form_content;
    }

    /**
     * @param mixed $form_content
     */
    public function setFormContent($form_content)
    {
        $this->form_content = $form_content;
    }

    /**
     * @return mixed
     */
    public function getContractContent()
    {
        return $this->contract_content;
    }

    /**
     * @param mixed $contract_content
     */
    public function setContractContent($contract_content)
    {
        $this->contract_content = $contract_content;
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

    public function __toString() {
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
     * @return bool
     */
    public function isNotOptional()
    {
        return $this->notOptional;
    }

    /**
     * @param bool $notOptional
     */
    public function setNotOptional($notOptional)
    {
        $this->notOptional = $notOptional;
    }




}


<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ContentSelectedRight
 *
 * @ORM\Table(name="content_selected_right")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ContentSelectedRightRepository")
 */
class ContentSelectedRight
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
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\RightsGroup")
     * @ORM\JoinColumn(nullable=true)
     */
    private $group;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Rights")
     * @ORM\JoinColumn(nullable=true)
     */
    private $right;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\RightsItemContent")
     * @ORM\JoinColumn(nullable=true)
     */
    private $rightItem;


    /**
     * @var array
     *
     * @ORM\Column(name="inputs", type="array", nullable=true)
     */
    private $inputs;



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
     * @return mixed
     */
    public function getRight()
    {
        return $this->right;
    }

    /**
     * @param mixed $right
     */
    public function setRight($right)
    {
        $this->right = $right;
    }

    /**
     * @return mixed
     */
    public function getRightItem()
    {
        return $this->rightItem;
    }

    /**
     * @param mixed $rightItem
     */
    public function setRightItem($rightItem)
    {
        $this->rightItem = $rightItem;
    }

    /**
     * @return array
     */
    public function getInputs()
    {
        return $this->inputs;
    }

    /**
     * @param array $inputs
     */
    public function setInputs($inputs)
    {
        $this->inputs = $inputs;
    }

    public static function fromJson($data){
        $instance = new self();

        if ( $data->right ) $instance->setRight($data->right);

        return $instance;
    }

}


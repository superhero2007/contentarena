<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldtypeOptions
 *
 * @ORM\Table(name="fieldtype_options", uniqueConstraints={@ORM\UniqueConstraint(name="title", columns={"title", "fields_id"})}, indexes={@ORM\Index(name="value", columns={"value", "fields_id"}), @ORM\Index(name="sort", columns={"sort", "fields_id"}), @ORM\Index(name="title_value", columns={"title", "value"})})
 * @ORM\Entity
 */
class FieldtypeOptions
{
    /**
     * @var string
     *
     * @ORM\Column(name="title", type="text", length=65535, nullable=true)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="value", type="string", length=250, nullable=true)
     */
    private $value;

    /**
     * @var integer
     *
     * @ORM\Column(name="sort", type="integer", nullable=false)
     */
    private $sort;

    /**
     * @var integer
     *
     * @ORM\Column(name="fields_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $fieldsId;

    /**
     * @var integer
     *
     * @ORM\Column(name="option_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $optionId;


}


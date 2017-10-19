<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldMetaImage
 *
 * @ORM\Table(name="field_meta_image", indexes={@ORM\Index(name="data", columns={"data"}), @ORM\Index(name="modified", columns={"modified"}), @ORM\Index(name="created", columns={"created"}), @ORM\Index(name="description", columns={"description"})})
 * @ORM\Entity
 */
class FieldMetaImage
{
    /**
     * @var string
     *
     * @ORM\Column(name="data", type="string", length=250, nullable=false)
     */
    private $data;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=false)
     */
    private $description;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="modified", type="datetime", nullable=true)
     */
    private $modified;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime", nullable=true)
     */
    private $created;

    /**
     * @var integer
     *
     * @ORM\Column(name="pages_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $pagesId;

    /**
     * @var integer
     *
     * @ORM\Column(name="sort", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $sort;


}


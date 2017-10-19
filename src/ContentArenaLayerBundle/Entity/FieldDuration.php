<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldDuration
 *
 * @ORM\Table(name="field_duration", indexes={@ORM\Index(name="data_exact", columns={"data"}), @ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldDuration
{
    /**
     * @var string
     *
     * @ORM\Column(name="data", type="text", length=65535, nullable=false)
     */
    private $data;

    /**
     * @var integer
     *
     * @ORM\Column(name="pages_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $pagesId;


}


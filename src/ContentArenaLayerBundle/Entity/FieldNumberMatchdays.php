<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldNumberMatchdays
 *
 * @ORM\Table(name="field_number_matchdays", indexes={@ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldNumberMatchdays
{
    /**
     * @var integer
     *
     * @ORM\Column(name="data", type="integer", nullable=false)
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


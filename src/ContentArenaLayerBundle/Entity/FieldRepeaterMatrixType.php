<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldRepeaterMatrixType
 *
 * @ORM\Table(name="field_repeater_matrix_type", indexes={@ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldRepeaterMatrixType
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


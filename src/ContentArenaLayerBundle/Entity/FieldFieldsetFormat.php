<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldFieldsetFormat
 *
 * @ORM\Table(name="field_fieldset_format", indexes={@ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldFieldsetFormat
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


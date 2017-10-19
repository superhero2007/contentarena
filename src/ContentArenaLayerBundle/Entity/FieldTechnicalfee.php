<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldTechnicalfee
 *
 * @ORM\Table(name="field_technicalfee", indexes={@ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldTechnicalfee
{
    /**
     * @var float
     *
     * @ORM\Column(name="data", type="float", precision=10, scale=0, nullable=false)
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


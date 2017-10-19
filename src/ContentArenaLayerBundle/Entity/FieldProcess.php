<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldProcess
 *
 * @ORM\Table(name="field_process", indexes={@ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldProcess
{
    /**
     * @var integer
     *
     * @ORM\Column(name="data", type="integer", nullable=false)
     */
    private $data = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="pages_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $pagesId;


}


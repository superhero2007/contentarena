<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldPass
 *
 * @ORM\Table(name="field_pass", indexes={@ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldPass
{
    /**
     * @var string
     *
     * @ORM\Column(name="data", type="string", length=40, nullable=false)
     */
    private $data;

    /**
     * @var string
     *
     * @ORM\Column(name="salt", type="string", length=32, nullable=false)
     */
    private $salt;

    /**
     * @var integer
     *
     * @ORM\Column(name="pages_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $pagesId;


}


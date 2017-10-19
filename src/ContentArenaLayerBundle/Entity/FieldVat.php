<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldVat
 *
 * @ORM\Table(name="field_vat", indexes={@ORM\Index(name="data_exact", columns={"data"}), @ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldVat
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


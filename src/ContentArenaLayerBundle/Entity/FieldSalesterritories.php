<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldSalesterritories
 *
 * @ORM\Table(name="field_salesterritories", indexes={@ORM\Index(name="listtype", columns={"listtype"}), @ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldSalesterritories
{
    /**
     * @var string
     *
     * @ORM\Column(name="data", type="text", length=16777215, nullable=false)
     */
    private $data;

    /**
     * @var boolean
     *
     * @ORM\Column(name="listtype", type="boolean", nullable=false)
     */
    private $listtype = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="pages_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $pagesId;


}


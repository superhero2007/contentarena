<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldVodDelivery
 *
 * @ORM\Table(name="field_vod_delivery", indexes={@ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldVodDelivery
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


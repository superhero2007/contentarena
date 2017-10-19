<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldLeague
 *
 * @ORM\Table(name="field_league", indexes={@ORM\Index(name="data", columns={"data", "pages_id", "sort"})})
 * @ORM\Entity
 */
class FieldLeague
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


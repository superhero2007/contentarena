<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldRightBettingGaming
 *
 * @ORM\Table(name="field_right_betting_gaming", indexes={@ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldRightBettingGaming
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


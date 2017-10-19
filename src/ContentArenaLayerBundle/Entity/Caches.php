<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Caches
 *
 * @ORM\Table(name="caches", indexes={@ORM\Index(name="expires", columns={"expires"})})
 * @ORM\Entity
 */
class Caches
{
    /**
     * @var string
     *
     * @ORM\Column(name="data", type="text", length=16777215, nullable=false)
     */
    private $data;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="expires", type="datetime", nullable=false)
     */
    private $expires;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=250)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $name;


}


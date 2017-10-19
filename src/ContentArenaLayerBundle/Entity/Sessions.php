<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Sessions
 *
 * @ORM\Table(name="sessions", indexes={@ORM\Index(name="pages_id", columns={"pages_id"}), @ORM\Index(name="user_id", columns={"user_id"}), @ORM\Index(name="ts", columns={"ts"})})
 * @ORM\Entity
 */
class Sessions
{
    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer", nullable=false)
     */
    private $userId;

    /**
     * @var integer
     *
     * @ORM\Column(name="pages_id", type="integer", nullable=false)
     */
    private $pagesId;

    /**
     * @var string
     *
     * @ORM\Column(name="data", type="text", length=16777215, nullable=false)
     */
    private $data;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="ts", type="datetime", nullable=false)
     */
    private $ts = 'CURRENT_TIMESTAMP';

    /**
     * @var integer
     *
     * @ORM\Column(name="ip", type="integer", nullable=false)
     */
    private $ip = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="ua", type="string", length=250, nullable=false)
     */
    private $ua = '';

    /**
     * @var string
     *
     * @ORM\Column(name="id", type="string", length=32)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;


}


<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SessionLoginThrottle
 *
 * @ORM\Table(name="session_login_throttle")
 * @ORM\Entity
 */
class SessionLoginThrottle
{
    /**
     * @var integer
     *
     * @ORM\Column(name="attempts", type="integer", nullable=false)
     */
    private $attempts = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="last_attempt", type="integer", nullable=false)
     */
    private $lastAttempt;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=128)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $name;


}


<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PagesAccess
 *
 * @ORM\Table(name="pages_access", indexes={@ORM\Index(name="templates_id", columns={"templates_id"})})
 * @ORM\Entity
 */
class PagesAccess
{
    /**
     * @var integer
     *
     * @ORM\Column(name="templates_id", type="integer", nullable=false)
     */
    private $templatesId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="ts", type="datetime", nullable=false)
     */
    private $ts = 'CURRENT_TIMESTAMP';

    /**
     * @var integer
     *
     * @ORM\Column(name="pages_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $pagesId;


}


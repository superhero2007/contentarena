<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PagesProcache
 *
 * @ORM\Table(name="pages_procache", indexes={@ORM\Index(name="created", columns={"created", "templates_id"}), @ORM\Index(name="pages_id", columns={"pages_id"})})
 * @ORM\Entity
 */
class PagesProcache
{
    /**
     * @var integer
     *
     * @ORM\Column(name="pages_id", type="integer", nullable=false)
     */
    private $pagesId;

    /**
     * @var integer
     *
     * @ORM\Column(name="templates_id", type="integer", nullable=false)
     */
    private $templatesId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime", nullable=false)
     */
    private $created;

    /**
     * @var string
     *
     * @ORM\Column(name="path", type="string", length=500)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $path;


}


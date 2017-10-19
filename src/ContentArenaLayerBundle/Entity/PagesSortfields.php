<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PagesSortfields
 *
 * @ORM\Table(name="pages_sortfields")
 * @ORM\Entity
 */
class PagesSortfields
{
    /**
     * @var string
     *
     * @ORM\Column(name="sortfield", type="string", length=20, nullable=false)
     */
    private $sortfield = '';

    /**
     * @var integer
     *
     * @ORM\Column(name="pages_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $pagesId;


}


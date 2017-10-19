<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldContactpersons
 *
 * @ORM\Table(name="field_contactpersons", indexes={@ORM\Index(name="data_exact", columns={"data"}), @ORM\Index(name="count", columns={"count", "pages_id"}), @ORM\Index(name="parent_id", columns={"parent_id", "pages_id"}), @ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldContactpersons
{
    /**
     * @var string
     *
     * @ORM\Column(name="data", type="text", length=65535, nullable=false)
     */
    private $data;

    /**
     * @var integer
     *
     * @ORM\Column(name="count", type="integer", nullable=false)
     */
    private $count;

    /**
     * @var integer
     *
     * @ORM\Column(name="parent_id", type="integer", nullable=false)
     */
    private $parentId;

    /**
     * @var integer
     *
     * @ORM\Column(name="pages_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $pagesId;


}


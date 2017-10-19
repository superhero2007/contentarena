<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldCommentarylanguageavailable
 *
 * @ORM\Table(name="field_commentarylanguageavailable", indexes={@ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldCommentarylanguageavailable
{
    /**
     * @var boolean
     *
     * @ORM\Column(name="data", type="boolean", nullable=false)
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


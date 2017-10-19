<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldFieldsetRightstab
 *
 * @ORM\Table(name="field_fieldset_rightstab", indexes={@ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldFieldsetRightstab
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


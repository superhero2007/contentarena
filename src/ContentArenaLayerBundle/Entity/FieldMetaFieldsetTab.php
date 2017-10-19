<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldMetaFieldsetTab
 *
 * @ORM\Table(name="field_meta_fieldset_tab", indexes={@ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldMetaFieldsetTab
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


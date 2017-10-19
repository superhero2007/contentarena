<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldgroupsFields
 *
 * @ORM\Table(name="fieldgroups_fields")
 * @ORM\Entity
 */
class FieldgroupsFields
{
    /**
     * @var integer
     *
     * @ORM\Column(name="sort", type="integer", nullable=false)
     */
    private $sort = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="data", type="text", length=65535, nullable=true)
     */
    private $data;

    /**
     * @var integer
     *
     * @ORM\Column(name="fieldgroups_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $fieldgroupsId;

    /**
     * @var integer
     *
     * @ORM\Column(name="fields_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $fieldsId;


}


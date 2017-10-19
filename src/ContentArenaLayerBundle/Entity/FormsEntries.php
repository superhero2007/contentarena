<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FormsEntries
 *
 * @ORM\Table(name="forms_entries", indexes={@ORM\Index(name="forms_id", columns={"forms_id"})})
 * @ORM\Entity
 */
class FormsEntries
{
    /**
     * @var integer
     *
     * @ORM\Column(name="forms_id", type="integer", nullable=false)
     */
    private $formsId;

    /**
     * @var string
     *
     * @ORM\Column(name="data", type="text", length=65535, nullable=false)
     */
    private $data;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime", nullable=false)
     */
    private $created = 'CURRENT_TIMESTAMP';

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;


}


<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FieldContactEmail
 *
 * @ORM\Table(name="field_contact_email", indexes={@ORM\Index(name="data_exact", columns={"data"}), @ORM\Index(name="data", columns={"data"})})
 * @ORM\Entity
 */
class FieldContactEmail
{
    /**
     * @var string
     *
     * @ORM\Column(name="data", type="string", length=250, nullable=false)
     */
    private $data = '';

    /**
     * @var integer
     *
     * @ORM\Column(name="pages_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $pagesId;


}


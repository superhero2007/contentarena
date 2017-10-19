<?php

namespace ContentArenaLayerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Pages
 *
 * @ORM\Table(name="pages", uniqueConstraints={@ORM\UniqueConstraint(name="name_parent_id", columns={"name", "parent_id"})}, indexes={@ORM\Index(name="parent_id", columns={"parent_id"}), @ORM\Index(name="templates_id", columns={"templates_id"}), @ORM\Index(name="modified", columns={"modified"}), @ORM\Index(name="created", columns={"created"}), @ORM\Index(name="status", columns={"status"}), @ORM\Index(name="published", columns={"published"})})
 * @ORM\Entity
 */
class Pages
{
    /**
     * @var integer
     *
     * @ORM\Column(name="parent_id", type="integer", nullable=false)
     */
    private $parentId = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="templates_id", type="integer", nullable=false)
     */
    private $templatesId = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=128, nullable=false)
     */
    private $name;

    /**
     * @var integer
     *
     * @ORM\Column(name="status", type="integer", nullable=false)
     */
    private $status = '1';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="modified", type="datetime", nullable=false)
     */
    private $modified = 'CURRENT_TIMESTAMP';

    /**
     * @var integer
     *
     * @ORM\Column(name="modified_users_id", type="integer", nullable=false)
     */
    private $modifiedUsersId = '2';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime", nullable=false)
     */
    private $created = '2015-12-18 00:09:00';

    /**
     * @var integer
     *
     * @ORM\Column(name="created_users_id", type="integer", nullable=false)
     */
    private $createdUsersId = '2';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="published", type="datetime", nullable=true)
     */
    private $published;

    /**
     * @var integer
     *
     * @ORM\Column(name="sort", type="integer", nullable=false)
     */
    private $sort = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;


}


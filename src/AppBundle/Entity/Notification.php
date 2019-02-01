<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * Notification
 *
 * @ORM\Table(name="notification")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\NotificationRepository")
 */
class Notification
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"notification"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\NotificationType")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"notification"})
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(nullable=true)
     */
    private $user;

    /**
     * @var bool
     *
     * @ORM\Column(name="seen", type="boolean")
     * @Groups({"notification"})
     */
    private $seen = false;

    /**
     * @var bool
     *
     * @ORM\Column(name="visited", type="boolean")
     * @Groups({"notification"})
     */
    private $visited = false;

    /**
     * @var string
     *
     * @ORM\Column(name="referenceId", type="string")
     * @Groups({"notification"})
     */
    private $referenceId;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="string")
     * @Groups({"notification"})
     */
    private $text;

    /**
     * @var mixed
     *
     * @ORM\Column(name="created_at", type="datetime")
     * @Groups({"notification"})
     */
    private $createdAt;

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param mixed $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set visited
     *
     * @param boolean $visited
     *
     * @return Notification
     */
    public function setVisited($visited)
    {
        $this->visited = $visited;

        return $this;
    }

    /**
     * Get visited
     *
     * @return bool
     */
    public function getVisited()
    {
        return $this->visited;
    }

    /**
     * Set seen
     *
     * @param boolean $seen
     *
     * @return Notification
     */
    public function setSeen($seen)
    {
        $this->seen = $seen;

        return $this;
    }

    /**
     * Get seen
     *
     * @return bool
     */
    public function getSeen()
    {
        return $this->seen;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param mixed $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return string
     */
    public function getReferenceId()
    {
        return $this->referenceId;
    }

    /**
     * @param string $referenceId
     */
    public function setReferenceId($referenceId)
    {
        $this->referenceId = $referenceId;
    }

    /**
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * @param string $text
     */
    public function setText($text)
    {
        $this->text = $text;
    }


}

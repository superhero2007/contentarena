<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * Message
 *
 * @ORM\Table(name="message")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\MessageRepository")
 */
class Message
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"messages"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="text")
     * @Groups({"messages"})
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"messages"})
     */
    private $sender;


    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Thread",  cascade={"remove"})
     * @ORM\JoinColumn(name="thread_id",
     *      referencedColumnName="id",
     *      onDelete="CASCADE",nullable=true)
     * @Groups({"messages"})
     */
    private $thread;

    /**
     * @var mixed
     *
     * @ORM\Column(name="created_at", type="datetime")
     * @Groups({"messages"})
     */
    private $createdAt;

    /**
    * @ORM\ManyToMany(targetEntity="AppBundle\Entity\User")
    * @ORM\JoinTable(name="message_readers",
    *      joinColumns={@ORM\JoinColumn(name="message_id", referencedColumnName="id")},
    *      inverseJoinColumns={@ORM\JoinColumn(name="message_reader_id", referencedColumnName="id")}
     *      )
     * @Groups({"messages"})
     */
    private $readers;

    /**
     * @return mixed
     */
    public function getReaders()
    {
        return $this->readers;
    }

    /**
     * @param mixed $readers
     */
    public function setReaders($readers)
    {
        $this->readers = $readers;
    }

    /**
     * @param $user
     * @return bool
     */
    public function readBy($user){
        $read = false;

        if ( $this->getSender()->getId() == $user->getId()  ) return true;

        foreach ($this->readers as $reader){
            if ($reader->getId() == $user->getId() ) $read = true;
        }

        return $read;

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
     * Set content
     *
     * @param string $content
     *
     * @return Message
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @return mixed
     */
    public function getSender()
    {
        return $this->sender;
    }

    /**
     * @param mixed $sender
     */
    public function setSender($sender)
    {
        $this->sender = $sender;
    }


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
     * @return mixed
     */
    public function getThread()
    {
        return $this->thread;
    }

    /**
     * @param mixed $thread
     */
    public function setThread($thread)
    {
        $this->thread = $thread;
    }


}


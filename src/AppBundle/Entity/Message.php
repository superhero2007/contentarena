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
     * @var boolean
     * @ORM\Column(name="attachment", type="boolean", nullable=true)
     * @Groups({"messages"})
     *
     */
    private $attachment = false;

    /**
     * @var string
     *
     * @ORM\Column(name="file_size", type="text", nullable=true)
     * @Groups({"messages"})
     */
    private $fileSize;

    /**
     * @var string
     *
     * @ORM\Column(name="file_name", type="text", nullable=true)
     * @Groups({"messages"})
     */
    private $fileName;

    /**
     * @var string
     *
     * @ORM\Column(name="file_path", type="text", nullable=true)
     * @Groups({"messages"})
     */
    private $filePath;

    /**
     * @var string
     *
     * @ORM\Column(name="file_extension", type="text", nullable=true)
     * @Groups({"messages"})
     */
    private $fileExtension;

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

    /**
     * @return bool
     */
    public function isAttachment()
    {
        return $this->attachment;
    }

    /**
     * @param bool $attachment
     */
    public function setAttachment($attachment)
    {
        $this->attachment = $attachment;
    }

    /**
     * @return string
     */
    public function getFileSize()
    {
        return $this->fileSize;
    }

    /**
     * @param string $fileSize
     */
    public function setFileSize($fileSize)
    {
        $this->fileSize = $fileSize;
    }

    /**
     * @return string
     */
    public function getFileName()
    {
        return $this->fileName;
    }

    /**
     * @param string $fileName
     */
    public function setFileName($fileName)
    {
        $this->fileName = $fileName;
    }

    /**
     * @return string
     */
    public function getFileExtension()
    {
        return $this->fileExtension;
    }

    /**
     * @param string $fileExtension
     */
    public function setFileExtension($fileExtension)
    {
        $this->fileExtension = $fileExtension;
    }

    /**
     * Get attachment
     *
     * @return boolean
     */
    public function getAttachment()
    {
        return $this->attachment;
    }

    /**
     * Set filePath
     *
     * @param string $filePath
     *
     * @return Message
     */
    public function setFilePath($filePath)
    {
        $this->filePath = $filePath;
    }

    /**
     * Get filePath
     *
     * @return string
     */
    public function getFilePath()
    {
        return $this->filePath;
    }
}

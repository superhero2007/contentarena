<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Log
 *
 * @ORM\Table(name="log")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\LogRepository")
 */
class Log
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="message", type="text")
     */
    private $message;

    /**
     * @ORM\Column(name="context", type="array")
     */
    private $context;

    /**
     * @ORM\Column(name="level", type="smallint")
     */
    private $level;

    /**
     * @ORM\Column(name="level_name", type="string", length=50)
     */
    private $levelName;

    /**
     * @ORM\Column(name="extra", type="array")
     */
    private $extra;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\PrePersist
     */
    public function onPrePersist()
    {
        $this->createdAt = new \DateTime();
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
     * Set message
     *
     * @param $message
     *
     */
    public function setMessage($message = null)
    {
        $this->message = $message;
    }

    /**
     * Get message
     *
     * @return message
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Set context
     *
     * @param $context
     *
     */
    public function setContext($context = null)
    {
        $this->context = $context;
    }

    /**
     * Get context
     *
     * @return mixed
     */
    public function getContext()
    {
        return $this->context;
    }

    /**
     * Set level
     *
     * @param $level
     *
     */
    public function setLevel($level = null)
    {
        $this->level = $level;
    }

    /**
     * Get level
     *
     * @return mixed
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * Set levelName
     *
     * @param $levelName
     *
     */
    public function setLevelName($levelName = null)
    {
        $this->levelName = $levelName;
    }

    /**
     * Get levelName
     *
     * @return mixed
     */
    public function getLevelName()
    {
        return $this->levelName;
    }

    /**
     * Set extra
     *
     * @param $extra
     *
     */
    public function setExtra($extra = null)
    {
        $this->extra = $extra;
    }

    /**
     * Get extra
     *
     * @return mixed
     */
    public function getExtra()
    {
        return $this->extra;
    }
}


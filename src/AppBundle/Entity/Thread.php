<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * Thread
 *
 * @ORM\Table(name="thread")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ThreadRepository")
 */
class Thread
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
     * @ORM\Column(name="custom_id", type="string", unique=true, nullable=true)
     * @Groups({"messages"})
     */
    private $customId;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Content",  cascade={"remove"} )
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"messages"})
     */
    private $listing;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"messages"})
     */
    private $ownerCompany;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"messages"})
     */
    private $buyerCompany;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"messages"})
     */
    private $user;

    /**
     * @var User
     * @Groups({"messages"})
     */
    private $oppositeParty;

    /**
     * @var User
     * @Groups({"messages"})
     */
    private $lastMessageUser;

    /**
     * @var mixed
     * @Groups({"messages"})
     */
    private $lastMessageDate;

    /**
     * @var string
     * @Groups({"messages"})
     */
    private $lastMessageContent;

    /**
     * @var mixed
     *
     * @ORM\Column(name="last_notification_date", type="datetime", nullable=true)
     * @Groups({"messages"})
     */
    private $lastNotificationDate;


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
     * @return mixed
     */
    public function getListing()
    {
        return $this->listing;
    }

    /**
     * @param mixed $listing
     */
    public function setListing($listing)
    {
        $this->listing = $listing;
    }

    /**
     * @return mixed
     */
    public function getOwnerCompany()
    {
        return $this->ownerCompany;
    }

    /**
     * @param mixed $ownerCompany
     */
    public function setOwnerCompany($ownerCompany)
    {
        $this->ownerCompany = $ownerCompany;
    }

    /**
     * @return mixed
     */
    public function getBuyerCompany()
    {
        return $this->buyerCompany;
    }

    /**
     * @param mixed $buyerCompany
     */
    public function setBuyerCompany($buyerCompany)
    {
        $this->buyerCompany = $buyerCompany;
    }

    /**
     * @return mixed
     */
    public function getLastNotificationDate()
    {
        return $this->lastNotificationDate;
    }

    /**
     * @param mixed $lastNotificationDate
     */
    public function setLastNotificationDate($lastNotificationDate)
    {
        $this->lastNotificationDate = $lastNotificationDate;
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
    public function getCustomId()
    {
        return $this->customId;
    }

    /**
     * @param string $customId
     */
    public function setCustomId($customId)
    {
        $this->customId = $customId;
    }

    /**
     * @return mixed
     */
    public function getLastMessageDate()
    {
        return $this->lastMessageDate;
    }

    /**
     * @param mixed $lastMessageDate
     */
    public function setLastMessageDate($lastMessageDate)
    {
        $this->lastMessageDate = $lastMessageDate;
    }

    /**
     * @return string
     */
    public function getLastMessageContent()
    {
        return $this->lastMessageContent;
    }

    /**
     * @param string $lastMessageContent
     */
    public function setLastMessageContent($lastMessageContent)
    {
        $this->lastMessageContent = $lastMessageContent;
    }

    /**
     * @return User
     */
    public function getOppositeParty()
    {
        return $this->oppositeParty;
    }

    /**
     * @param User $oppositeParty
     */
    public function setOppositeParty($oppositeParty)
    {
        $this->oppositeParty = $oppositeParty;
    }

    /**
     * @return User
     */
    public function getLastMessageUser()
    {
        return $this->lastMessageUser;
    }

    /**
     * @param User $lastMessageUser
     */
    public function setLastMessageUser($lastMessageUser)
    {
        $this->lastMessageUser = $lastMessageUser;
    }



}


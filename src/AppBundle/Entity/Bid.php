<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Bid
 *
 * @ORM\Table(name="bid")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\BidRepository")
 */
class Bid
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
     * @var int
     *
     * @ORM\Column(name="custom_id", type="string")
     */
    private $customId;

    /**
     * @var int
     *
     * @ORM\Column(name="amount", type="bigint")
     */
    private $amount;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Content", inversedBy="bid")
     * @ORM\JoinColumn(nullable=true)
     */
    private $content;


    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Currency", inversedBy="bid")
     * @ORM\JoinColumn(nullable=true)
     */
    private $currency;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company", inversedBy="bid")
     * @ORM\JoinColumn(nullable=true)
     */
    private $company;


    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\BidStatus", inversedBy="bid")
     * @ORM\JoinColumn(nullable=true)
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\BidType", inversedBy="bid")
     * @ORM\JoinColumn(nullable=true)
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="bid")
     * @ORM\JoinColumn(nullable=true)
     */
    private $buyerUser;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Country", inversedBy="bid")
     * @ORM\JoinTable(name="bid_countries",
     *      joinColumns={@ORM\JoinColumn(name="country_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="bid_countries_id", referencedColumnName="id")}
     *      )
     */
    private $countries;

    /**
     * @var mixed
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    public function __construct() {
        $this->countries = new \Doctrine\Common\Collections\ArrayCollection();
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
     * @return mixed
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param mixed $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return mixed
     */
    public function getCurrency()
    {
        return $this->currency;
    }

    /**
     * @param mixed $currency
     */
    public function setCurrency($currency)
    {
        $this->currency = $currency;
    }

    /**
     * @return mixed
     */
    public function getCompany()
    {
        return $this->company;
    }

    /**
     * @param mixed $company
     */
    public function setCompany($company)
    {
        $this->company = $company;
    }

    /**
     * @return mixed
     */
    public function getBuyerUser()
    {
        return $this->buyerUser;
    }

    /**
     * @param mixed $buyerUser
     */
    public function setBuyerUser($buyerUser)
    {
        $this->buyerUser = $buyerUser;
    }

    /**
     * @return mixed
     */
    public function getCountries()
    {
        return $this->countries;
    }

    /**
     * @param mixed $countries
     */
    public function setCountries($countries)
    {
        $this->countries = $countries;
    }

    /**
     * @return int
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * @param int $amount
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;
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
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

    /**
     * @return int
     */
    public function getCustomId()
    {
        return $this->customId;
    }

    /**
     * @param int $customId
     */
    public function setCustomId($customId)
    {
        $this->customId = $customId;
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


}


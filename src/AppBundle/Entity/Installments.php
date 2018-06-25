<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * Installments
 *
 * @ORM\Table(name="installments")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\InstallmentsRepository")
 */
class Installments
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
     * @var float
     *
     * @ORM\Column(name="percentage", type="float")
     * @Groups({"details"})
     */
    private $percentage;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="due_date", type="datetime")
     * @Groups({"details"})
     */
    private $dueDate;

    /**
     * @var int
     *
     * @ORM\Column(name="signing_days", type="integer")
     * @Groups({"details"})
     */
    private $signingDays;

    /**
     * @var int
     *
     * @ORM\Column(name="granted_days", type="integer")
     * @Groups({"details"})
     */
    private $grantedDays;


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
     * Set percentage
     *
     * @param float $percentage
     *
     * @return Installments
     */
    public function setPercentage($percentage)
    {
        $this->percentage = $percentage;

        return $this;
    }

    /**
     * Get percentage
     *
     * @return float
     */
    public function getPercentage()
    {
        return $this->percentage;
    }

    /**
     * Set dueDate
     *
     * @param \DateTime $dueDate
     *
     * @return Installments
     */
    public function setDueDate($dueDate)
    {
        $this->dueDate = $dueDate;

        return $this;
    }

    /**
     * Get dueDate
     *
     * @return \DateTime
     */
    public function getDueDate()
    {
        return $this->dueDate;
    }

    /**
     * Set signingDays
     *
     * @param integer $signingDays
     *
     * @return Installments
     */
    public function setSigningDays($signingDays)
    {
        $this->signingDays = $signingDays;

        return $this;
    }

    /**
     * Get signingDays
     *
     * @return int
     */
    public function getSigningDays()
    {
        return $this->signingDays;
    }

    /**
     * Set grantedDays
     *
     * @param integer $grantedDays
     *
     * @return Installments
     */
    public function setGrantedDays($grantedDays)
    {
        $this->grantedDays = $grantedDays;

        return $this;
    }

    /**
     * Get grantedDays
     *
     * @return int
     */
    public function getGrantedDays()
    {
        return $this->grantedDays;
    }
}


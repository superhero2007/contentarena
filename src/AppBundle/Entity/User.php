<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping\AttributeOverrides;
use Doctrine\ORM\Mapping\AttributeOverride;
use JMS\Serializer\Annotation\Groups;

/**
 * User
 *
 * @ORM\Table(name="`user`")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 * @AttributeOverrides({
 *     @AttributeOverride(name="password",
 *         column=@ORM\Column(
 *             name="password",
 *             type="string",
 *             length=255,
 *             unique=false,
 *             nullable=true
 *         )
 *     )
 * })
 */
class User extends BaseUser
{

    public function __construct()
    {
        parent::__construct();
        $this->profile = "BUYER";
    }


    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"settings", "messages"})
     */
    protected $id;

    /**
     * @Groups({"settings","messages"})
     */
    protected $email;

    /**
     * @var string
     *
     * @ORM\Column(name="first_name", type="string", length=255)
     * @Groups({"listing","board","closed", "commercial", "settings","messages"})
     *
     */
    protected $firstName;

    /**
     * @var string
     *
     * @ORM\Column(name="last_name", type="string", length=255)
     * @Groups({"listing","board","closed", "commercial", "settings","messages"})
     */
    protected $lastName;

    /**
     * @var string
     *
     * @ORM\Column(name="company_legal_name", type="string", length=255, nullable=true)
     */
    protected $companyLegalName;

    /**
     * @var string
     *
     * @ORM\Column(name="company_website", type="string", length=255, nullable=true)
     */
    protected $companyWebsite;

    /**
     * @var string
     *
     * @ORM\Column(name="phone", type="string", length=255, nullable=true)
     * @Groups({"settings"})
     */
    protected $phone;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=true)
     * @Groups({"settings"})
     */
    protected $title;

    /**
     * @var string
     *
     * @ORM\Column(name="country", type="string", length=25, nullable=true)
     */
    private $country;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company", inversedBy="users")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"commercial", "closed", "settings","messages"})
     */
    private $company;

    /**
     * @var string
     *
     * @ORM\Column(name="profile", type="string", nullable=true)
     * @Groups({"commercial", "closed", "settings"})
     */
    private $profile = "BUYER";

    /**
     * @var string
     *
     * @ORM\Column(name="application_company", type="string", nullable=true)
     * @Groups({"commercial", "closed", "settings"})
     */
    private $applicationCompany;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\UserStatus")
     * @ORM\JoinColumn(nullable=true)
     */
    private $status;

    /**
     * @var boolean
     *
     * @ORM\Column(name="unconfirmed_checked", type="boolean", nullable=true)
     */
    protected $unconfirmedChecked = false;

    /**
     * @var boolean
     *
     * @ORM\Column(name="approved", type="boolean")
     */
    protected $approved = false;

    /**
     * @var boolean
     *
     * @ORM\Column(name="autoPublish", type="boolean")
     */
    protected $autoPublish = false;


    /**
     * @ORM\Column(name="registered_at", type="datetime", nullable=true)
     */
    protected $registeredAt;

    /**
     * @return mixed
     */
    public function getRegisteredAt()
    {
        return $this->registeredAt;
    }

    /**
     * @param mixed $registeredAt
     */
    public function setRegisteredAt($registeredAt)
    {
        $this->registeredAt = $registeredAt;
    }


    /**
     * @return boolean
     */
    public function isUnconfirmedChecked()
    {
        return $this->unconfirmedChecked;
    }

    /**
     * @param boolean $unconfirmedChecked
     */
    public function setUnconfirmedChecked($unconfirmedChecked)
    {
        $this->unconfirmedChecked = $unconfirmedChecked;
    }

    public function setEmail($email){
        parent::setEmail($email);
        parent::setUsername($email);
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
     * Set firstName
     *
     * @param string $firstName
     *
     * @return User
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Get fullName
     *
     * @return string
     */
    public function getFullName()
    {
        return $this->firstName . " ". $this->lastName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     *
     * @return User
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set companyLegalName
     *
     * @param string $companyLegalName
     *
     * @return User
     */
    public function setCompanyLegalName($companyLegalName)
    {
        $this->companyLegalName = $companyLegalName;

        return $this;
    }

    /**
     * Get companyLegalName
     *
     * @return string
     */
    public function getCompanyLegalName()
    {
        return $this->companyLegalName;
    }

    /**
     * Set companyWebsite
     *
     * @param string $companyWebsite
     *
     * @return User
     */
    public function setCompanyWebsite($companyWebsite)
    {
        $this->companyWebsite = $companyWebsite;

        return $this;
    }

    /**
     * Get companyWebsite
     *
     * @return string
     */
    public function getCompanyWebsite()
    {
        return $this->companyWebsite;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return User
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set country
     *
     * @param Country $country
     *
     * @return User
     */
    public function setCountry($country)
    {
        $this->country = $country;
    }

    /**
     * Get country
     *
     * @return Country
     */
    public function getCountry()
    {
        return $this->country;
    }


    /**
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * @param string $phone
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
    }

    /**
     * @return boolean
     */
    public function isApproved()
    {
        return $this->approved;
    }

    /**
     * @param boolean $approved
     */
    public function setApproved($approved)
    {
        $this->approved = $approved;
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

        if ($status->getName() == "Deactivated"){
            $this->enabled = false;
        } else {
            $this->enabled = true;
        }
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
     * @return bool
     */
    public function isAutoPublish()
    {
        return $this->autoPublish;
    }

    /**
     * @param bool $autoPublish
     */
    public function setAutoPublish($autoPublish)
    {
        $this->autoPublish = $autoPublish;
    }

    /**
     * @return string
     */
    public function getProfile()
    {
        return $this->profile;
    }

    /**
     * @param string $profile
     */
    public function setProfile($profile)
    {
        $this->profile = $profile;
    }

    /**
     * @return string
     */
    public function getApplicationCompany()
    {
        return $this->applicationCompany;
    }

    /**
     * @param string $applicationCompany
     */
    public function setApplicationCompany($applicationCompany)
    {
        $this->applicationCompany = $applicationCompany;
    }




}

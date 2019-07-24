<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use JMS\Serializer\Annotation\Groups;

/**
 * Company
 *
 * @ORM\Table(name="company")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\CompanyRepository")
 */
class Company
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"details", "closed", "commercial", "settings","messages", "thread", "home"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="legal_name", type="string", length=255, unique=true)
     * @Groups({"details", "closed", "commercial", "settings", "listing","messages", "thread", "home", "property"})
     */
    private $legalName;

    /**
     * @var string
     *
     * @ORM\Column(name="vat", type="string", length=255, nullable=true)
     * @Groups({"details", "settings", "home"})
     */
    private $vat;

    /**
     * @var string
     *
     * @ORM\Column(name="registration_number", type="string", length=255, nullable=true)
     * @Groups({"details", "settings", "home"})
     */
    private $registrationNumber;

    /**
     * @var string
     *
     * @ORM\Column(name="city", type="string", length=255, nullable=true)
     * @Groups({"details", "settings", "home"})
     */
    private $city;

    /**
     * @var string
     *
     * @ORM\Column(name="display_name", type="string", length=255, nullable=true)
     * @Groups({"details"})
     */
    private $displayName;

    /**
     * @var string
     *
     * @ORM\Column(name="website", type="string", length=255, nullable=true)
     * @Groups({"details"})
     */
    private $website;

    /**
     * @var string
     *
     * @ORM\Column(name="address", type="string", length=255, nullable=true)
     * @Groups({"details", "settings", "home"})
     */
    private $address;

    /**
     * @var string
     *
     * @ORM\Column(name="address2", type="string", length=255, nullable=true)
     * @Groups({"details", "settings", "home"})
     */
    private $address2;

    /**
     * @var string
     *
     * @ORM\Column(name="zip", type="string", length=255, nullable=true)
     * @Groups({"details", "settings", "home"})
     */
    private $zip;

    /**
     * @var string
     *
     * @ORM\Column(name="phone", type="string", length=255, nullable=true)
     */
    private $phone;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(nullable=true)
     */
    private $owner;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\CompanyCategory", cascade={"persist"})
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"settings"})
     */
    private $category;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\User", mappedBy="company", cascade={"persist","remove"})
     * @Groups({"settings"})
     */
    private $users;

    /**
     * @var boolean
     *
     * @ORM\Column(name="enabled", type="boolean")
     */
    private $enabled = false;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     * @Groups({"details", "settings"})
     */
    private $description;

    /**
     * @var int
     *
     * @ORM\Column(name="year", type="integer", nullable=true)
     */
    private $year;

    /**
     * @var int
     *
     * @ORM\Column(name="size", type="integer", nullable=true)
     */
    private $size;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Country")
     * @ORM\JoinColumn(name="country_id", referencedColumnName="id")
     * @Groups({"details", "settings", "home"})
     */
    private $country;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Territory")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"settings"})
     */
    private $region;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Sport")
     * @Groups({"settings"})
     */
    private $sport;

    /**
     * @var string
     * @ORM\Column(name="notes", type="text", nullable=true)
     */
    protected $notes;

    /**
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    protected $createdAt;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        if ($this->getCreatedAt() == null) $this->setCreatedAt(new \DateTime());
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
     * Set legalName
     *
     * @param string $legalName
     *
     * @return Company
     */
    public function setLegalName($legalName)
    {
        $this->legalName = $legalName;

        return $this;
    }

    /**
     * Get legalName
     *
     * @return string
     */
    public function getLegalName()
    {
        return $this->legalName;
    }

    /**
     * Set displayName
     *
     * @param string $displayName
     *
     * @return Company
     */
    public function setDisplayName($displayName)
    {
        $this->displayName = $displayName;

        return $this;
    }

    /**
     * Get displayName
     *
     * @return string
     */
    public function getDisplayName()
    {
        return $this->displayName;
    }

    /**
     * Set website
     *
     * @param string $website
     *
     * @return Company
     */
    public function setWebsite($website)
    {
        $this->website = $website;

        return $this;
    }

    /**
     * Get website
     *
     * @return string
     */
    public function getWebsite()
    {
        return $this->website;
    }

    /**
     * Set address
     *
     * @param string $address
     *
     * @return Company
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set zip
     *
     * @param string $zip
     *
     * @return Company
     */
    public function setZip($zip)
    {
        $this->zip = $zip;

        return $this;
    }

    /**
     * Get zip
     *
     * @return string
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * Set phone
     *
     * @param string $phone
     *
     * @return Company
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * @return mixed
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * @param mixed $owner
     */
    public function setOwner($owner)
    {
        $this->owner = $owner;
    }

    /**
     * @return boolean
     */
    public function isEnabled()
    {
        return $this->enabled;
    }

    /**
     * @param boolean $enabled
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * @return Collection|User[]
     */
    public function getActiveUsers()
    {

        return $this->users->filter(
            function($entry) {
                /* @var User $entry */

                //TODO: Replace user status for an enum
                return $entry->getStatus() !== null && $entry->getStatus()->getName() === "Active";
            }
        );
    }

    /**
     * @param mixed $users
     */
    public function setUsers($users)
    {
        $this->users = $users;
    }

    public function __toString() {
        return $this->legalName;
    }

    /**
     * Add user.
     *
     * @param User $user
     */
    public function addUser(User $user)
    {

        if ($this->users->contains($user)) {
            return;
        }
        $this->users[] = $user;
        $user->setCompany($this);

    }

    /**
     * Remove user.
     *
     * @param User $user
     */
    public function removeUser(User $user)
    {
        $this->users->removeElement($user);
    }

    /**
     * Get enabled
     *
     * @return boolean
     */
    public function getEnabled()
    {
        return $this->enabled;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Company
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set year
     *
     * @param integer $year
     *
     * @return Company
     */
    public function setYear($year)
    {
        $this->year = $year;

        return $this;
    }

    /**
     * Get year
     *
     * @return integer
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * Set size
     *
     * @param integer $size
     *
     * @return Company
     */
    public function setSize($size)
    {
        $this->size = $size;

        return $this;
    }

    /**
     * Get size
     *
     * @return integer
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Add content
     *
     * @param \AppBundle\Entity\Content $content
     *
     * @return Company
     */
    public function addContent(\AppBundle\Entity\Content $content)
    {
        $this->content[] = $content;

        return $this;
    }

    /**
     * Remove content
     *
     * @param \AppBundle\Entity\Content $content
     */
    public function removeContent(\AppBundle\Entity\Content $content)
    {
        $this->content->removeElement($content);
    }

    /**
     * Set country
     *
     * @param \AppBundle\Entity\Country $country
     *
     * @return Company
     */
    public function setCountry(\AppBundle\Entity\Country $country = null)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country
     *
     * @return \AppBundle\Entity\Country
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * @return string
     */
    public function getVat()
    {
        return $this->vat;
    }

    /**
     * @param string $vat
     */
    public function setVat($vat)
    {
        $this->vat = $vat;
    }

    /**
     * @return string
     */
    public function getRegistrationNumber()
    {
        return $this->registrationNumber;
    }

    /**
     * @param string $registrationNumber
     */
    public function setRegistrationNumber($registrationNumber)
    {
        $this->registrationNumber = $registrationNumber;
    }

    /**
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param string $city
     */
    public function setCity($city)
    {
        $this->city = $city;
    }

    /**
     * @return string
     */
    public function getAddress2()
    {
        return $this->address2;
    }

    /**
     * @param string $address2
     */
    public function setAddress2($address2)
    {
        $this->address2 = $address2;
    }

    /**
     * @return mixed
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @param mixed $category
     */
    public function setCategory($category)
    {
        $this->category = $category;
    }

    /**
     * @return mixed
     */
    public function getSport()
    {
        return $this->sport;
    }

    /**
     * @param mixed $sport
     */
    public function setSport($sport)
    {
        $this->sport = $sport;
    }

    /**
     * @return mixed
     */
    public function getRegion()
    {
        return $this->region;
    }

    /**
     * @param mixed $region
     */
    public function setRegion($region)
    {
        $this->region = $region;
    }

    /**
     * @return string
     */
    public function getNotes()
    {
        return $this->notes;
    }

    /**
     * @param string $notes
     */
    public function setNotes($notes)
    {
        $this->notes = $notes;
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


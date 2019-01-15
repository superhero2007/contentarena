<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CompanyLicenseTermItem
 *
 * @ORM\Table(name="company_license_term_item")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\CompanyLicenseTermItemRepository")
 */
class CompanyLicenseTermItem
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
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }
}


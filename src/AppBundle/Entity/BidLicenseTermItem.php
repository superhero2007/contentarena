<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * BidLicenseTermItem
 *
 * @ORM\Table(name="bid_license_term_item")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\BidLicenseTermItemRepository")
 */
class BidLicenseTermItem extends LicenseTermItemBase
{
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Bid")
     * @ORM\JoinColumn(nullable=true)
     */
    private $bid;

    /**
     * @return mixed
     */
    public function getBid()
    {
        return $this->bid;
    }

    /**
     * @param mixed $bid
     */
    public function setBid($bid)
    {
        $this->bid = $bid;
    }
}


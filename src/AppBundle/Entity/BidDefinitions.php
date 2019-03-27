<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * BidDefinitions
 *
 * @ORM\Table(name="bid_definitions")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\BidDefinitionsRepository")
 */
class BidDefinitions extends DefinitionsBase
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


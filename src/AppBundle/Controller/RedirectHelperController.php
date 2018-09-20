<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Company;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\BidService;
use AppBundle\Service\MessageService;

class RedirectHelperController extends BaseController
{
    /**
     * @Route("/redirect-integration/messages-by-bid/{bidId}", name="redirectToMessagesThreadFromBid")
     */
    public function redirectToMessagesThreadFromBid(Request $request, BidService $bidService, MessageService $messageService)
    {
        $user = $this->getUser();
        $bidId = $request->get("bidId");
        $bid = $bidService->getBidById($bidId);
        $customId = '';


        /* @var Content $listing */
        $listing = $bid->getContent();

        if ($bid) {
            $thread = $messageService->getThreadByListingAndBuyer($bid->getContent(), $bid->getBuyerUser(), $listing->getCompany());
            if ($thread) {
                $customId = $thread->getCustomId();
            } else {
                $thread = $messageService->createThread($bid->getContent(), $user);
                $customId = $thread->getCustomId();
            }
        }

        return $this->redirect('/messages'.($customId ? ('/'.$customId) : ''));
    }

    /**
     * @Route("/redirect-integration/messages-by-bid-seller/{bidId}", name="redirectToMessagesThreadFromBidSeller")
     */
    public function redirectToMessagesThreadFromBidSeller(Request $request, BidService $bidService, MessageService $messageService)
    {
        $user = $this->getUser();
        $bidId = $request->get("bidId");
        $bid = $bidService->getBidById($bidId);
        $customId = '';

        if ($bid) {
            $thread = $messageService->getThreadByListingAndSeller($bid->getContent(), $bid->getBuyerUser(), $user->getCompany());
            if ($thread) {
                $customId = $thread->getCustomId();
            } else {
                $thread = $messageService->createThread($bid->getContent(), $user);
                $customId = $thread->getCustomId();
            }
        }

        return $this->redirect('/messages'.($customId ? ('/'.$customId) : ''));
    }

}

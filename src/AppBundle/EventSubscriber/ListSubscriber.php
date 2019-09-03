<?php

namespace AppBundle\EventSubscriber;

use AppBundle\Events\ListEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Class ListSubscriber
 * @package AppBundle\EventSubscriber
 */
class ListSubscriber extends AbstractSubscriber implements EventSubscriberInterface
{
    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            ListEvent::LIST_CREATED  => 'onListCreated',
            ListEvent::LIST_UPDATED  => 'onListUpdated',
            ListEvent::LIST_DELETED  => 'onListDeleted'
        ];
    }

    /**
     * @param ListEvent $event
     */
    public function onListCreated(ListEvent $event)
    {
        $this->logEntity(ListEvent::LIST_CREATED, [
            'content' => $event->getEntity()->getCustomId()
        ]);
    }

    /**
     * @param ListEvent $event
     */
    public function onListUpdated(ListEvent $event)
    {
        $this->logEntity(ListEvent::LIST_UPDATED, [
            'content' => $event->getEntity()->getCustomId()
        ]);
    }

    /**
     * @param ListEvent $event
     */
    public function onListDeleted(ListEvent $event)
    {
        $this->logEntity(ListEvent::LIST_DELETED, [
            'content' => $event->getEntity()->getCustomId()
        ]);
    }
}
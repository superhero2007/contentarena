<?php

namespace AppBundle\Events;

/**
 * Class ListEvent
 * @package AppBundle\Events
 */
class ListEvent extends AbstractEvent
{
    const LIST_CREATED = 'list_created';
    const LIST_UPDATED = 'list_updated';
    const LIST_DELETED = 'list_deleted';
}
<?php
/**
 * Created by PhpStorm.
 * User: juancruztalco
 * Date: 21/2/19
 * Time: 01:02
 */

namespace AppBundle\Enum;

abstract class ListingStatusEnum
{
    const APPROVED = "APPROVED";
    const PENDING = "PENDING";
    const EDITED = "EDITED";
    const DRAFT = "DRAFT";

    /** @var array user friendly named type */
    protected static $typeName = [
        self::APPROVED => "Approved",
        self::PENDING => "Pending",
        self::EDITED => "Edited",
        self::DRAFT => "Draft",
    ];

    /**
     * @param  string $typeShortName
     * @return string
     */
    public static function getTypeName($typeShortName)
    {
        if (!isset(static::$typeName[$typeShortName])) {
            return "Unknown type ($typeShortName)";
        }

        return static::$typeName[$typeShortName];
    }

}

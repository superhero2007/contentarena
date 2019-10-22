<?php
/**
 * Created by PhpStorm.
 * User: juancruztalco
 * Date: 21/2/19
 * Time: 01:02
 */

namespace AppBundle\Enum;

abstract class ListingLastActionEnum
{
    const DRAFT = "DRAFT";
    const SUBMITTED = "SUBMITTED";
    const EDITED = "EDITED";
    const ARCHIVED = "ARCHIVED";
    const DEACTIVATED = "DEACTIVATED";
    const DUPLICATED = "DUPLICATED";

    /** @var array user friendly named type */
    protected static $typeName = [
        self::DRAFT => "Saved as draft",
        self::SUBMITTED => "Submitted",
        self::EDITED => "Edited",
        self::ARCHIVED => "Archived",
        self::DEACTIVATED => "Deactivated",
        self::DUPLICATED => "Duplicated",
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

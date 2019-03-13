<?php
/**
 * Created by PhpStorm.
 * User: juancruztalco
 * Date: 21/2/19
 * Time: 01:02
 */

namespace AppBundle\Enum;

abstract class BidStatusEnum
{
    const APPROVED = "APPROVED";
    const PENDING = "PENDING";

    /** @var array user friendly named type */
    protected static $typeName = [
        self::APPROVED => "Approved",
        self::PENDING => "Pending",
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

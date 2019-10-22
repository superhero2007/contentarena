<?php
/**
 * Created by PhpStorm.
 * User: juancruztalco
 * Date: 21/2/19
 * Time: 01:02
 */

namespace AppBundle\Enum;

abstract class DealStatusEnum
{
    const CLOSED = "CLOSED";
    const PENDING = "PENDING";

    /** @var array user friendly named type */
    protected static $typeName = [
        self::CLOSED => "Closed Deal",
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

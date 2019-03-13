<?php
/**
 * Created by PhpStorm.
 * User: juancruztalco
 * Date: 21/2/19
 * Time: 01:02
 */

namespace AppBundle\Enum;

abstract class JobTypeEnum
{
    const ACCOUNT_ABORTED = "ACCOUNT_ABORTED";
    const ACCOUNT_INCOMPLETE = "ACCOUNT_INCOMPLETE";
    const ACCOUNT_INCOMPLETE_FROM_INVITE = "ACCOUNT_INCOMPLETE_FROM_INVITE";

    /** @var array user friendly named type */
    protected static $typeName = [
        self::ACCOUNT_ABORTED => 'Aborted',
        self::ACCOUNT_INCOMPLETE => 'Information',
        self::ACCOUNT_INCOMPLETE_FROM_INVITE => 'Attention',
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

    /**
     * @return array<string>
     */
    public static function getAvailableTypes()
    {
        return [
            self::ACCOUNT_ABORTED,
            self::ACCOUNT_INCOMPLETE,
            self::ACCOUNT_INCOMPLETE_FROM_INVITE,
        ];
    }
}

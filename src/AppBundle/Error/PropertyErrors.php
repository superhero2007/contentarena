<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 25/12/2017
 * Time: 3:22 PM
 */

namespace AppBundle\Error;


class PropertyErrors implements ErrorInterface
{

    const PROPERTY_DOES_NOT_EXISTS = 2000;

    public static $errorMessage = array(
        2000 => 'The property doesn\'t exist',
    );

    public static function getErrorMessage( $code ){
        $message = isset(self::$errorMessage[$code]) ? self::$errorMessage[$code] : 'unknown error';
        return $message;
    }
}

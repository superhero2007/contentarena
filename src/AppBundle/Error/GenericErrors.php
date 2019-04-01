<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 25/12/2017
 * Time: 3:22 PM
 */

namespace AppBundle\Error;


class GenericErrors implements ErrorInterface
{

    const GENERIC_PARAMETER_SHOULD_BE_ARRAY = 000;

    public static $errorMessage = array(
        000 => 'Parameter should be an array',
    );

    public static function getErrorMessage( $code ){
        $message = isset(self::$errorMessage[$code]) ? self::$errorMessage[$code] : 'unknown error';
        return $message;
    }


}

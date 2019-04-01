<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 25/12/2017
 * Time: 3:22 PM
 */

namespace AppBundle\Error;


class UserErrors implements ErrorInterface
{

    const USER_NOT_EXISTS = 200;
    const USER_MISSING_LOGIN_DATA = 201;
    const USER_INCORRECT_PASSWORD = 202;
    const USER_ALREADY_EXISTS = 203;
    const PASSWORD_REQUEST_EXPIRED = 204;

    public static $errorMessage = array(
        200 => 'The user doesn\'t exist',
        201 => 'Incomplete request. Missing username or password',
        202 => 'Incorrect password',
        203 => 'User already exists',
        204 => 'Password request expired',
    );

    public static function getErrorMessage( $code ){
        $message = isset(self::$errorMessage[$code]) ? self::$errorMessage[$code] : 'unknown error';
        return $message;
    }


}

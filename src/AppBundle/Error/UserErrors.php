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

    //TODO: Fix this error codes to match standards
    const USER_NOT_EXISTS = 200;
    const USER_MISSING_LOGIN_DATA = 201;
    const USER_INCORRECT_PASSWORD = 202;
    const USER_ALREADY_EXISTS = 1001;
    const PASSWORD_REQUEST_EXPIRED = 204;
    const USER_EMAIL_NOT_VALID = 205;

    public static $errorMessage = array(
        200 => 'The user doesn\'t exist',
        201 => 'Incomplete request. Missing username or password',
        202 => 'Incorrect password',
        1001 => 'User already exists',
        204 => 'Password request expired',
        205 => 'Your email address is invalid'
    );

    public static function getErrorMessage( $code ){
        $message = isset(self::$errorMessage[$code]) ? self::$errorMessage[$code] : 'unknown error';
        return $message;
    }
}

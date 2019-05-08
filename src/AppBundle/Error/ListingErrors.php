<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 25/12/2017
 * Time: 3:22 PM
 */

namespace AppBundle\Error;


class ListingErrors implements ErrorInterface
{

    const LISTING_NOT_EXISTS = 100;
    const LISTING_NOT_OWNER = 101;
    const LISTING_NOT_SUBMITTED = 102;
    const LISTING_ID_NOT_PROVIDED = 103;

    public static $errorMessage = array(
        100 => 'The listing doesn\'t exist',
        101 => 'User doesn\'t have permission to see this listing',
        102 => 'Failed to submit listing',
        103 => 'Please provide listing ID'
    );

    public static function getErrorMessage( $code ){
        $message = isset(self::$errorMessage[$code]) ? self::$errorMessage[$code] : 'unknown error';
        return $message;
    }


}

<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 25/12/2017
 * Time: 3:22 PM
 */

namespace AppBundle\Error;


interface ErrorInterface
{

    /**
     * @param $code
     * @return string
     */
    public static function getErrorMessage( $code );


}

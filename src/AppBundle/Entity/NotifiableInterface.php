<?php
/**
 * Created by PhpStorm.
 * User: juancruztalco
 * Date: 4/4/19
 * Time: 07:54
 */

namespace AppBundle\Entity;


interface NotifiableInterface {

    /**
     * @return mixed
     */
    public function getCustomId();

    /**
     * @return mixed
     */
    public function getImage();

    /**
     * @return mixed
     */
    public function getSports();

}

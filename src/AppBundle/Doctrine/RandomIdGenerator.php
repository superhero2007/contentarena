<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 29/1/2018
 * Time: 10:39 PM
 */

namespace AppBundle\Doctrine;

use Doctrine\ORM\EntityManager;

class RandomIdGenerator
{

    public function __construct(EntityManager $entityManager) {
        $this->em = $entityManager;
    }

    public function generate($entity)
    {
        $entity_name = $this->em->getClassMetadata(get_class($entity))->getName();

        // Id must be 6 digits length, so range is 100000 - 999999
        $min_value = 100000;
        $max_value = 999999;

        $max_attempts = $min_value - $max_value;
        $attempt = 0;

        while (true) {
            $id = $this->generateCode();

            $item = $this->em->getRepository($entity_name)->findOneBy(array("customId" => $id));

            if (!$item) {
                return $id;
            }

            // Should we stop?
            $attempt++;
            if ($attempt > $max_attempts) {
                throw new \Exception('RandomIdGenerator worked hardly, but failed to generate unique ID :(');
            }
        }

    }

    public function generateCode(){

        $length =   5;

        $chrDb  =   array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9');

        $str = '';
        for ($count = 0; $count < $length; $count++){

            $chr = $chrDb[rand(0,count($chrDb)-1)];

          /*  if (rand(0,1) == 0){
                $chr = strtolower($chr);
            }
            if (3 == $count){
                $str .= '-';
            }*/
            $str .= $chr;
        }

        return $str;
    }
}
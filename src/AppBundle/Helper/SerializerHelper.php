<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 16/1/2018
 * Time: 10:33 PM
 */

namespace AppBundle\Helper;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class SerializerHelper {

    public function serializer() {
        $encoder = new JsonEncoder();

        $normalizer = new ObjectNormalizer();
        $normalizer->setIgnoredAttributes(array(
            'typeCode', 'type', 'range',
            'useCaseCode', 'useCase', 'updatedAt', 'updatedBy'));

        $normalizer->setCircularReferenceHandler(function ($object) {
            return $object->getName();
        });

        $serializer = new Serializer(array($normalizer), array($encoder));
        return $serializer->serialize($this, 'json');
    }
}


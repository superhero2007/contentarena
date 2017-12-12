<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use FOS\UserBundle\Form\Type\RegistrationFormType as BaseRegistrationFormType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use AppBundle\Entity\Role;
use AppBundle\Entity\Country;

class RegistrationFormType extends AbstractType {

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstName')
            ->add('lastName')
            ->add('companyLegalName')
            ->add('companyWebsite')
            ->add('roles', EntityType::class, array(
                    'class' => Role::class,
                    'choice_label' => 'name'))
            ->add('country', EntityType::class, array(
                    'class' => Country::class,
                    'choice_label' => 'name'
            ));
    }

    public function getParent()
    {
        return BaseRegistrationFormType::class;
    }

}
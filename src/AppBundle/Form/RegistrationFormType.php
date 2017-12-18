<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Intl\Intl;
use FOS\UserBundle\Form\Type\RegistrationFormType as BaseRegistrationFormType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use AppBundle\Entity\Profile;



class RegistrationFormType extends AbstractType {

    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        $builder
            ->add('firstName')
            ->add('lastName')
            ->add('companyLegalName')
            ->add('companyWebsite')
            ->add('profile', EntityType::class, array(
                    'class' => Profile::class,
                    'choice_label' => 'name'))
            ->add('country', CountryType::class);

    }

    public function getParent()
    {
        return BaseRegistrationFormType::class;
    }

}
<?php

namespace App\Form;

use App\Entity\Screen;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\File;

class ImportType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('file', FileType::class, [
                'label' => false,
                'constraints' => [
                    new File([
                        'mimeTypes' => ['text/plain', 'text/csv', 'application/octet-stream'],
                    ]),
                ],
            ])
            ->add('screens', EntityType::class, [
                'label' => 'screen.list',
                'class' => Screen::class,
                'multiple' => true,
                'expanded' => true,
            ])
        ;
    }
}

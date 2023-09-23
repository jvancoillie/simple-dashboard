<?php

namespace App\Form;

use App\Entity\Screen;
use App\Entity\Week;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class WeekType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('content')
            ->add('screens', EntityType::class, [
                'label' => 'screen.list',
                'class' => Screen::class,
                'multiple' => true,
                'expanded' => true,
            ])
        ;
        $builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) {
            $form = $event->getForm();
            $data = $event->getData();
            $startDate = $data->getStartDate() ? $data->getStartDate()->format('Y-m-d') : null;
            $endDate = $data->getEndDate() ? $data->getEndDate()->format('Y-m-d') : null;

            $form->add('startDate', DateType::class, [
                'widget' => 'single_text',
                'html5' => false,
                'attr' => [
                    'class' => 'datepicker',
                    'data-value' => $startDate,
                ],
            ]);
            $form->add('endDate', DateType::class, [
                'widget' => 'single_text',
                'html5' => false,
                'attr' => [
                    'class' => 'datepicker',
                    'data-value' => $endDate,
                ],
            ]);
        });
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Week::class,
        ]);
    }
}

<?php

namespace App\Controller\Admin;

use App\Entity\Menu;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Vich\UploaderBundle\Form\Type\VichImageType;

class MenuCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Menu::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            ImageField::new('imageName')
                ->setBasePath('images/menu')
                ->onlyOnIndex(),

            TextField::new('imageFile')
                ->setFormType(VichImageType::class)
                ->onlyOnForms(),
            DateField::new('startDate'),
            DateField::new('endDate'),
            AssociationField::new('screens'),
        ];
    }
}

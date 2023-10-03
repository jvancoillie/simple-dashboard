<?php

namespace App\Controller\Admin;

use App\Entity\Screen;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ScreenCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Screen::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name'),
            TextareaField::new('description'),
        ];
    }
}

<?php

namespace App\DataFixtures;

use App\Entity\Screen;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $screen = new Screen();
        $screen->setName('Écran 1');
        $screen->setDescription('Affichage des informations pour l\'écran numéro 1');

        $manager->persist($screen);

        $screen2 = new Screen();
        $screen2->setName('Écran 2');
        $screen2->setDescription('Affichage des informations pour l\'écran numéro 2');

        $manager->persist($screen2);
        $manager->flush();
    }
}

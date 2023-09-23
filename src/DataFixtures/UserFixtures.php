<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(private readonly UserPasswordHasherInterface $passwordEncoder)
    {
    }

    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setEmail('jeremy.vancoillie@ac-poitiers.fr');
        $user->setRoles(['ROLE_ADMIN']);
        $user->setFullName('Jeremy vancoillie');
        $user->setUsername('jvancoillie');

        $user->setPassword($this->passwordEncoder->hashPassword(
            $user,
            'azerty'
        ));

        $manager->persist($user);
        $manager->flush();
    }
}

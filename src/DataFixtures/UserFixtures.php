<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setEmail('jeremy.vancoillie@ac-poitiers.fr');
        $user->setRoles(['ROLE_ADMIN']);
        $user->setFullName('Jeremy vancoillie');
        $user->setUsername('jvancoillie');

        $user->setPassword($this->passwordEncoder->encodePassword(
            $user,
            'azerty'
        ));

        $manager->persist($user);
        $manager->flush();
    }
}

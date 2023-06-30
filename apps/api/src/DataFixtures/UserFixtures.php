<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail('admin@hotmail.com');
        $user->setPassword('password');
        $user->setFirstname('Salim');
        $user->setLastname('Bouassida');
        $manager->persist($user);

        $manager->flush();
    }
}

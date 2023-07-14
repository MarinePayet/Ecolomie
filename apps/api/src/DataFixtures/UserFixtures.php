<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{


    public const USER_SALIM = 'USER_SALIM'; 


    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail('admin@hotmail.com');
        $user->setPassword('password');
        $user->setFirstname('Salim');
        $user->setLastname('Bouassida');
        $user->setRoles(['ROLE_ADMIN']);
        $manager->persist($user);

        $this->addReference(self::USER_SALIM, $user);



        $manager->flush();
    }
}

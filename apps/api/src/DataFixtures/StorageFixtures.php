<?php

namespace App\DataFixtures;

use App\Entity\Storage;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class StorageFixtures extends Fixture implements DependentFixtureInterface
{

    public const STORAGE_PLACARD = 'STORAGE_PLACARD';
    public const STORAGE_FRIGO = 'STORAGE_FRIGO';
    public const STORAGE_CORBEILLE = 'STORAGE_CORBEILLE';


    public function load(ObjectManager $manager): void
    {
        $storage = new Storage();
        $storage->setName('Placard');
        $manager->persist($storage);
        $this->addReference(self::STORAGE_PLACARD, $storage);
        $storage->setUser($this->getReference(UserFixtures::USER_SALIM));
        
        $storage = new Storage();
        $storage->setName('Frigo');
        $manager->persist($storage);
        $this->addReference(self::STORAGE_FRIGO, $storage);
        $storage->setUser($this->getReference(UserFixtures::USER_SALIM));
        
        $storage = new Storage();
        $storage->setName('Corbeille');
        $manager->persist($storage);
        $this->addReference(self::STORAGE_CORBEILLE, $storage);
        $storage->setUser($this->getReference(UserFixtures::USER_SALIM));


        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
        

}

<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Storage;


class StorageFixtures extends Fixture
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
        
        $storage = new Storage();
        $storage->setName('Frigo');
        $manager->persist($storage);
        $this->addReference(self::STORAGE_FRIGO, $storage);
        
        $storage = new Storage();
        $storage->setName('Corbeille');
        $manager->persist($storage);
        $this->addReference(self::STORAGE_CORBEILLE, $storage);



        $manager->flush();
    }
}

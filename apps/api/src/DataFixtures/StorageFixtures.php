<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Storage;


class StorageFixtures extends Fixture
{
    public const STORAGE_WAREHOUSE = 'STORAGE_WAREHOUSE';
    public function load(ObjectManager $manager): void
    {
        $storage = new Storage();
        $storage->setName('Warehouse');
        $manager->persist($storage);
        $this->addReference(self::STORAGE_WAREHOUSE, $storage);

        $manager->flush();
    }
}

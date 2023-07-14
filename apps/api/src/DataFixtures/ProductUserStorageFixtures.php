<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\ProductUserStorage;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ProductUserStorageFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $productUserStorage = new ProductUserStorage();
        $productUserStorage->setQuantity(1);
        $productUserStorage->setDlc(new \DateTime('2021-12-31'));

        $manager->flush();
    }
}

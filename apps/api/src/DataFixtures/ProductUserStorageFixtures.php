<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\ProductUserStorage;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ProductUserStorageFixtures extends Fixture implements DependentFixtureInterface

{  

    public function load(ObjectManager $manager): void
    {
        $productUserStorage = new ProductUserStorage();
        $productUserStorage->setQuantity(1);
        $productUserStorage->setDlc(new \DateTime('2021-12-31'));
        $productUserStorage->setProduct($this->getReference(ProductFixtures::PROD_BANANE));
        $productUserStorage->setStorage($this->getReference(StorageFixtures::STORAGE_FRIGO));
        $manager->persist($productUserStorage);

        $productUserStorage = new ProductUserStorage();
        $productUserStorage->setQuantity(2);
        $productUserStorage->setDlc(new \DateTime('2021-12-31'));
        $productUserStorage->setProduct($this->getReference(ProductFixtures::PROD_POMME));
        $productUserStorage->setStorage($this->getReference(StorageFixtures::STORAGE_FRIGO));
        $manager->persist($productUserStorage);

        $productUserStorage = new ProductUserStorage();
        $productUserStorage->setQuantity(3);
        $productUserStorage->setDlc(new \DateTime('2021-12-31'));
        $productUserStorage->setProduct($this->getReference(ProductFixtures::PROD_LAIT));
        $productUserStorage->setStorage($this->getReference(StorageFixtures::STORAGE_FRIGO));
        $manager->persist($productUserStorage);

        $productUserStorage = new ProductUserStorage();
        $productUserStorage->setQuantity(4);
        $productUserStorage->setDlc(new \DateTime('2021-12-31'));
        $productUserStorage->setProduct($this->getReference(ProductFixtures::PROD_CHOCOLAT));
        $productUserStorage->setStorage($this->getReference(StorageFixtures::STORAGE_FRIGO));
        $manager->persist($productUserStorage);

        $productUserStorage = new ProductUserStorage();
        $productUserStorage->setQuantity(5);
        $productUserStorage->setDlc(new \DateTime('2021-12-31'));
        $productUserStorage->setProduct($this->getReference(ProductFixtures::PROD_BONBON));
        $productUserStorage->setStorage($this->getReference(StorageFixtures::STORAGE_FRIGO));
        $manager->persist($productUserStorage);
        
        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            ProductFixtures::class,
            StorageFixtures::class,
        ];
    }
}

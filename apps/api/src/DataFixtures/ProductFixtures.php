<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Product;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ProductFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $product = new Product();
        $product->setName('Coca-Cola');
        $product->setQuantity(1.5);
        $product->setUnit('L');
        $product->setDlc(new \DateTime('2021-12-31'));
        $product->setNutriscore('D');
        $product->setCalorie('42');
        $product->setCategory($this->getReference(CategoryFixtures::CAT_BOISSONS));
        $product->setStorage($this->getReference(StorageFixtures::STORAGE_WAREHOUSE));
        $manager->persist($product);

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class,
            StorageFixtures::class,
        ];
    }
}

<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ProductFixture extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $product = new Product();
        $product->setName('banane');
        $product->setNutriscore('A');
        $product->setCategory($this->getReference(CategoryFixtures::CAT_FRUITS));
        $manager->persist($product);

        $product = new Product();
        $product->setName('pomme');
        $product->setNutriscore('B');
        $product->setCategory($this->getReference(CategoryFixtures::CAT_FRUITS));
        $manager->persist($product);

        $product = new Product();
        $product->setName('lait');
        $product->setNutriscore('C');
        $product->setCategory($this->getReference(CategoryFixtures::CAT_BOISSONS));
        $manager->persist($product);

        $product = new Product();
        $product->setName('chocolat');
        $product->setNutriscore('D');
        $product->setCategory($this->getReference(CategoryFixtures::CAT_EPICERIE_SUCREE));
        $manager->persist($product);

        $product = new Product();
        $product->setName('bonbon');
        $product->setNutriscore('E');
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

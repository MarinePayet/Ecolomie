<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ProductFixture extends Fixture 
{
    public function load(ObjectManager $manager): void
    {
        $product = new Product();
        $product->setName('banane');
        $product->setNutriscore('A');
        $manager->persist($product);

        $product = new Product();
        $product->setName('pomme');
        $product->setNutriscore('B');
        $manager->persist($product);

        $product = new Product();
        $product->setName('lait');
        $product->setNutriscore('C');
        $manager->persist($product);

        $product = new Product();
        $product->setName('chocolat');
        $product->setNutriscore('D');
        $manager->persist($product);

        $product = new Product();
        $product->setName('bonbon');
        $product->setNutriscore('E');
        $manager->persist($product);
        
        $manager->flush();
    }
}

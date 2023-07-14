<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ProductFixtures extends Fixture implements DependentFixtureInterface


{

    public const PROD_BANANE = 'PROD_BANANE';
    public const PROD_POMME = 'PROD_POMME';
    public const PROD_LAIT = 'PROD_LAIT';
    public const PROD_CHOCOLAT = 'PROD_CHOCOLAT';
    public const PROD_BONBON = 'PROD_BONBON';


    public function load(ObjectManager $manager): void
    {
        $product = new Product();
        $product->setName('banane');
        $product->setNutriscore('A');
        $product->setCategory($this->getReference(CategoryFixtures::CAT_FRUITS));
        $this->addReference(self::PROD_BANANE, $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('pomme');
        $product->setNutriscore('B');
        $product->setCategory($this->getReference(CategoryFixtures::CAT_FRUITS));
        $this->addReference(self::PROD_POMME, $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('lait');
        $product->setNutriscore('C');
        $product->setCategory($this->getReference(CategoryFixtures::CAT_BOISSONS));
        $this->addReference(self::PROD_LAIT, $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('chocolat');
        $product->setNutriscore('D');
        $product->setCategory($this->getReference(CategoryFixtures::CAT_EPICERIE_SUCREE));
        $this->addReference(self::PROD_CHOCOLAT, $product);
        $manager->persist($product);

        $product = new Product();
        $product->setName('bonbon');
        $product->setNutriscore('E');
        $product->setCategory($this->getReference(CategoryFixtures::CAT_EPICERIE_SUCREE));
        $this->addReference(self::PROD_BONBON, $product);
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

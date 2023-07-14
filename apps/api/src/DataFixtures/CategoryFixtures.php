<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    public const CAT_BOISSONS = 'CAT_BOISSONS';
    public const CAT_FRUITS = 'CAT_FRUITS';
    public const CAT_LEGUMES = 'CAT_LEGUMES';
    public const CAT_EPICERIE_SUCREE = 'CAT_EPICERIE_SUCREE';

    public function load(ObjectManager $manager): void
    {
        $category = new Category();
        $category->setName('Boissons');
        $manager->persist($category);
        $this->addReference(self::CAT_BOISSONS, $category);
        
        $category = new Category();
        $category->setName('Fruits');
        $manager->persist($category);
        $this->addReference(self::CAT_FRUITS, $category);
        
        $category = new Category();
        $category->setName('Légumes');
        $manager->persist($category);
        $this->addReference(self::CAT_LEGUMES, $category);

        $category = new Category();
        $category->setName('epicerie sucree');
        $manager->persist($category);
        $this->addReference(self::CAT_EPICERIE_SUCREE, $category);

        $manager->flush();
    }
}

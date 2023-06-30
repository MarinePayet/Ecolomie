<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Category;

class CategoryFixtures extends Fixture
{
    public const CAT_BOISSONS = 'CAT_BOISSONS';
    public function load(ObjectManager $manager): void
    {
        $category = new Category();
        $category->setName('Boissons');
        $manager->persist($category);
        $this->addReference(self::CAT_BOISSONS, $category);



        $manager->flush();
    }
}

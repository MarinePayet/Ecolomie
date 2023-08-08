<?php

namespace App\DataFixtures;

use App\Entity\MyList;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class MyListFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $myList = new MyList();
        $myList->setName('Courses');
        $manager->persist($myList);
        $myList->setUser($this->getReference(UserFixtures::USER_SALIM));
        $myList->addProductForList($this->getReference(ProductForListFixtures::PROD_F_LIST_LAIT));
        
        $myList = new MyList();
        $myList->setName('Vacances');
        $manager->persist($myList);
        $myList->setUser($this->getReference(UserFixtures::USER_SALIM));
        $myList->addProductForList($this->getReference(ProductForListFixtures::PROD_F_LIST_ABRICOT));



        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            ProductFixtures::class,
        ];
    }
}

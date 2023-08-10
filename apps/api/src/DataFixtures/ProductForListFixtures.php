<?php

namespace App\DataFixtures;

use App\Entity\ProductForList;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ProductForListFixtures extends Fixture implements DependentFixtureInterface
{

    public const PROD_F_LIST_ABRICOT = 'PROD_F_LIST_ABRICOT';
    public const PROD_F_LIST_LAIT = 'PROD_F_LIST_LAIT';

    public function load(ObjectManager $manager): void
    {
        $productForList = new ProductForList();
        $productForList->setName('Abricots') ;
        $productForList->setQuantity(5) ;
        $productForList->setCategory($this->getReference(CategoryFixtures::CAT_FRUITS));
        $this->addReference(self::PROD_F_LIST_ABRICOT, $productForList);
        $manager->persist($productForList);
        
        $productForList = new ProductForList();
        $productForList->setName('Lait') ;
        $productForList->setQuantity(6) ;
        $productForList->setCategory($this->getReference(CategoryFixtures::CAT_BOISSONS)) ;
        $this->addReference(self::PROD_F_LIST_LAIT, $productForList);
        $manager->persist($productForList);

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class,
            

        ];
    }

}

<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\DoctrineBundle\Command\Proxy\CreateSchemaDoctrineCommand;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    public const CAT_BOISSONS = 'CAT_BOISSONS';
    public const CAT_FRUITS = 'CAT_FRUITS';
    public const CAT_LEGUMES = 'CAT_LEGUMES';
    public const CAT_EPICERIE_SUCREE = 'CAT_EPICERIE_SUCREE';
    public const CAT_EPICERIE_SALEE = 'CAT_EPICERIE_SALEE';
    public const CAT_HYGIENE = 'CAT_HYGIENE';
    public const CAT_CREMERIE = 'CAT_CREMERIE';
    public const CAT_BOUCHERIE = 'CAT_BOUCHERIE';
    public const CAT_POISSONNERIE = 'CAT_POISSONNERIE';
    public const CAT_SURGELE = 'CAT_SURGELE';
    public const CAT_MENAGE = 'CAT_MENAGE';
    public const CAT_DIVERS = 'CAT_DIVERS';
    public const CAT_JARDIN = 'CAT_JARDIN';
    public const CAT_ANIMAUX = 'CAT_ANIMAUX';
    public const CAT_R_FRAIS = 'CAT_R_FRAIS';

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
        $category->setName('Epicerie sucrée');
        $manager->persist($category);
        $this->addReference(self::CAT_EPICERIE_SUCREE, $category);
        
        $category = new Category();
        $category->setName('Epicerie salée');
        $manager->persist($category);
        $this->addReference(self::CAT_EPICERIE_SALEE, $category);

        $category = new Category();
        $category->setName('Hygiène et Beauté');
        $manager->persist($category);
        $this->addReference(self::CAT_HYGIENE, $category);
        
        $category = new Category();
        $category->setName('Crémerie');
        $manager->persist($category);
        $this->addReference(self::CAT_CREMERIE, $category);
        
        $category = new Category();
        $category->setName('Boucherie & Charcuterie');
        $manager->persist($category);
        $this->addReference(self::CAT_BOUCHERIE, $category);
        
        $category = new Category();
        $category->setName('Poissonnerie');
        $manager->persist($category);
        $this->addReference(self::CAT_POISSONNERIE, $category);
        
        $category = new Category();
        $category->setName('Surgelé');
        $manager->persist($category);
        $this->addReference(self::CAT_SURGELE, $category);
        
        $category = new Category();
        $category->setName('Produits Ménager');
        $manager->persist($category);
        $this->addReference(self::CAT_MENAGE, $category);
        
        $category = new Category();
        $category->setName('Divers');
        $manager->persist($category);
        $this->addReference(self::CAT_DIVERS, $category);
        
        $category = new Category();
        $category->setName('Jardinage');
        $manager->persist($category);
        $this->addReference(self::CAT_JARDIN, $category);
        
        $category = new Category();
        $category->setName('Animaux');
        $manager->persist($category);
        $this->addReference(self::CAT_ANIMAUX, $category);
        
        $category = new Category();
        $category->setName('Rayon Frais');
        $manager->persist($category);
        $this->addReference(self::CAT_R_FRAIS, $category);

        $manager->flush();
    }
}

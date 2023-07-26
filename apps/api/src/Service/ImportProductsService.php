<?php

namespace App\Service;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use League\Csv\Reader;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\ExpressionLanguage\SyntaxError;

class ImportProductsService
{
    public function __construct(
        private ProductRepository $productRepository,
        private EntityManagerInterface $em
    ) {

    }

    public function importProducts(SymfonyStyle $io)
    {
        $io->title('importation des produits ');
        $products = $this->readCsvFile();

        foreach($products as $arrayproduct){
            $product = $this->createOrUpdateProduct($arrayproduct);
            $this->em->persist($product);
        }
        $this->em->flush();
    } 

    private function readCsvFile():Reader
    {
        $csv = Reader::createFromPath('%kerner.root_dir%/../import/output_part_aa', 'r');
        $csv->setHeaderOffset(0);

        return $csv;
    }

    private function createOrUpdateProduct(array $arrayProduct): Product
    {
        $product = $this->productRepository->findOneBy(['barcode' => $arrayProduct['code']]);

        if (!$product){
            $product = new Product();
        }
        $product = new Product();    
        $product->setBarcode($arrayProduct['code'])
                ->setNutriscore($arrayProduct['nutriscore_grade'])
                ->setName($arrayProduct['product_name'])
                ->setImage($arrayProduct['image_small_url']);

        return $product;
    }

}
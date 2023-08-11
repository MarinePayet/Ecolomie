<?php   

namespace App\Importer;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class ProductImporter
{

    public function __construct(
        #[Autowire('%kernel.project_dir%/import/en.openfoodfacts.org.products.csv')]
        private string $tsvPath,
        private LoggerInterface $logger,
        private EntityManagerInterface $em,
    )
    {
    }

    public function process()
    {

        foreach ($this->getRows($this->tsvPath) as $i => $row) {
            if ($i == 0 || !is_array($row)) {
                continue;
            }

            $this->logger->debug('Parse row' .$i, [
                'name' => $row[8],
            ]);
            
            $product = new Product();
            $product->setBarcode($row[0])
                    ->setNutriscore($row[55])
                    ->setName($row[8])
                    ->setImage($row[80]);
            $this->em->persist($product);
            
            if($i % 50 == 0){
                $this->em->flush();
                $this->em->clear();
            }   
        }
        
        $this->em->flush();
        $this->em->clear();

    }

    private function getRows($file)
    {
        $handle = fopen($file, 'rb');
        if (!$handle) {
            throw new Exception();
        }

        while (!feof($handle)) {
            yield fgetcsv($handle, null, "\t");
        }

        fclose($handle);
    }

}
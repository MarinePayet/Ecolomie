<?php

namespace App\Repository;

use App\Entity\OpenFoodProduct;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<OpenFoodProduct>
 *
 * @method OpenFoodProduct|null find($id, $lockMode = null, $lockVersion = null)
 * @method OpenFoodProduct|null findOneBy(array $criteria, array $orderBy = null)
 * @method OpenFoodProduct[]    findAll()
 * @method OpenFoodProduct[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OpenFoodProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OpenFoodProduct::class);
    }

//    /**
//     * @return OpenFoodProduct[] Returns an array of OpenFoodProduct objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('o.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?OpenFoodProduct
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

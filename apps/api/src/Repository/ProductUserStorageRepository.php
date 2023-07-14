<?php

namespace App\Repository;

use App\Entity\ProductUserStorage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ProductUserStorage>
 *
 * @method ProductUserStorage|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductUserStorage|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductUserStorage[]    findAll()
 * @method ProductUserStorage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductUserStorageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductUserStorage::class);
    }

//    /**
//     * @return ProductUserStorage[] Returns an array of ProductUserStorage objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ProductUserStorage
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

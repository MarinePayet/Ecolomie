<?php

namespace App\Repository;

use App\Entity\MyListWithProduct;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MyListWithProduct>
 *
 * @method MyListWithProduct|null find($id, $lockMode = null, $lockVersion = null)
 * @method MyListWithProduct|null findOneBy(array $criteria, array $orderBy = null)
 * @method MyListWithProduct[]    findAll()
 * @method MyListWithProduct[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MyListWithProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MyListWithProduct::class);
    }

    public function save(MyListWithProduct $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(MyListWithProduct $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return MyListWithProduct[] Returns an array of MyListWithProduct objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('m.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?MyListWithProduct
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

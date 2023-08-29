<?php

namespace App\Doctrine;


use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use App\Entity\OwnerableInterface;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Doctrine\ORM\QueryBuilder;


final class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    public function __construct(private Security $security)
    {
    }

    /**
     * @param mixed[] $context
     */
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass, $context);
    }

    /**
     * @param mixed[] $context
     * @param mixed   $id
     */
    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, Operation $operation = null, array $context = []): void
{
    $this->addWhere($queryBuilder, $resourceClass, $context);
}


    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass, array $context): void
    {
        $implements = class_implements($resourceClass);
        if (!$implements) {
            return;
        }

        if (!array_key_exists(OwnerableInterface::class, $implements)) {
            return;
        }

        $user = $this->security->getUser();
        if (!$user instanceof User) {
            throw new AccessDeniedException();
        }

        $rootAliases = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('%s.user = :current_user', $rootAliases));
        $queryBuilder->setParameter('current_user', $user->getId());
    }
}

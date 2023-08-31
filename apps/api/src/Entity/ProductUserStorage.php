<?php

namespace App\Entity;

use ApiPlatform\Metadata as Api;
use App\Repository\ProductUserStorageRepository;
use Doctrine\Common\Collections\ArrayCollection;    
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter as FilterOrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use App\Entity\OwnerableInterface;


#[ORM\Entity(repositoryClass: ProductUserStorageRepository::class)]
#[Api\ApiResource(
    order: ['storage.name', 'DLC' => 'ASC'],
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['product_user_storage:read']]
        ),
        new Get(
            normalizationContext: ['groups' => ['product_user_storage:read']]
        ),
        new Post(
            normalizationContext: ['groups' => ['product_user_storage:read']],
            denormalizationContext: ['groups' => ['product_user_storage:write']]
        ),
        new Put(
            denormalizationContext: ['groups' => ['product_user_storage:update']]
        ),
        new Delete()
    ]
)]

#[ApiFilter(
    SearchFilter::class,
    properties:[
        'product.name' => SearchFilter::STRATEGY_PARTIAL,
    ]  
)]
#[ApiFilter(DateFilter::class, properties: ['DLC'])]

class ProductUserStorage implements OwnerableInterface
{
    #[ORM\Id] 
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['my_list:read','product_user_storage:read', 'product_user_storage:write','product_user_storage:update'])]       
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups(['product_user_storage:read','product_user_storage:write','product_user_storage:update','product:read'])]    
    private ?\DateTimeInterface $DLC = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['product_user_storage:read','product_user_storage:write','product_user_storage:update','product:read'])]    
    private ?float $quantity = null;

    #[ORM\ManyToOne(inversedBy: 'productUserStorages', cascade: ['persist'])]
    #[Groups(['product_user_storage:read','product_user_storage:update','product:read','product_user_storage:write'])]
    private ?Storage $storage = null;

    #[ORM\ManyToOne(inversedBy: 'productUserStorages')]
    #[Groups(['product_user_storage:read','product_user_storage:write',])]  
    private ?Category $category = null;

    #[ORM\ManyToOne(inversedBy: 'product_user_storage')]
    #[Groups(['product_user_storage:read','product_user_storage:write','product:read'])]
    private ?Product $product = null;

    public function getId(): ?int
    {
        return $this->id; 
    }

    public function getDLC(): ?\DateTimeInterface
    {
        return $this->DLC;
    }

    public function setDLC(?\DateTimeInterface $DLC): static
    {
        $this->DLC = $DLC;

        return $this;
    }

    public function getQuantity(): ?float
    {
        return $this->quantity;
    }

    public function setQuantity(?float $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getStorage(): ?Storage
    {
        return $this->storage;
    }

    public function setStorage(?Storage $storage): static
    {
        $this->storage = $storage;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->getStorage()?->getUser();
    }

}

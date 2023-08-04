<?php

namespace App\Entity;

use ApiPlatform\Metadata as Api;
use App\Repository\ProductUserStorageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;

#[ORM\Entity(repositoryClass: ProductUserStorageRepository::class)]



#[Api\ApiResource()]
#[Get(normalizationContext: ['groups' => ['product_user_storage:read']],)]
#[Post(
    normalizationContext: ['groups' => ['product_user_storage:read']],
    denormalizationContext: ['groups' => ['product_user_storage:write']],)]
#[GetCollection(normalizationContext: ['groups' => ['product_user_storage:read']],)] 
#[Delete()] 
#[Put(denormalizationContext: ['groups' => ['product_user_storage:update']],)]


class ProductUserStorage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['my_list:read','product_user_storage:read', 'product_user_storage:write','product_user_storage:update'])]       
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups(['product_user_storage:read','product_user_storage:write','product_user_storage:update'])]    
    private ?\DateTimeInterface $DLC = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['product_user_storage:read','product_user_storage:write','product_user_storage:update'])]    
    private ?float $quantity = null;


    #[ORM\ManyToOne(inversedBy: 'productUserStorages')]

    #[Groups(['product_user_storage:read','product_user_storage:write','product_user_storage:update'])]
    private ?Storage $storage = null;

    #[ORM\OneToOne(inversedBy: 'productUserStorage', cascade: ['persist', 'remove'])]

    #[Groups(['product_user_storage:read','product_user_storage:write'])]    // LIGNE ORIGINALE  
    private ?Product $product = null;

    #[ORM\ManyToOne(inversedBy: 'productUserStorages')]
    #[Groups(['product_user_storage:read','product_user_storage:write'])]    // LIGNE ORIGINALE  
    private ?Category $category = null;

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

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;

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
}

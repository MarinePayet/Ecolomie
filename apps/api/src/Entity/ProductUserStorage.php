<?php

namespace App\Entity;

use ApiPlatform\Metadata as Api;
use App\Repository\ProductUserStorageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;


#[ORM\Entity(repositoryClass: ProductUserStorageRepository::class)]
#[Api\ApiResource(
    normalizationContext: ['groups' => ['product_user_storage:read']],
    denormalizationContext: ['groups' => ['product_user_storage:write']],
)]

class ProductUserStorage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product_user_storage:read', 'product_user_storage:write'])]       
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups(['product_user_storage:read','product_user_storage:write'])]    
    private ?\DateTimeInterface $DLC = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['product_user_storage:read','product_user_storage:write'])]    

    private ?float $quantity = null;

    #[ORM\ManyToOne(inversedBy: 'productUserStorages')]
    #[Groups(['product_user_storage:read','product_user_storage:write'])]    
    private ?Storage $storage = null;

    #[ORM\OneToOne(inversedBy: 'productUserStorage', cascade: ['persist', 'remove'])]
    #[Groups(['product_user_storage:read'])]    
    private ?Product $product = null;

    #[ORM\ManyToOne(inversedBy: 'productUserStorages')]
    #[Groups(['product_user_storage:read'])]    
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

<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductUserStorageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductUserStorageRepository::class)]
#[ApiResource]
class ProductUserStorage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $DLC = null;

    #[ORM\Column(nullable: true)]
    private ?float $quantity = null;

    #[ORM\ManyToOne(inversedBy: 'productUserStorages')]
    private ?Storage $storage = null;

    #[ORM\OneToOne(inversedBy: 'productUserStorage', cascade: ['persist', 'remove'])]
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

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;

        return $this;
    }
}

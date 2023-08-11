<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource()] 
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product_user_storage:read', 'product_user_storage:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 1000)]
    #[Groups(['product_user_storage:read', 'product_user_storage:write'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['product_user_storage:read', 'product_user_storage:write'])]
    private ?string $nutriscore = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['product_user_storage:read', 'product_user_storage:write'])]
    private ?string $image = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    private ?Category $category = null;

    #[ORM\OneToOne(mappedBy: 'product', cascade: ['persist', 'remove'])]
    private ?ProductUserStorage $productUserStorage = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['product_user_storage:read'])]
    private ?string $barcode = null;

    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getNutriscore(): ?string
    {
        return $this->nutriscore;
    }

    public function setNutriscore(?string $nutriscore): static
    {
        $this->nutriscore = $nutriscore;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

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

    public function getProductUserStorage(): ?ProductUserStorage
    {
        return $this->productUserStorage;
    }

    public function setProductUserStorage(?ProductUserStorage $productUserStorage): static
    {
        // unset the owning side of the relation if necessary
        if ($productUserStorage === null && $this->productUserStorage !== null) {
            $this->productUserStorage->setProduct(null);
        }

        // set the owning side of the relation if necessary
        if ($productUserStorage !== null && $productUserStorage->getProduct() !== $this) {
            $productUserStorage->setProduct($this);
        }

        $this->productUserStorage = $productUserStorage;

        return $this;
    }


    public function getBarcode(): ?string
    {
        return $this->barcode;
    }

    public function setBarcode(?string $barcode): static
    {
        $this->barcode = $barcode;

        return $this;
    }
}

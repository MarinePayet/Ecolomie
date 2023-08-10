<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['product:read', 'product_user_storage:read']],
    denormalizationContext: ['groups' => ['product:write']]
)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read', 'product:write', 'product_user_storage:read','read:productForList'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read', 'product:write', 'product_user_storage:read','read:productForList'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Product::class)]
    private Collection $products;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: ProductUserStorage::class)]
    private Collection $productUserStorages;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: ProductForList::class)]
    private Collection $productForLists;

    public function __construct()
    {
        $this->products = new ArrayCollection();
        $this->productUserStorages = new ArrayCollection();
        $this->productForLists = new ArrayCollection();
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

    /**
     * @return Collection<int, Product>
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): static
    {
        if (!$this->products->contains($product)) {
            $this->products->add($product);
            $product->setCategory($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getCategory() === $this) {
                $product->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ProductUserStorage>
     */
    public function getProductUserStorages(): Collection
    {
        return $this->productUserStorages;
    }

    public function addProductUserStorage(ProductUserStorage $productUserStorage): static
    {
        if (!$this->productUserStorages->contains($productUserStorage)) {
            $this->productUserStorages->add($productUserStorage);
            $productUserStorage->setCategory($this);
        }

        return $this;
    }

    public function removeProductUserStorage(ProductUserStorage $productUserStorage): static
    {
        if ($this->productUserStorages->removeElement($productUserStorage)) {
            // set the owning side to null (unless already changed)
            if ($productUserStorage->getCategory() === $this) {
                $productUserStorage->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ProductForList>
     */
    public function getProductForLists(): Collection
    {
        return $this->productForLists;
    }

    public function addProductForList(ProductForList $productForList): static
    {
        if (!$this->productForLists->contains($productForList)) {
            $this->productForLists->add($productForList);
            $productForList->setCategory($this);
        }

        return $this;
    }

    public function removeProductForList(ProductForList $productForList): static
    {
        if ($this->productForLists->removeElement($productForList)) {
            // set the owning side to null (unless already changed)
            if ($productForList->getCategory() === $this) {
                $productForList->setCategory(null);
            }
        }

        return $this;
    }
}

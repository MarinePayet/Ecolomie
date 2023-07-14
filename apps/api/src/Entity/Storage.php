<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\StorageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StorageRepository::class)]
#[ApiResource]
class Storage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'storages')]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'storage', targetEntity: ProductUserStorage::class)]
    private Collection $productUserStorages;

    public function __construct()
    {
        $this->productUserStorages = new ArrayCollection();
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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

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
            $productUserStorage->setStorage($this);
        }

        return $this;
    }

    public function removeProductUserStorage(ProductUserStorage $productUserStorage): static
    {
        if ($this->productUserStorages->removeElement($productUserStorage)) {
            // set the owning side to null (unless already changed)
            if ($productUserStorage->getStorage() === $this) {
                $productUserStorage->setStorage(null);
            }
        }

        return $this;
    }
}

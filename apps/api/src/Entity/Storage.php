<?php

namespace App\Entity;

use ApiPlatform\Metadata as Api;
use App\Repository\StorageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: StorageRepository::class)]
#[Api\ApiResource(
    normalizationContext: ['groups' => ['storage:read']],
    denormalizationContext: ['groups' => ['storage:write']],
)]

class Storage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]

    #[Groups(['storage:read', 'product_user_storage:read','storage:write','product_user_storage:update'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['storage:read', 'storage:write', 'product_user_storage:read','product_user_storage:update'])]

    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'storages')]
    #[Groups(['storage:read', 'storage:write','product_user_storage:read'])]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'storage', targetEntity: ProductUserStorage::class)]
    #[Groups(['storage:read', 'storage:write', 'product_user_storage:read'])]
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
            if ($productUserStorage->getStorage() === $this) {
                $productUserStorage->setStorage(null);
            }
        }

        return $this;
    }
}

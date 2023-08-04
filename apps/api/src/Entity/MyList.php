<?php

namespace App\Entity;

use ApiPlatform\Metadata as Api;
use App\Repository\MyListRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MyListRepository::class)]
#[Api\ApiResource (
    normalizationContext: ['groups' => ['my_list:read']],
    denormalizationContext: ['groups' => ['my_list:write']],
)]
class MyList
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['my_list:read' , 'my_list:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['my_list:read', 'my_list:write'])]
    private ?string $name = null;

    #[ORM\ManyToOne]
    #[Groups(['my_list:read', 'my_list:write'])]
    private ?User $user = null;
    
    #[ORM\ManyToMany(targetEntity: Product::class, mappedBy: 'my_list')]
    #[Groups(['my_list:read', 'my_list:write'])]
    private Collection $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
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
            $product->addMyList($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        if ($this->products->removeElement($product)) {
            $product->removeMyList($this);
        }

        return $this;
    }
}

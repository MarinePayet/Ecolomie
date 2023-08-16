<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductForListRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductForListRepository::class)]
#[ApiResource(
    normalizationContext:['groups' => 'read:productForList'],
    denormalizationContext:['groups' => 'write:productForList']
)]
class ProductForList
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:productForList', 'my_list:read','read:MyListWithProduct', 'write:productForList'])]
    private ?int $id = null;
    
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read:productForList', 'my_list:read','read:MyListWithProduct', 'write:productForList'])]
    private ?string $name = null;
    
    
    #[ORM\ManyToOne(inversedBy: 'productForLists')]
    #[Groups(['read:productForList', 'my_list:read','read:MyListWithProduct', 'write:productForList'])]
    private ?Category $category = null;

    #[ORM\OneToMany(mappedBy: 'productForList', targetEntity: MyListWithProduct::class)]
    private Collection $myListWithProducts;

    public function __construct()
    {

        $this->myListWithProducts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

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

    /**
     * @return Collection<int, MyListWithProduct>
     */
    public function getMyListWithProducts(): Collection
    {
        return $this->myListWithProducts;
    }

    public function addMyListWithProduct(MyListWithProduct $myListWithProduct): static
    {
        if (!$this->myListWithProducts->contains($myListWithProduct)) {
            $this->myListWithProducts->add($myListWithProduct);
            $myListWithProduct->setProductForList($this);
        }

        return $this;
    }

    public function removeMyListWithProduct(MyListWithProduct $myListWithProduct): static
    {
        if ($this->myListWithProducts->removeElement($myListWithProduct)) {
            // set the owning side to null (unless already changed)
            if ($myListWithProduct->getProductForList() === $this) {
                $myListWithProduct->setProductForList(null);
            }
        }

        return $this;
    }
}

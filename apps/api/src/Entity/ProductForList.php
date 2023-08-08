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
)]
class ProductForList
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:productForList'])]
    private ?int $id = null;
    
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read:productForList'])]
    private ?string $name = null;
    
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read:productForList'])]
    private ?string $quantity = null;
    
    #[ORM\ManyToOne(inversedBy: 'productForLists')]
    #[Groups(['read:productForList'])]
    private ?Category $category = null;

    #[ORM\ManyToMany(targetEntity: MyList::class, inversedBy: 'productForLists')]
    #[Groups(['read:productForList'])]
    private Collection $myList;

    public function __construct()
    {
        $this->myList = new ArrayCollection();
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

    public function getQuantity(): ?string
    {
        return $this->quantity;
    }

    public function setQuantity(?string $quantity): static
    {
        $this->quantity = $quantity;

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
     * @return Collection<int, MyList>
     */
    public function getMyList(): Collection
    {
        return $this->myList;
    }

    public function addMyList(MyList $myList): static
    {
        if (!$this->myList->contains($myList)) {
            $this->myList->add($myList);
        }

        return $this;
    }

    public function removeMyList(MyList $myList): static
    {
        $this->myList->removeElement($myList);

        return $this;
    }
}

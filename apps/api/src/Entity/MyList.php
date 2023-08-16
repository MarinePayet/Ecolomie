<?php

namespace App\Entity;

use ApiPlatform\Metadata as Api;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\MyListRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: MyListRepository::class)]
#[Api\ApiResource ()]
#[GetCollection(
    normalizationContext: ['groups' => ['my_list:read']],
)]
#[Get(
    normalizationContext: ['groups' => ['my_list:read']],
    denormalizationContext: ['groups' => ['my_list:write']],
)]
#[Put(
    denormalizationContext: ['groups' => ['my_list:write']],
    )]

#[Delete(
    normalizationContext: ['groups' => ['removeProductFromList:read']],
    denormalizationContext: ['groups' => ['removeProductFromList:write']],
)]

#[Post(
    normalizationContext: ['groups' => ['my_list:read']],
    denormalizationContext: ['groups' => ['my_list:write']],
)]

class MyList
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['my_list:read' , 'my_list:write', 'read:productForList','read:MyListWithProduct'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['my_list:read', 'my_list:write', 'read:productForList', 'read:MyListWithProduct'])]
    private ?string $name = null;
    
    #[ORM\ManyToOne]
    #[Groups(['my_list:read', 'my_list:write'])]
    private ?User $user = null;
    
    #[ORM\OneToMany(mappedBy: 'myList', targetEntity: MyListWithProduct::class)]
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
            $myListWithProduct->setMyList($this);
        }

        return $this;
    }

    public function removeMyListWithProduct(MyListWithProduct $myListWithProduct): static
    {
        if ($this->myListWithProducts->removeElement($myListWithProduct)) {
            // set the owning side to null (unless already changed)
            if ($myListWithProduct->getMyList() === $this) {
                $myListWithProduct->setMyList(null);
            }
        }

        return $this;
    }

}

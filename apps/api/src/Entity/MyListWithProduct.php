<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\MyListWithProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MyListWithProductRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext:['groups' => 'my_list_with_product:read']
        ),
        new Get(
            normalizationContext:['groups' => 'my_list_with_product:read']
        ),
        new Post(
            normalizationContext:['groups' => 'my_list_with_product:read'],
            denormalizationContext:['groups' => 'my_list_with_product:write']
        ),
        new Put(
            normalizationContext:['groups' => 'my_list_with_product:read'],
            denormalizationContext:['groups' => 'update:MyListWithProduct']
        ),
        new Delete(
            normalizationContext:['groups' => 'my_list_with_product:read'],
            denormalizationContext:['groups' => 'my_list_with_product:write']
        )
    ]
)]

class MyListWithProduct
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['my_list_with_product:read', 'my_list_with_product:write', 'product_for_list:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['my_list_with_product:read', 'my_list_with_product:write', 'product_for_list:write'])]
    private ?string $text = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(['my_list_with_product:read', 'my_list_with_product:write'])]
    private ?\DateTimeInterface $updated_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(['my_list_with_product:read', 'my_list_with_product:write'])]
    private ?\DateTimeInterface $created_at = null;
    
    #[ORM\ManyToOne(inversedBy: 'myListWithProducts')]
    #[Groups(['my_list_with_product:read', 'my_list_with_product:write', 'product_for_list:write'])]
    private ?ProductForList $productForList = null;
    
    #[ORM\ManyToOne(inversedBy: 'myListWithProducts')]
    #[Groups(['my_list_with_product:read', 'my_list_with_product:write'])]
    private ?MyList $myList = null;
    
    #[ORM\Column(nullable: true)]
    #[Groups(['my_list:read','my_list_with_product:read', 'my_list_with_product:write', 'product_for_list:write', 'update:MyListWithProduct'])]
    private ?int $quantity = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['my_list:read','my_list_with_product:read', 'my_list_with_product:write', 'product_for_list:write', 'update:MyListWithProduct'])]
    private ?bool $isProductBuy = null;

    public function __construct()
    {
        $this->updated_at = new \DateTime(); 
        $this->created_at = new \DateTime(); 
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, ProductForList>
     */

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text): static
    {
        $this->text = $text;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeInterface $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(?\DateTimeInterface $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getProductForList(): ?ProductForList
    {
        return $this->productForList;
    }

    public function setProductForList(?ProductForList $productForList): static
    {
        $this->productForList = $productForList;

        return $this;
    }

    public function getMyList(): ?MyList
    {
        return $this->myList;
    }

    public function setMyList(?MyList $myList): static
    {
        $this->myList = $myList;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(?int $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function isIsProductBuy(): ?bool
    {
        return $this->isProductBuy;
    }

    public function setIsProductBuy(?bool $isProductBuy): static
    {
        $this->isProductBuy = $isProductBuy;

        return $this;
    }
}

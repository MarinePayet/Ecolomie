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
#[ApiResource()]
#[Get(
    normalizationContext:['groups' => 'read:MyListWithProduct']
    // ,
    // denormalizationContext:['groups' => 'write:MyListWithProduct']
)]
#[Post(
    normalizationContext:['groups' => 'read:MyListWithProduct'],
    denormalizationContext:['groups' => 'write:MyListWithProduct']
)]
#[GetCollection(
    normalizationContext:['groups' => 'read:MyListWithProduct']
    // ,
    // denormalizationContext:['groups' => 'write:MyListWithProduct']
)]
#[Put(
    normalizationContext:['groups' => 'read:MyListWithProduct'],
    denormalizationContext:['groups' => 'update:MyListWithProduct']
)]
#[Delete(
    normalizationContext:['groups' => 'read:MyListWithProduct'],
    denormalizationContext:['groups' => 'write:MyListWithProduct']
)]



class MyListWithProduct
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:MyListWithProduct', 'write:MyListWithProduct', 'write:productForList'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read:MyListWithProduct', 'write:MyListWithProduct', 'write:productForList'])]
    private ?string $text = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read:MyListWithProduct', 'write:MyListWithProduct', 'write:productForList'])]
    private ?bool $is_product_buy = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(['read:MyListWithProduct', 'write:MyListWithProduct'])]
    private ?\DateTimeInterface $updated_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(['read:MyListWithProduct', 'write:MyListWithProduct'])]
    private ?\DateTimeInterface $created_at = null;
    
    #[ORM\ManyToOne(inversedBy: 'myListWithProducts')]
    #[Groups(['read:MyListWithProduct', 'write:MyListWithProduct', 'write:productForList'])]
    private ?ProductForList $productForList = null;
    
    #[ORM\ManyToOne(inversedBy: 'myListWithProducts')]
    #[Groups(['read:MyListWithProduct', 'write:MyListWithProduct'])]
    private ?MyList $myList = null;
    
    #[ORM\Column(nullable: true)]
    #[Groups(['my_list:read','read:MyListWithProduct', 'write:MyListWithProduct', 'write:productForList', 'update:MyListWithProduct'])]
    private ?int $quantity = null;

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

    public function isIsProductBuy(): ?bool
    {
        return $this->is_product_buy;
    }

    public function setIsProductBuy(bool $is_product_buy): static
    {
        $this->is_product_buy = $is_product_buy;

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
}

<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
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
    #[ApiProperty(identifier:false)]
    #[Groups(['my_list:read','product_user_storage:read',])]
    private ?int $id = null;
    
    #[ORM\Column(length: 1000)]
    #[Groups(['my_list:read','product_user_storage:read',])]
    private ?string $name = null;
    
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['product_user_storage:read','product:read',])]
    private ?string $nutriscore = null;
    
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['product_user_storage:read',])]
    private ?string $image = null;
    
    #[ORM\ManyToOne(inversedBy: 'products')]
    #[Groups(['product_user_storage:read',])]
    private ?Category $category = null;


    #[ORM\ManyToMany(targetEntity: MyList::class, inversedBy: 'products')]
    private Collection $my_list;
    
    #[ORM\Column(length: 255, nullable: true)]
    #[ApiProperty(identifier:true)]
    #[Groups(['product_user_storage:read','product:read',])]
    private ?string $barcode = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductUserStorage::class)]
    #[Groups(['product:read'])]
    private Collection $product_user_storage;



    // #[ORM\ManyToOne(inversedBy: 'product')]
    // private ?ProductUserStorage $productUserStorageId = null;

    public function __construct()
    {
        $this->product_user_storage = new ArrayCollection();
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


    /**
     * @return Collection<int, MyList>
     */
    public function getMyList(): Collection
    {
        return $this->my_list;
    }

    public function addMyList(MyList $myList): static
    {
        if (!$this->my_list->contains($myList)) {
            $this->my_list->add($myList);
        }

        return $this;
    }

    public function removeMyList(MyList $myList): static
    {
        $this->my_list->removeElement($myList);

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

    // public function getProductUserStorageId(): ?ProductUserStorage
    // {
    //     return $this->productUserStorageId;
    // }

    // public function setProductUserStorageId(?ProductUserStorage $productUserStorageId): static
    // {
    //     $this->productUserStorageId = $productUserStorageId;

    //     return $this;
    // }

    /**
     * @return Collection<int, ProductUserStorage>
     */
    public function getProductUserStorage(): Collection
    {
        return $this->product_user_storage;
    }

    public function addProductUserStorage(ProductUserStorage $productUserStorage): static
    {
        if (!$this->product_user_storage->contains($productUserStorage)) {
            $this->product_user_storage->add($productUserStorage);
            $productUserStorage->setProduct($this);
        }

        return $this;
    }


    public function __toString(): string
    {
        return $this->name;
    }
    public function removeProductUserStorage(ProductUserStorage $productUserStorage): static
    {
        if ($this->product_user_storage->removeElement($productUserStorage)) {
            // set the owning side to null (unless already changed)
            if ($productUserStorage->getProduct() === $this) {
                $productUserStorage->setProduct(null);
            }
        }

        return $this;
    }

   
}

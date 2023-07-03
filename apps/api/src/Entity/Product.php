<?php

namespace App\Entity;

use ApiPlatform\Metadata as Api;
use Symfony\Component\Serializer\Annotation\Groups;

use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[Api\ApiResource(
    normalizationContext:['groups' => ['read_products']],
    denormalizationContext:['groups' => ['create_product']]
)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['read_products','create_product'])]
    private ?float $quantity = null;    

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups(['read_products','create_product'])]
    private ?\DateTimeInterface $dlc = null;

    #[ORM\Column(length: 30, nullable: true)]
    #[Groups(['read_products','create_product'])]
    private ?string $nutriscore = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read_products','create_product'])]
    private ?float $calorie = null;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(['read_products','create_product'])]
    private ?string $season = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read_products','create_product'])]
    private ?Category $category = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read_products','create_product'])]
    private ?Storage $storage = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read_products','create_product'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read_products','create_product'])]
    private ?string $unit = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[Groups(['read_products','create_product'])]
    private ?User $user = null;

    public function __construct()
    {

    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?float
    {
        return $this->quantity;
    }

    public function setQuantity(float $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getDlc(): ?\DateTimeInterface
    {
        return $this->dlc;
    }

    public function setDlc(?\DateTimeInterface $dlc): static
    {
        $this->dlc = $dlc;

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

    public function getCalorie(): ?float
    {
        return $this->calorie;
    }

    public function setCalorie(?float $calorie): static
    {
        $this->calorie = $calorie;

        return $this;
    }

    public function getSeason(): ?string
    {
        return $this->season;
    }

    public function setSeason(?string $season): static
    {
        $this->season = $season;

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

    public function getStorage(): ?Storage
    {
        return $this->storage;
    }

    public function setStorage(?Storage $storage): static
    {
        $this->storage = $storage;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */


    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getUnit(): ?string
    {
        return $this->unit;
    }

    public function setUnit(?string $unit): static
    {
        $this->unit = $unit;

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
}

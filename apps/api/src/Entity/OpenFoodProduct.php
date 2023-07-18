<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\OpenFoodProductRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OpenFoodProductRepository::class)]
#[ApiResource]
class OpenFoodProduct
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $code = null;

    #[ORM\Column(length: 255)]
    private ?string $categories = null;

    #[ORM\Column(length: 255)]
    private ?string $nutriscore_grade = null;

    #[ORM\Column(length: 255)]
    private ?string $product_name = null;

    #[ORM\Column(length: 255)]
    private ?string $image_front_small_url = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getCategories(): ?string
    {
        return $this->categories;
    }

    public function setCategories(string $categories): static
    {
        $this->categories = $categories;

        return $this;
    }

    public function getNutriscoreGrade(): ?string
    {
        return $this->nutriscore_grade;
    }

    public function setNutriscoreGrade(string $nutriscore_grade): static
    {
        $this->nutriscore_grade = $nutriscore_grade;

        return $this;
    }

    public function getProductName(): ?string
    {
        return $this->product_name;
    }

    public function setProductName(string $product_name): static
    {
        $this->product_name = $product_name;

        return $this;
    }

    public function getImageFrontSmallUrl(): ?string
    {
        return $this->image_front_small_url;
    }

    public function setImageFrontSmallUrl(string $image_front_small_url): static
    {
        $this->image_front_small_url = $image_front_small_url;

        return $this;
    }
}

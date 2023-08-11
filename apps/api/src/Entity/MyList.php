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
    #[Groups(['my_list:read' , 'my_list:write', 'read:productForList'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['my_list:read', 'my_list:write', 'read:productForList'])]
    private ?string $name = null;

    #[ORM\ManyToOne]
    #[Groups(['my_list:read', 'my_list:write'])]
    private ?User $user = null;

    public function __construct()
    {
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

}

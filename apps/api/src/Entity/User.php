<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Constraints\PasswordStrength;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    normalizationContext:['groups' => 'read_user'],
    denormalizationContext:['groups' => 'write_user']
    )]
#[ORM\EntityListeners(['App\EntityListener\PasswordListener'])]

#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]

    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank]
    #[Groups(['read_user', 'write_user'])]
    #[Assert\Email([
        'message' => 'The email "{{ value }}" is not a valid email.'
    ])]
    
    private ?string $email = null;


    #[ORM\Column]
    private array $roles = [];
    #[Groups(['read_user'])]


    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    // #[Assert\NotBlank]
    private ?string $password = null;

    #[Assert\PasswordStrength([
        'minScore' => PasswordStrength::STRENGTH_MEDIUM,
        'message' => 'Le mot de passe est trop faible. Veuillez utiliser un mot de passe plus fort.',
    ])]
    #[Groups(['read_user', 'write_user'])]
    private ?string $plainTextPassword = null;



    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['read_user', 'write_user'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['read_user', 'write_user'])]
    private ?string $lastname = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Storage::class)]
    private Collection $storages;

    public function __construct()
    {
        $this->storages = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }
    

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }


    /**
     * @return Collection<int, Storage>
     */
    public function getStorages(): Collection
    {
        return $this->storages;
    }

    public function addStorage(Storage $storage): static
    {
        if (!$this->storages->contains($storage)) {
            $this->storages->add($storage);
            $storage->setUser($this);
        }

        return $this;
    }

    public function removeStorage(Storage $storage): static
    {
        if ($this->storages->removeElement($storage)) {
            // set the owning side to null (unless already changed)
            if ($storage->getUser() === $this) {
                $storage->setUser(null);
            }
        }

        return $this;
    }

    public function getPlainTextPassword(): ?string
    {
        return $this->plainTextPassword;
    }
    public function setPlainTextPassword($plaintextPassword): static
    {
        $this->plainTextPassword = $plaintextPassword;
        return $this;
    }
}

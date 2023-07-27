<?php

namespace App\EntityListener;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

Class PasswordListener
{
    Private UserPasswordHasherInterface $hasher;
    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }
    public function prePersist(User $user)
    {
        $this->passwordHashoir($user);
    }
    public function preUpdate(User $user)
    {
        $this->passwordHashoir($user);
    }
    public function passwordHashoir(User $user)
    {
        if($user->getPlainTextPassword() === null){
            return;
        }
        $user->setPassword(
            $this->hasher->hashPassword(
                $user,
                $user->getPlainTextPassword()
            )
        );
        $user->setPlainTextPassword(null);
    }
}
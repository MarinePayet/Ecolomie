<?php

namespace App\Entity;

// use App\Entity\User;


interface OwnerableInterface
{
    public function getOwner(): ?User;
} 
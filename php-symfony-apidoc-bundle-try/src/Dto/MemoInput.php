<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

final class MemoInput
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Length(max: 255)]
        public readonly string $title,

        #[Assert\NotBlank]
        public readonly string $description,
    ) {
    }
}

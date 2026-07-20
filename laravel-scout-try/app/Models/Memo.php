<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Attributes\SearchUsingFullText;
use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Searchable;

class Memo extends Model
{
    use Searchable;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'content',
    ];

    /**
     * @return array<string, mixed>
     * @see https://laravel.com/docs/13.x/scout#configuration
     */
    #[SearchUsingPrefix(['title'])]
    #[SearchUsingFullText(['content'])]
    public function toSearchableArray(): array
    {
        $array = $this->toArray();
 
        return $array;
    }
}

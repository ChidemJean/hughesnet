<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Text extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',
        'slug',
        'content',
        'img',
        'link',
        'is_internal'
    ];

    public static function makeSlug($title)
    {
        return Str::of($title)->slug('-');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'text',
        'link',
        'background_img',
        'background_img_tablet',
        'background_img_mobile',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GeralInf extends Model
{
    use HasFactory;

    protected $fillable = [
        'meta_description',
        'footer_description',
        'phone',
        'whatsapp'
    ];

}

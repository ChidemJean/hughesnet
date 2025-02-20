<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'obs1',
        'obs2',
        'link'
    ];

    public function items(): HasMany
    {
        return $this->hasMany(PlanItem::class);
    }
}

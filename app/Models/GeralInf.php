<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GeralInf extends Model
{
    use HasFactory;

    /**
     * Get the addresses for the inf
     */
    public function addresses(): HasMany
    {
        return $this->hasMany(AddressInf::class);
    }

    /**
     * Get the contacts for the inf
     */
    public function contacts(): HasMany
    {
        return $this->hasMany(ContactInf::class);
    }
}

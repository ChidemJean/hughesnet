<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactInf extends Model
{
    use HasFactory;

    /**
     * Get the inf that owns the contact
     */
    public function inf(): BelongsTo
    {
        return $this->belongsTo(GeralInf::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotionner extends Model
{
    /** @use HasFactory<\Database\Factories\PromotionnerFactory> */
    use HasFactory;
    protected $fillable = [
        'date_application',
        'id_promotion', // foreign key
        'id_voiture', // foreign key
    ];
}

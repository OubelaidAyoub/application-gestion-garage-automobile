<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avance extends Model
{
    /** @use HasFactory<\Database\Factories\AvanceFactory> */
    use HasFactory;
    protected $fillable = [
        'montant',
        'duree',
        'date_avance',
        'cin_client', // foreign key
        'id_voiture', // foreign key
    ];
}

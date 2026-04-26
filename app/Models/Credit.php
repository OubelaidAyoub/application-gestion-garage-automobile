<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{
    /** @use HasFactory<\Database\Factories\CreditFactory> */
    use HasFactory;
    protected $fillable = [
        'montant_paye',
        'montant_restant',
        'date_debut',
        'date_fin',
        'delai_total',
        'montant_a_rembourser',
        'periode_remboursement',
        'etat', // 'en cours', 'remboursé'
        'cin_client', // foreign key
        'id_voiture', // foreign key
    ];
}

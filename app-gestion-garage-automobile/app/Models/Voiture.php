<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    /** @use HasFactory<\Database\Factories\VoitureFactory> */
    use HasFactory;
    protected $fillable = [
        'matricule',
        'marque',
        'modele',
        'annee',
        'kilometrage',
        'description',
        'prix_achat',
        'prix_vente',
        'prix_propose',
        'date_achat',
        'date_vente',
        'etat',
        'couleur',
        'boite_vitesse',
        'carburant',
        'nombre_portes',
        'nombre_places',
        'type_vehicule',
        'puissance_fiscale',
        'puissance_moteur',
        'equipement',
        'images',
        'cin_client',
        'id_promotion'
    ];

    // Voiture.php
    public function promotion()
    {
        return $this->belongsTo(Promotion::class, 'id_promotion');
    }
}

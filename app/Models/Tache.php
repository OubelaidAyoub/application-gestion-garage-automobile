<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tache extends Model
{
    /** @use HasFactory<\Database\Factories\TacheFactory> */
    use HasFactory;
    protected $fillable = [
        'objectif',
        'description',
        'statut', //en cours -- réalisée
        'priorite', // Haute - Moyenne - faible
        'cin_emp_traitant',
        'id_emp'
    ];

    // app/Models/Tache.php

    public function getRouteKeyName()
    {
        return 'id'; // ← par défaut, mais le forcer peut aider Laravel si jamais tu as modifié les routes
    }
}

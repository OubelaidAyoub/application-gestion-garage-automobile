<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    /** @use HasFactory<\Database\Factories\MaintenanceFactory> */
    use HasFactory;
    protected $fillable = [
        'type_maintenance', 
        'description', 
        'frais_maintenance',
        'id_voiture', // foreign key
    ];
}

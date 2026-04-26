<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    /** @use HasFactory<\Database\Factories\OperationFactory> */
    use HasFactory;
    protected $fillable = [
        'type_operation', //'ajout', 'modification, 'suppression'
        'date_opertaion',
        'flag', //0 or 1
        'id_voiture', // foreign key
        'id_maintenance', // foreign key
        'id_promotion', // foreign key
        'id_credit', // foreign key
        'id_avance', // foreign key
        'id_emp', // foreign key
    ];
}

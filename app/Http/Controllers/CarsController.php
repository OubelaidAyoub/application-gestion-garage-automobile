<?php

namespace App\Http\Controllers;

use App\Models\Garage;
use App\Models\Voiture;


class CarsController extends Controller
{ 
    public function show() {
        $paginatedVoitures = Voiture::with('promotion')->latest()->paginate(10);
        $garage = Garage::take(1)->get();

        return inertia('CarListPage', [
            'paginatedVoitures' => $paginatedVoitures,
            'garage' => $garage,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Garage;
use App\Models\Voiture;

class HomeController extends Controller
{
    public function show()
    {

        $voitures = Voiture::with('promotion')->take(3)->get();

        $garage = Garage::take(1)->get();

        return inertia('Home', [
            'voitures' => $voitures,
            'garage' => $garage,
        ]);
    }
}

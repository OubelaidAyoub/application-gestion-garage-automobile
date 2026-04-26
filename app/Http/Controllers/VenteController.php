<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $annee = date('Y');

        $caMensuel = DB::table('ventes')
            ->selectRaw('MONTH(date_vente) as mois, SUM(montant) as chiffre_affaire')
            ->whereYear('date_vente', $annee)
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        $caParMois = collect(range(1, 12))->mapWithKeys(function ($mois) use ($caMensuel) {
            $ca = $caMensuel->firstWhere('mois', $mois);
            return [$mois => $ca ? (float) $ca->chiffre_affaire : 0];
        });

        return Inertia::render('Dashboard', [
            'annee' => $annee,
            'caMensuel' => $caParMois,
        ]);
    }
}

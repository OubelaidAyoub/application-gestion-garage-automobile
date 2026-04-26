<?php

namespace App\Http\Controllers;

use App\Models\Avance;
use App\Models\Client;
use App\Models\Contact;
use App\Models\Credit;
use App\Models\Garage;
use App\Models\Maintenance;
use App\Models\Poste;
use App\Models\Promotion;
use App\Models\Tache;
use App\Models\User;
use App\Models\Voiture;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function show()
    {
        $annee = date('Y');

        $promotions = Promotion::latest()->get();
        $garage = Garage::first();
        $clients = Client::latest()->get();
        $avances = DB::table('avances')
            ->join('voitures', 'avances.id_voiture', '=', 'voitures.id')
            ->select(
                'avances.*',
                'voitures.matricule',
                'voitures.marque',
                'voitures.modele'
            )
            ->latest()
            ->get();
        $voitures = Voiture::latest()->get();
        $credits = DB::table('credits')
            ->join('voitures', 'credits.id_voiture', '=', 'voitures.id')
            ->select(
                'credits.*',
                'voitures.matricule',
                'voitures.marque',
                'voitures.modele',
            )
            ->latest()
            ->get();
        $maintenances = DB::table('maintenances')
            ->join('voitures', 'maintenances.id_voiture', '=', 'voitures.id')
            ->select(
                'maintenances.*',
                'voitures.matricule',
                'voitures.marque',
                'voitures.modele'
            )
            ->latest()
            ->get();
        $accounts = User::latest()->get();
        $postes = Poste::latest()->get();
        $taches = Tache::latest()->get();
        $contacts = DB::table('contacts')
            ->join('voitures', 'contacts.id_voiture', '=', 'voitures.id')
            ->select(
                'contacts.*',
                'voitures.matricule',
                'voitures.marque',
                'voitures.modele'
            )
            ->latest()
            ->get();

        $voituresPromotionees = DB::table('promotions')
            ->join('voitures', 'promotions.id', '=' , 'voitures.id_promotion')
            ->select(
                'promotions.*',
                'voitures.id as id_voiture',
                'voitures.matricule',
                'voitures.marque',
                'voitures.modele',
                'voitures.prix_achat',
                'voitures.prix_propose',
                'promotions.nom as promotion_nom',
                'promotions.pourcentage_reduction',
                'promotions.description',
                'promotions.date_debut',
                'promotions.date_fin'
            )
            ->get();

        $caMensuelRaw = DB::table('voitures')
            ->selectRaw('MONTH(date_vente) as mois, SUM(prix_vente) as chiffre_affaire')
            ->whereYear('date_vente', $annee)
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        $caMensuel = collect(range(1, 12))->mapWithKeys(function ($mois) use ($caMensuelRaw) {
            $ca = $caMensuelRaw->firstWhere('mois', $mois);
            return [$mois => $ca ? (float) $ca->chiffre_affaire : 0];
        });

        return inertia('Dashboard', [
            'promotions' => $promotions,
            'garage' => $garage,
            'clients' => $clients,
            'avances' => $avances,
            'voitures' => $voitures,
            'credits' => $credits,
            'maintenances' => $maintenances,
            'accounts' => $accounts,
            'postes' => $postes,
            'voituresPromotionnees' => $voituresPromotionees,
            'taches' => $taches,
            'annee' => $annee,
            'caMensuel' => $caMensuel,
            'contacts' => $contacts,

        ]);
    }
}

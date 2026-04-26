<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VoitureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'matricule' => ['required', 'string', 'unique:voitures,matricule'],
            'marque' => ['required', 'string'],
            'modele' => ['required', 'string'],
            'annee' => ['required', 'integer', 'between:1900,2100'],
            'kilometrage' => ['required', 'integer'],
            'description' => ['nullable', 'string'],
            'prix_achat' => ['required', 'numeric'],
            'prix_vente' => ['nullable', 'numeric'],
            'prix_propose' => ['nullable', 'numeric'],
            'date_achat' => ['required', 'date'],
            'date_vente' => ['nullable', 'date'],
            'etat' => ['required', 'in:neuf,occasion'],
            'couleur' => ['required', 'string'],
            'boite_vitesse' => ['required', 'in:manuelle,automatique'],
            'carburant' => ['required', 'in:essence,diesel,électrique,hybride'],
            'nombre_portes' => ['required', 'integer'],
            'nombre_places' => ['required', 'integer'],
            'type_vehicule' => ['required', 'string'],
            'puissance_fiscale' => ['required', 'integer'],
            'puissance_moteur' => ['required', 'integer'],
            'equipement' => ['required', 'string'],
            'images' => ['required'],
            'images.*' => ['image', 'max:2048'],
            'cin_client' => ['nullable', 'exists:clients,cin_client'],

        ]);

        if ($request->hasFile('images')) {
            $paths = [];
            foreach ($request->file('images') as $image) {
                $paths[] = $image->store('voituresImages','public');
            }

            $fields['images'] = implode(';', $paths);
        }
 
        Voiture::create($fields);
        return redirect()->back()->with('success', 'Voiture ajoutée avec succès');
    }

    /**
     * Display the specified resource.
     */
    public function show(Voiture $voiture)
    {
        $voiture->load('promotion'); // charge la relation promotion

        return Inertia::render('CarDetailPage', ['voiture' => $voiture]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voiture $voiture)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voiture $voiture)
    {
        $fields = $request->validate([
            'matricule' => ['required'],
            'marque' => ['required'],
            'modele' => ['required'],
            'annee' => ['required'],
            'kilometrage' => ['required'],
            'description' => ['nullable'],
            'prix_achat' => ['required'],
            'prix_vente' => ['nullable'],
            'prix_propose' => ['nullable'],
            'date_achat' => ['required', 'date'],
            'date_vente' => ['nullable', 'date'],
            'etat' => ['required'],
            'couleur' => ['required'],
            'boite_vitesse' => ['required'],
            'carburant' => ['required'],
            'nombre_portes' => ['required'],
            'nombre_places' => ['required'],
            'type_vehicule' => ['required'],
            'puissance_fiscale' => ['required'],
            'puissance_moteur' => ['required'],
            'equipement' => ['required'],
            'images' => ['nullable'],
            'images.*' => ['image', 'max:2048'],
            'cin_client' => ['nullable'],

        ]);

        if ($request->hasFile('images')) {
            $paths = [];
            foreach ($request->file('images') as $image) {
                $paths[] = $image->store('voituresImages', 'public');
            }

            $fields['images'] = implode(';', $paths);
        } else {
            // Ne pas mettre à jour la colonne images
            unset($fields['images']);
        }
        
        $voiture->update($fields);
        return redirect()->back()->with('success', 'Voiture modifiée avec succès');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voiture $voiture)
    {
        if ($voiture->images) {
            $images = explode(';', $voiture->images);
            foreach ($images as $imagePath) {
                if (Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }
        }
        $voiture->delete();
        return redirect()->back()->with('success', 'Voiture supprimée avec succès');
    }
}

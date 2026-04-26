<?php

namespace App\Http\Controllers;

use App\Models\Avance;
use App\Http\Requests\StoreAvanceRequest;
use App\Http\Requests\UpdateAvanceRequest;
use Illuminate\Http\Request;

class AvanceController extends Controller
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
            'montant' => ['required', 'numeric'],
            'duree' => ['required', ' integer'],
            'date_avance' => ['required', 'date'],
            'cin_client' => ['required', 'string', 'max:10'],
            'id_voiture' => ['required'],
        ]);

        Avance::create($fields);
        return redirect()->back()->with('success', 'Avance créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Avance $avance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Avance $avance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Avance $avance)
    {
        $fields = $request->validate([
            'montant' => ['required'],
            'duree' => ['required'],
            'date_avance' => ['required'],
            'cin_client' => ['required'],
            'id_voiture' => ['required'],
        ]);

        $avance->update($fields);
        return redirect()->back()->with('success', 'Avance modifiée avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Avance $avance)
    {
        $avance->delete();
        return redirect()->back()->with('success', 'Avance supprimee avec succes');
    }
}

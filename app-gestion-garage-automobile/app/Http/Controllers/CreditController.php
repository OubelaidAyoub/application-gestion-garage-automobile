<?php

namespace App\Http\Controllers;

use App\Models\Credit;
use Illuminate\Http\Request;

class CreditController extends Controller
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
            'montant_paye' => ['required','numeric'],
            'montant_restant' => ['required', 'numeric'],
            'date_debut' => ['required', 'date'],
            'date_fin' => ['required', 'date'],
            'delai_total' => ['required'],
            'montant_a_rembourser' => ['required', 'numeric'],
            'periode_remboursement' => ['required', 'integer'],
            'cin_client' => ['required'],
            'id_voiture' => ['required'],
            'etat' => ['required'],
        ]);

        Credit::create($fields);
        return redirect()->back()->with('success', 'Credit ajoute avec success');
    }

    /**
     * Display the specified resource.
     */
    public function show(Credit $credit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Credit $credit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Credit $credit)
    {
        $fields = $request->validate([
            'montant_paye' => ['required'],
            'montant_restant' => ['required'],
            'date_debut' => ['required', 'date'],
            'date_fin' => ['required', 'date'],
            'delai_total' => ['required'],
            'montant_a_rembourser' => ['required'],
            'periode_remboursement' => ['required'],
            'cin_client' => ['required', 'string'],
            'id_voiture' => ['required'],
            'etat' => ['required','string'],
        ]);

        $credit->update($fields);
        return redirect()->back()->with('success', 'Credit modifie avec success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Credit $credit)
    {
        $credit->delete();
        return redirect()->back()->with('success', 'Credit supprimee avec succes');
    }
}

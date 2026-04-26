<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use App\Http\Requests\StorePromotionRequest;
use App\Http\Requests\UpdatePromotionRequest;
use Illuminate\Http\Request;

class PromotionController extends Controller
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
        sleep(2);
        $fields = $request->validate([
            'nom' => ['required'],
            'description' => ['required'],
            'date_debut' => ['required'],
            'date_fin' => ['required'],
            'pourcentage_reduction' => ['required'],
        ]);
        Promotion::create($fields);
        return redirect()->back()->with('success', 'Promotion créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Promotion $promotion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Promotion $promotion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Promotion $promotion)
    {
        sleep(2);
        $fields = $request->validate([
            'nom' => ['required'],
            'description' => ['required'],
            'date_debut' => ['required'],
            'date_fin' => ['required'],
            'pourcentage_reduction' => ['required'],
        ]);
        $promotion->update($fields);
        return redirect()->back()->with('success', 'Promotion modifiée avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Promotion $promotion)
    {
        $promotion->delete();
        return redirect()->back()->with('success', 'Promotion supprimee avec succes');
    }
}

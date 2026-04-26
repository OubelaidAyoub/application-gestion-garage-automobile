<?php

namespace App\Http\Controllers;

use App\Models\Poste;
use App\Http\Requests\StorePosteRequest;
use App\Http\Requests\UpdatePosteRequest;
use Illuminate\Http\Request;

class PosteController extends Controller
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
            'nom_poste' => ['required'],
            'salaire' => ['required'],
            'description' => ['nullable']
        ]);

        Poste::create($fields);
        return redirect()->back()->with('success',  'Poste ajoute avec success');
    }

    /**
     * Display the specified resource.
     */
    public function show(Poste $poste)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Poste $poste)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Poste $poste)
    {
        $fields = $request->validate([
            'nom_poste' => ['required','string','max:100'],
            'salaire' => ['required','numeric'],
            'description' => ['nullable']
        ]);

        $poste->update($fields);
        return redirect()->back()->with('success',  'Poste modifie avec success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Poste $poste)
    {
        $poste->delete();
        return redirect()->back()->with('success', 'Poste supprime avec success');
    }
}

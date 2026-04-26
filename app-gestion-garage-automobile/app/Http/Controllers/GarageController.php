<?php

namespace App\Http\Controllers;

use App\Models\Garage;
use App\Http\Requests\StoreGarageRequest;
use App\Http\Requests\UpdateGarageRequest;
use Illuminate\Http\Request;

class GarageController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Garage $garage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Garage $garage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Garage $garage)
    {
        $fields = $request->validate([
            'nom' => ['required','string','max:50'],
            'adresse' => ['required','string'],
            'telephone' => ['required','string','max:20'],
            'email' => ['required','email'],
            'ville' => ['required','string','max:20'],
        ]);
        
        $garage->update($fields);
        return redirect()->back()->with('success', 'Garage modifié avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Garage $garage)
    {
        //
    }
}

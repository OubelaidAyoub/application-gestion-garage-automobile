<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
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
            'type_maintenance' => ['required'],
            'description' => ['required'],
            'frais_maintenance' => ['required'],
            'id_voiture' => ['required'],
        ]);

        Maintenance::create($fields);
        return redirect()->back()->with('success', 'Maintenance cree avec success');
    }

    /**
     * Display the specified resource.
     */
    public function show(Maintenance $maintenance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Maintenance $maintenance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Maintenance $maintenance)
    {
        $fields = $request->validate([
            'type_maintenance' => ['required'],
            'description' => ['required'],
            'frais_maintenance' => ['required'],
            'id_voiture' => ['required'],
        ]);

        $maintenance->update($fields);
        return redirect()->back()->with('success', 'Maintenance modifie avec success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Maintenance $maintenance)
    {
        $maintenance->delete();
        return redirect()->back()->with('success', 'Maintenance supprimee avec succes');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Tache;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TacheController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'objectif' => 'required|string',
            'description' => 'required|string',
            'statut' => 'required|string',
            'priorite' => 'required|string',
            'cin_emp_traitant' => 'required|string|exists:users,cin',
        ]);

        $fields['id_emp'] = Auth::id();
        Tache::create($fields);

        return redirect()->back()->with('success', 'Tâche ajoutée avec succès.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'objectif' => 'required|string',
            'description' => 'required|string',
            'statut' => 'required|string',
            'priorite' => 'required|string',
            'cin_emp_traitant' => 'required|string|exists:users,cin',
        ]);

        $fields['id_emp'] = Auth::id();
        $tache = Tache::findOrFail($id);
        $tache->update($fields);

        return redirect()->back()->with('success', 'Tâche modifiée avec succès.');
    }

    public function terminer($id)
    {
        $tache = Tache::findOrFail($id);
        $tache->statut = 'Terminée';
        $tache->save();

        return redirect()->back()->with('success', 'Tâche marquée comme terminée.');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tache = Tache::findOrFail($id);
        $tache->delete();
        return redirect()->back()->with('success', 'Tâche supprimée avec succès.');
    }
}

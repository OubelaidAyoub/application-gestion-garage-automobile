<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'min:8'],
            'cin' => ['required','min:6','max:10'],
            'nom' => ['required'],
            'prenom' => ['required'],
            'age' => ['required','min:2','max:3'],
            'adresse' => ['required','max:255'],
            'genre' => ['required'],
            'telephone' => ['required','min:10','max:20'],
            'role' => ['required'],
            'id_poste' => ['required'],
        ]);

        $validated['password'] = Hash::make($validated['password']);
        User::create($validated);
        return redirect()->back()->with('success', 'Utilisateur créé avec succès.');
    }

    public function update(Request $request, User $user)
    {
        $fields = $request->validate([
            'name' => ['required'],
            'email' => ['required'],
            'password' => ['required', 'min:8'],
            'cin' => ['required'],
            'nom' => ['required'],
            'prenom' => ['required'],
            'age' => ['required'],
            'adresse' => ['required'],
            'genre' => ['required'],
            'telephone' => ['required'],
            'role' => ['required'],
            'id_poste' => ['required'],
        ]);

        $fields['password'] = Hash::make($fields['password']);
        $user->update($fields);
        return redirect()->back()->with('success', 'Compte modifié avec succès.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back()->with('success', 'Compte supprimé avec succès.');
    }
}

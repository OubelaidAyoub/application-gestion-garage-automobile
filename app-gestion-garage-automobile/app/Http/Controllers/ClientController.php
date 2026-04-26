<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ClientController extends Controller
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
            'cin_client' => ['required', 'string', 'max:10', 'unique:clients,cin_client'],
            'nom' => ['required', 'string', 'max:20'],
            'prenom' => ['required', 'string', 'max:20'],
            'adresse' => ['required', 'string'],
            'telephone' => ['required', 'string', 'max:20'],
            'email' => ['required', 'email', 'unique:clients,email'],
            'genre' => ['required', 'in:Homme,Femme'],
            'age' => ['required', 'integer', 'between:18,90'],
        ]);
        $full_name =  strtoupper($fields['nom'])  . ' ' .  ucfirst($fields['prenom']);
        Client::create($fields);
        return redirect()->back()->with('success', "Client $full_name créé avec succès.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        $fields = $request->validate([
            'cin_client' => ['required', 'string', 'max:10'],
            'nom' => ['required', 'string', 'max:20'],
            'prenom' => ['required', 'string', 'max:20'],
            'adresse' => ['required', 'string'],
            'telephone' => ['required', 'string', 'max:20'],
            'email' => ['required', 'email',  Rule::unique('clients')->ignore($client->id)],
            'genre' => ['required'],
            'age' => ['required', 'integer', 'between:18,90'],
        ]);
        $full_name =  strtoupper($fields['nom'])  . ' ' .  ucfirst($fields['prenom']);
        $client->update($fields);
        return redirect()->back()->with('success', "Client $full_name modifié avec succès.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();
        return redirect()->back()->with('success', 'Client supprimee avec succes');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Promotionner;
use App\Http\Requests\StorePromotionnerRequest;
use App\Http\Requests\UpdatePromotionnerRequest;
use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PromotionnerController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'promotion_id' => 'required|exists:promotions,id',
            'voiture_ids' => 'required|array',
            'voiture_ids.*' => 'exists:voitures,id',
        ]);

        foreach ($request->voiture_ids as $voiture_id) {
            DB::table('voitures')
                ->where('id', $voiture_id)
                ->update(['id_promotion' => $request->promotion_id]);
        }

        return back()->with('success', 'Promotion attribuée aux voitures avec succès.');
    }

    public function deleteAssign(Voiture $voiture) {
        $voiture->update(['id_promotion' => null]);
    }   

}

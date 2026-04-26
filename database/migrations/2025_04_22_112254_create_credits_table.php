<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('credits', function (Blueprint $table) {
            $table->id();
            $table->decimal('montant_paye', 10, 2);
            $table->decimal('montant_restant', 10, 2);
            $table->date('date_debut');
            $table->date('date_fin');
            $table->integer('delai_total');
            $table->decimal('montant_a_rembourser', 10, 2);
            $table->integer('periode_remboursement'); //jours
            $table->string('cin_client'); // foreign key
            $table->foreign('cin_client')->references('cin_client')->on('clients')->onDelete('cascade');
            $table->BigInteger('id_voiture', false, true); // foreign key
            $table->foreign('id_voiture')->references('id')->on('voitures')->onDelete('cascade');
            $table->string('etat')->default('en cours'); // 'en cours', 'remboursé', 'annulé'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credits');
    }
};

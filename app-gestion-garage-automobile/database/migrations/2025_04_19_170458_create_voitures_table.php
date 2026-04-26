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
        Schema::create('voitures', function (Blueprint $table) {
            $table->id();
            $table->string('matricule')->unique();
            $table->string('marque');
            $table->string('modele');
            $table->integer('annee');
            $table->integer('kilometrage')->default(0);
            $table->text('description')->nullable();
            $table->decimal('prix_achat', 10, 2);
            $table->decimal('prix_vente', 10, 2)->nullable();
            $table->decimal('prix_propose', 10, 2)->nullable();
            $table->date('date_achat');
            $table->date('date_vente')->nullable();
            $table->enum('etat', ['neuf', 'occasion']);
            $table->string('couleur');
            $table->enum('boite_vitesse', ['manuelle', 'automatique']);
            $table->enum('carburant', ['essence', 'diesel', 'électrique', 'hybride']);
            $table->integer('nombre_portes');
            $table->integer('nombre_places');
            $table->string('type_vehicule');
            $table->integer('puissance_fiscale');
            $table->integer('puissance_moteur');
            $table->text('equipement');
            $table->text('images');
            $table->string('cin_client')->nullable();
            $table->foreign('cin_client')->references('cin_client')->on('clients')->onDelete('cascade');
            $table->unsignedBigInteger('id_promotion')->nullable();
            $table->foreign('id_promotion')->references('id')->on('promotions')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voitures');
    }
};
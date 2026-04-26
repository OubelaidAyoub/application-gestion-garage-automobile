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
        Schema::create('avances', function (Blueprint $table) {
            $table->id();
            $table->decimal('montant', 8, 2);
            $table->integer('duree');
            $table->date('date_avance');
            $table->string('cin_client');
            $table->foreign('cin_client')->references('cin_client')->on('clients')->onDelete('cascade');
            $table->unsignedBigInteger('id_voiture');
            $table->foreign('id_voiture')->references('id')->on('voitures')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avances');
    }
};

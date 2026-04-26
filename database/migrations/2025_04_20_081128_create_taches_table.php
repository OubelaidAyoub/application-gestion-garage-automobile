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
        Schema::create('taches', function (Blueprint $table) {
            $table->id();
            $table->string('objectif');
            $table->text('description');
            $table->enum('statut', ['en cours', 'terminee']);
            $table->enum('priorite', ['haute', 'moyenne', 'basse']);
            $table->string('cin_emp_traitant');
            $table->unsignedBigInteger('id_emp');
            $table->foreign('id_emp')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taches');
    }
};

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
        Schema::create('maintenances', function (Blueprint $table) {
            $table->id();
            $table->enum('type_maintenance', ['vidange', 'reparation', 'entretien']);
            $table->string('description');
            $table->decimal('frais_maintenance', 8, 2);
            $table->bigInteger('id_voiture', false, true); //foreign key
            $table->foreign('id_voiture')->references('id')->on('voitures')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenances');
    }
};

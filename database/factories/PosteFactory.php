<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Poste>
 */
class PosteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom_poste' => 'Directeur Generale',
            'salaire' => 120000,
            'description' => 'Ce poste est le poste le plus eleve dans l\'entreprise'
        ];
    }
}

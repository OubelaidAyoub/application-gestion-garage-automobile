<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Garage>
 */
class GarageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => 'Carwow',
            'adresse' => 'Rue Mohammed V Hamria 50000',
            'telephone' => '+212 535456598',
            'email' => 'Carwow@gmail.com',
            'ville' => 'Meknes'
        ];
    }
}

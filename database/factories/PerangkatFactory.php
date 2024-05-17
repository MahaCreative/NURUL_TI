<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Perangkat>
 */
class PerangkatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'nama_perangkat' => $this->faker->name(),
            'kd_perangkat' => $this->faker->name() . rand(11111, 00000),
        ];
    }
}

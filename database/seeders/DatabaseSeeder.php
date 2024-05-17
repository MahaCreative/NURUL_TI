<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Perangkat;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::create([
            'name' => 'gunturmadjid',
            'email' => 'gunturmadjid.3@gmail.com',
            'password' => bcrypt('123456'),
        ]);
        Perangkat::factory(3)->hasData(5)->create();
    }
}

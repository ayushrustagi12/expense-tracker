<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Category::truncate();
        \App\Models\Currency::truncate();

        $this->call([
            CategorySeeder::class,
            CurrencySeeder::class,
        ]);
    }
}

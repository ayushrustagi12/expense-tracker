<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Currency;

class CurrencySeeder extends Seeder
{
  public function run(): void
  {
    $currencies = [
      ['code' => 'INR', 'name' => 'Indian Rupee', 'symbol' => '₹'],
      ['code' => 'USD', 'name' => 'US Dollar', 'symbol' => '$'],
      ['code' => 'EUR', 'name' => 'Euro', 'symbol' => '€'],
      ['code' => 'GBP', 'name' => 'British Pound', 'symbol' => '£'],
      ['code' => 'JPY', 'name' => 'Japanese Yen', 'symbol' => '¥'],
      ['code' => 'AUD', 'name' => 'Australian Dollar', 'symbol' => 'A$'],
      ['code' => 'CAD', 'name' => 'Canadian Dollar', 'symbol' => 'C$'],
      // Add more currencies as needed
    ];

    foreach ($currencies as $currency) {
      Currency::create($currency);
    }
  }
}

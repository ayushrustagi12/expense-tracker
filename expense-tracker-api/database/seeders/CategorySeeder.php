<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
  public function run(): void
  {
    $incomeCategories = [
      "Salary",
      "Freelance",
      "Investment",
      "Business",
      "Rental Income",
      "Dividends",
      "Interest",
      "Gift",
      "Refund",
      "Other Income"
    ];

    $expenseCategories = [
      "Food & Dining",
      "Transport",
      "Shopping",
      "Subscriptions",
      "Utilities",
      "Groceries",
      "Healthcare",
      "Insurance",
      "Education",
      "Travel",
      "Entertainment",
      "Pet Care",
      "Gifts & Donations",
      "EMI Payment",
      "Credit Card Bill",
      "Kids",
      "Personal Care",
      "Miscellaneous",
      "Other"
    ];

    foreach ($incomeCategories as $name) {
      Category::create([
        'name' => $name,
        'type' => 'income',
      ]);
    }

    foreach ($expenseCategories as $name) {
      Category::create([
        'name' => $name,
        'type' => 'expense',
      ]);
    }
  }
}

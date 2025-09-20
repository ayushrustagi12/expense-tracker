<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Account;
use App\Models\AccountDetailsBankAccount;
use App\Models\AccountDetailsCreditCard;
use App\Models\AccountDetailsDebitCard;
use App\Models\AccountDetailsWallet;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\Budget;
use App\Models\EmiSchedule;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DummyDataSeeder extends Seeder
{
  public function run(): void
  {
    // Create a test user
    $user = User::create([
      'name' => 'John Doe',
      'email' => 'john@example.com',
      'password' => Hash::make('password123'),
    ]);

    // Create accounts
    $savingsAccount = Account::create([
      'user_id' => $user->id,
      'account_name' => 'HDFC Savings Account',
      'account_category' => 'savings',
      'balance' => 50000.00,
      'currency' => 'INR',
      'status' => 'active',
      'notes' => 'Primary savings account',
    ]);

    $currentAccount = Account::create([
      'user_id' => $user->id,
      'account_name' => 'SBI Current Account',
      'account_category' => 'current',
      'balance' => 25000.00,
      'currency' => 'INR',
      'status' => 'active',
      'notes' => 'Business current account',
    ]);

    $creditCard = Account::create([
      'user_id' => $user->id,
      'account_name' => 'HDFC Credit Card',
      'account_category' => 'credit_card',
      'balance' => -15000.00,
      'currency' => 'INR',
      'status' => 'active',
      'notes' => 'Primary credit card',
    ]);

    $debitCard = Account::create([
      'user_id' => $user->id,
      'account_name' => 'SBI Debit Card',
      'account_category' => 'debit_card',
      'balance' => 0.00,
      'currency' => 'INR',
      'status' => 'active',
      'notes' => 'Linked to current account',
    ]);

    $wallet = Account::create([
      'user_id' => $user->id,
      'account_name' => 'Paytm Wallet',
      'account_category' => 'wallet',
      'balance' => 2500.00,
      'currency' => 'INR',
      'status' => 'active',
      'notes' => 'Digital wallet for small transactions',
    ]);

    // Create account details
    AccountDetailsBankAccount::create([
      'account_id' => $savingsAccount->id,
      'holder_name' => 'John Doe',
      'bank_name' => 'HDFC Bank',
      'branch' => 'Mumbai Main Branch',
      'account_number' => '1234567890123456',
      'account_type' => 'savings',
    ]);

    AccountDetailsBankAccount::create([
      'account_id' => $currentAccount->id,
      'holder_name' => 'John Doe',
      'bank_name' => 'State Bank of India',
      'branch' => 'Delhi Branch',
      'account_number' => '9876543210987654',
      'account_type' => 'current',
    ]);

    AccountDetailsCreditCard::create([
      'account_id' => $creditCard->id,
      'holder_name' => 'John Doe',
      'bank_name' => 'HDFC Bank',
      'card_number' => '1234-5678-9012-3456',
      'billing_cycle_day' => 15,
      'is_auto_debit_enabled' => true,
    ]);

    AccountDetailsDebitCard::create([
      'account_id' => $debitCard->id,
      'holder_name' => 'John Doe',
      'bank_name' => 'State Bank of India',
      'card_number' => '9876-5432-1098-7654',
      'linked_bank_account_id' => $currentAccount->id,
    ]);

    AccountDetailsWallet::create([
      'account_id' => $wallet->id,
      'wallet_provider' => 'Paytm',
      'wallet_type' => 'digital_wallet',
    ]);

    // Get categories
    $salaryCategory = Category::where('name', 'Salary')->first();
    $freelanceCategory = Category::where('name', 'Freelance')->first();
    $foodCategory = Category::where('name', 'Food & Dining')->first();
    $transportCategory = Category::where('name', 'Transport')->first();
    $shoppingCategory = Category::where('name', 'Shopping')->first();
    $utilitiesCategory = Category::where('name', 'Utilities')->first();
    $emiCategory = Category::where('name', 'EMI Payment')->first();

    // Create transactions for the last 3 months
    $this->createTransactions($user, [
      $savingsAccount,
      $currentAccount,
      $creditCard,
      $debitCard,
      $wallet
    ], [
      $salaryCategory,
      $freelanceCategory,
      $foodCategory,
      $transportCategory,
      $shoppingCategory,
      $utilitiesCategory,
      $emiCategory
    ]);

    // Create budgets for current month
    $currentMonth = date('Y-m');
    Budget::create([
      'user_id' => $user->id,
      'category_id' => $foodCategory->id,
      'amount' => 8000.00,
      'month' => $currentMonth,
    ]);

    Budget::create([
      'user_id' => $user->id,
      'category_id' => $transportCategory->id,
      'amount' => 5000.00,
      'month' => $currentMonth,
    ]);

    Budget::create([
      'user_id' => $user->id,
      'category_id' => $shoppingCategory->id,
      'amount' => 10000.00,
      'month' => $currentMonth,
    ]);

    // Create EMI schedules
    EmiSchedule::create([
      'user_id' => $user->id,
      'account_id' => $savingsAccount->id,
      'name' => 'Home Loan EMI',
      'amount' => 25000.00,
      'total_installments' => 240,
      'installments_paid' => 12,
      'start_date' => Carbon::now()->subMonths(12),
    ]);

    EmiSchedule::create([
      'user_id' => $user->id,
      'account_id' => $savingsAccount->id,
      'name' => 'Car Loan EMI',
      'amount' => 18000.00,
      'total_installments' => 60,
      'installments_paid' => 8,
      'start_date' => Carbon::now()->subMonths(8),
    ]);

    EmiSchedule::create([
      'user_id' => $user->id,
      'account_id' => $savingsAccount->id,
      'name' => 'Personal Loan EMI',
      'amount' => 12000.00,
      'total_installments' => 36,
      'installments_paid' => 24,
      'start_date' => Carbon::now()->subMonths(24),
    ]);
  }

  private function createTransactions($user, $accounts, $categories)
  {
    $transactions = [
      // Income transactions
      ['type' => 'income', 'amount' => 75000, 'category' => 'Salary', 'description' => 'Monthly salary'],
      ['type' => 'income', 'amount' => 15000, 'category' => 'Freelance', 'description' => 'Freelance project payment'],

      // Expense transactions
      ['type' => 'expense', 'amount' => 2500, 'category' => 'Food & Dining', 'description' => 'Grocery shopping'],
      ['type' => 'expense', 'amount' => 800, 'category' => 'Food & Dining', 'description' => 'Restaurant dinner'],
      ['type' => 'expense', 'amount' => 1200, 'category' => 'Transport', 'description' => 'Fuel for car'],
      ['type' => 'expense', 'amount' => 500, 'category' => 'Transport', 'description' => 'Uber rides'],
      ['type' => 'expense', 'amount' => 3500, 'category' => 'Shopping', 'description' => 'Online shopping'],
      ['type' => 'expense', 'amount' => 2000, 'category' => 'Utilities', 'description' => 'Electricity bill'],
      ['type' => 'expense', 'amount' => 1500, 'category' => 'Utilities', 'description' => 'Internet bill'],
      ['type' => 'expense', 'amount' => 25000, 'category' => 'EMI Payment', 'description' => 'Home loan EMI'],
      ['type' => 'expense', 'amount' => 18000, 'category' => 'EMI Payment', 'description' => 'Car loan EMI'],
    ];

    // Create transactions for the last 3 months
    for ($month = 0; $month < 3; $month++) {
      $date = Carbon::now()->subMonths($month);

      foreach ($transactions as $transactionData) {
        $category = $categories->firstWhere('name', $transactionData['category']);
        $account = $accounts->random();

        // Vary amounts slightly
        $amount = $transactionData['amount'] + rand(-500, 500);

        Transaction::create([
          'user_id' => $user->id,
          'account_id' => $account->id,
          'category_id' => $category->id,
          'amount' => $amount,
          'type' => $transactionData['type'],
          'date' => $date->copy()->day(rand(1, 28)),
          'description' => $transactionData['description'],
        ]);
      }
    }
  }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Category;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
  public function index(Request $request)
  {
    $query = Transaction::with(['category', 'account'])
      ->where('user_id', Auth::id());

    // Filter by type (income/expense)
    if ($request->has('type') && in_array($request->type, ['income', 'expense'])) {
      $query->where('type', $request->type);
    }

    // Filter by category
    if ($request->has('category_id')) {
      $query->where('category_id', $request->category_id);
    }

    // Filter by account
    if ($request->has('account_id')) {
      $query->where('account_id', $request->account_id);
    }

    // Filter by date range
    if ($request->has('start_date')) {
      $query->where('date', '>=', $request->start_date);
    }
    if ($request->has('end_date')) {
      $query->where('date', '<=', $request->end_date);
    }

    // Filter by month/year
    if ($request->has('month')) {
      $query->whereMonth('date', $request->month);
    }
    if ($request->has('year')) {
      $query->whereYear('date', $request->year);
    }

    // Search by description
    if ($request->has('search')) {
      $query->where('description', 'like', '%' . $request->search . '%');
    }

    // Order by date (newest first)
    $query->orderBy('date', 'desc')->orderBy('created_at', 'desc');

    // Pagination
    $perPage = $request->get('per_page', 15);
    $transactions = $query->paginate($perPage);

    return response()->json($transactions);
  }

  public function store(Request $request)
  {
    $request->validate([
      'account_id' => 'required|exists:accounts,id',
      'category_id' => 'nullable|exists:categories,id',
      'amount' => 'required|numeric|min:0.01',
      'type' => 'required|in:income,expense',
      'date' => 'required|date',
      'description' => 'nullable|string|max:255',
    ]);

    // Verify account belongs to user
    $account = Account::where('id', $request->account_id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    $transaction = Transaction::create([
      'user_id' => Auth::id(),
      'account_id' => $request->account_id,
      'category_id' => $request->category_id,
      'amount' => $request->amount,
      'type' => $request->type,
      'date' => $request->date,
      'description' => $request->description,
    ]);

    // Update account balance
    $this->updateAccountBalance($account, $request->amount, $request->type);

    $transaction->load(['category', 'account']);

    return response()->json([
      'message' => 'Transaction created successfully',
      'data' => $transaction,
    ], 201);
  }

  public function show($id)
  {
    $transaction = Transaction::with(['category', 'account'])
      ->where('id', $id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    return response()->json($transaction);
  }

  public function update(Request $request, $id)
  {
    $transaction = Transaction::where('id', $id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    $request->validate([
      'account_id' => 'required|exists:accounts,id',
      'category_id' => 'nullable|exists:categories,id',
      'amount' => 'required|numeric|min:0.01',
      'type' => 'required|in:income,expense',
      'date' => 'required|date',
      'description' => 'nullable|string|max:255',
    ]);

    // Verify account belongs to user
    $account = Account::where('id', $request->account_id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    // Store old values for balance adjustment
    $oldAmount = $transaction->amount;
    $oldType = $transaction->type;
    $oldAccountId = $transaction->account_id;

    // Update transaction
    $transaction->update([
      'account_id' => $request->account_id,
      'category_id' => $request->category_id,
      'amount' => $request->amount,
      'type' => $request->type,
      'date' => $request->date,
      'description' => $request->description,
    ]);

    // Adjust balances
    $this->adjustAccountBalances($oldAccountId, $oldAmount, $oldType, $request->account_id, $request->amount, $request->type);

    $transaction->load(['category', 'account']);

    return response()->json([
      'message' => 'Transaction updated successfully',
      'data' => $transaction,
    ]);
  }

  public function destroy($id)
  {
    $transaction = Transaction::where('id', $id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    // Store values for balance adjustment
    $amount = $transaction->amount;
    $type = $transaction->type;
    $accountId = $transaction->account_id;

    $transaction->delete();

    // Adjust account balance
    $this->updateAccountBalance($accountId, $amount, $type === 'income' ? 'expense' : 'income');

    return response()->json(['message' => 'Transaction deleted successfully']);
  }

  public function getStats(Request $request)
  {
    $query = Transaction::where('user_id', Auth::id());

    // Filter by date range
    if ($request->has('start_date')) {
      $query->where('date', '>=', $request->start_date);
    }
    if ($request->has('end_date')) {
      $query->where('date', '<=', $request->end_date);
    }

    // Filter by month/year
    if ($request->has('month')) {
      $query->whereMonth('date', $request->month);
    }
    if ($request->has('year')) {
      $query->whereYear('date', $request->year);
    }

    $stats = $query->selectRaw('
            SUM(CASE WHEN type = "income" THEN amount ELSE 0 END) as total_income,
            SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END) as total_expense,
            COUNT(CASE WHEN type = "income" THEN 1 END) as income_count,
            COUNT(CASE WHEN type = "expense" THEN 1 END) as expense_count
        ')->first();

    $stats->net_savings = $stats->total_income - $stats->total_expense;
    $stats->savings_rate = $stats->total_income > 0 ? ($stats->net_savings / $stats->total_income) * 100 : 0;

    return response()->json($stats);
  }

  public function getCategoryStats(Request $request)
  {
    $query = Transaction::with('category')
      ->where('user_id', Auth::id());

    // Filter by date range
    if ($request->has('start_date')) {
      $query->where('date', '>=', $request->start_date);
    }
    if ($request->has('end_date')) {
      $query->where('date', '<=', $request->end_date);
    }

    // Filter by month/year
    if ($request->has('month')) {
      $query->whereMonth('date', $request->month);
    }
    if ($request->has('year')) {
      $query->whereYear('date', $request->year);
    }

    $categoryStats = $query->selectRaw('
            category_id,
            type,
            SUM(amount) as total_amount,
            COUNT(*) as transaction_count
        ')
      ->groupBy('category_id', 'type')
      ->get();

    return response()->json($categoryStats);
  }

  private function updateAccountBalance($account, $amount, $type)
  {
    if (is_numeric($account)) {
      $account = Account::find($account);
    }

    if ($type === 'income') {
      $account->increment('balance', $amount);
    } else {
      $account->decrement('balance', $amount);
    }
  }

  private function adjustAccountBalances($oldAccountId, $oldAmount, $oldType, $newAccountId, $newAmount, $newType)
  {
    // Revert old transaction effect
    $oldAccount = Account::find($oldAccountId);
    if ($oldType === 'income') {
      $oldAccount->decrement('balance', $oldAmount);
    } else {
      $oldAccount->increment('balance', $oldAmount);
    }

    // Apply new transaction effect
    $newAccount = Account::find($newAccountId);
    if ($newType === 'income') {
      $newAccount->increment('balance', $newAmount);
    } else {
      $newAccount->decrement('balance', $newAmount);
    }
  }
}

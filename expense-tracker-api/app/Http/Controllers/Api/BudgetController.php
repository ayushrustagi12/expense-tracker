<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Budget;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BudgetController extends Controller
{
  public function index(Request $request)
  {
    $query = Budget::with('category')
      ->where('user_id', Auth::id());

    // Filter by month
    if ($request->has('month')) {
      $query->where('month', $request->month);
    }

    // Filter by year
    if ($request->has('year')) {
      $query->where('month', 'like', $request->year . '-%');
    }

    $budgets = $query->orderBy('month', 'desc')->get();

    // Add spent amount for each budget
    $budgets->each(function ($budget) {
      $budget->spent_amount = $this->getSpentAmount($budget);
      $budget->remaining_amount = $budget->amount - $budget->spent_amount;
      $budget->percentage_used = $budget->amount > 0 ? ($budget->spent_amount / $budget->amount) * 100 : 0;
    });

    return response()->json($budgets);
  }

  public function store(Request $request)
  {
    $request->validate([
      'category_id' => 'nullable|exists:categories,id',
      'amount' => 'required|numeric|min:0.01',
      'month' => 'required|date_format:Y-m',
    ]);

    // Check if budget already exists for this category and month
    $existingBudget = Budget::where('user_id', Auth::id())
      ->where('category_id', $request->category_id)
      ->where('month', $request->month)
      ->first();

    if ($existingBudget) {
      return response()->json([
        'message' => 'Budget already exists for this category and month',
      ], 422);
    }

    $budget = Budget::create([
      'user_id' => Auth::id(),
      'category_id' => $request->category_id,
      'amount' => $request->amount,
      'month' => $request->month,
    ]);

    $budget->load('category');
    $budget->spent_amount = $this->getSpentAmount($budget);
    $budget->remaining_amount = $budget->amount - $budget->spent_amount;
    $budget->percentage_used = $budget->amount > 0 ? ($budget->spent_amount / $budget->amount) * 100 : 0;

    return response()->json([
      'message' => 'Budget created successfully',
      'data' => $budget,
    ], 201);
  }

  public function show($id)
  {
    $budget = Budget::with('category')
      ->where('id', $id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    $budget->spent_amount = $this->getSpentAmount($budget);
    $budget->remaining_amount = $budget->amount - $budget->spent_amount;
    $budget->percentage_used = $budget->amount > 0 ? ($budget->spent_amount / $budget->amount) * 100 : 0;

    return response()->json($budget);
  }

  public function update(Request $request, $id)
  {
    $budget = Budget::where('id', $id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    $request->validate([
      'amount' => 'required|numeric|min:0.01',
    ]);

    $budget->update([
      'amount' => $request->amount,
    ]);

    $budget->load('category');
    $budget->spent_amount = $this->getSpentAmount($budget);
    $budget->remaining_amount = $budget->amount - $budget->spent_amount;
    $budget->percentage_used = $budget->amount > 0 ? ($budget->spent_amount / $budget->amount) * 100 : 0;

    return response()->json([
      'message' => 'Budget updated successfully',
      'data' => $budget,
    ]);
  }

  public function destroy($id)
  {
    $budget = Budget::where('id', $id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    $budget->delete();

    return response()->json(['message' => 'Budget deleted successfully']);
  }

  public function getBudgetSummary(Request $request)
  {
    $month = $request->get('month', date('Y-m'));

    $budgets = Budget::with('category')
      ->where('user_id', Auth::id())
      ->where('month', $month)
      ->get();

    $totalBudget = $budgets->sum('amount');
    $totalSpent = 0;
    $budgetCount = $budgets->count();

    $budgets->each(function ($budget) use (&$totalSpent) {
      $spent = $this->getSpentAmount($budget);
      $totalSpent += $spent;
      $budget->spent_amount = $spent;
      $budget->remaining_amount = $budget->amount - $spent;
      $budget->percentage_used = $budget->amount > 0 ? ($spent / $budget->amount) * 100 : 0;
    });

    $summary = [
      'month' => $month,
      'total_budget' => $totalBudget,
      'total_spent' => $totalSpent,
      'total_remaining' => $totalBudget - $totalSpent,
      'budget_count' => $budgetCount,
      'overall_percentage_used' => $totalBudget > 0 ? ($totalSpent / $totalBudget) * 100 : 0,
      'budgets' => $budgets,
    ];

    return response()->json($summary);
  }

  private function getSpentAmount($budget)
  {
    $query = Transaction::where('user_id', Auth::id())
      ->where('type', 'expense')
      ->whereMonth('date', substr($budget->month, 5, 2))
      ->whereYear('date', substr($budget->month, 0, 4));

    if ($budget->category_id) {
      $query->where('category_id', $budget->category_id);
    }

    return $query->sum('amount');
  }
}

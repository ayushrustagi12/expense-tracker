<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmiSchedule;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class EMIController extends Controller
{
  public function index()
  {
    $emis = EmiSchedule::with('account')
      ->where('user_id', Auth::id())
      ->orderBy('start_date', 'desc')
      ->get();

    // Add calculated fields
    $emis->each(function ($emi) {
      $emi->remaining_installments = $emi->total_installments - $emi->installments_paid;
      $emi->completion_percentage = $emi->total_installments > 0 ? ($emi->installments_paid / $emi->total_installments) * 100 : 0;
      $emi->next_due_date = $this->getNextDueDate($emi);
      $emi->is_completed = $emi->installments_paid >= $emi->total_installments;
    });

    return response()->json($emis);
  }

  public function store(Request $request)
  {
    $request->validate([
      'account_id' => 'required|exists:accounts,id',
      'name' => 'required|string|max:255',
      'amount' => 'required|numeric|min:0.01',
      'total_installments' => 'required|integer|min:1',
      'start_date' => 'required|date',
    ]);

    // Verify account belongs to user
    $account = Account::where('id', $request->account_id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    $emi = EmiSchedule::create([
      'user_id' => Auth::id(),
      'account_id' => $request->account_id,
      'name' => $request->name,
      'amount' => $request->amount,
      'total_installments' => $request->total_installments,
      'installments_paid' => 0,
      'start_date' => $request->start_date,
    ]);

    $emi->load('account');
    $emi->remaining_installments = $emi->total_installments - $emi->installments_paid;
    $emi->completion_percentage = 0;
    $emi->next_due_date = $this->getNextDueDate($emi);
    $emi->is_completed = false;

    return response()->json([
      'message' => 'EMI schedule created successfully',
      'data' => $emi,
    ], 201);
  }

  public function show($id)
  {
    $emi = EmiSchedule::with('account')
      ->where('id', $id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    $emi->remaining_installments = $emi->total_installments - $emi->installments_paid;
    $emi->completion_percentage = $emi->total_installments > 0 ? ($emi->installments_paid / $emi->total_installments) * 100 : 0;
    $emi->next_due_date = $this->getNextDueDate($emi);
    $emi->is_completed = $emi->installments_paid >= $emi->total_installments;

    return response()->json($emi);
  }

  public function update(Request $request, $id)
  {
    $emi = EmiSchedule::where('id', $id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    $request->validate([
      'name' => 'required|string|max:255',
      'amount' => 'required|numeric|min:0.01',
      'total_installments' => 'required|integer|min:1',
      'installments_paid' => 'required|integer|min:0|max:' . $request->total_installments,
      'start_date' => 'required|date',
    ]);

    $emi->update([
      'name' => $request->name,
      'amount' => $request->amount,
      'total_installments' => $request->total_installments,
      'installments_paid' => $request->installments_paid,
      'start_date' => $request->start_date,
    ]);

    $emi->load('account');
    $emi->remaining_installments = $emi->total_installments - $emi->installments_paid;
    $emi->completion_percentage = $emi->total_installments > 0 ? ($emi->installments_paid / $emi->total_installments) * 100 : 0;
    $emi->next_due_date = $this->getNextDueDate($emi);
    $emi->is_completed = $emi->installments_paid >= $emi->total_installments;

    return response()->json([
      'message' => 'EMI schedule updated successfully',
      'data' => $emi,
    ]);
  }

  public function destroy($id)
  {
    $emi = EmiSchedule::where('id', $id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    $emi->delete();

    return response()->json(['message' => 'EMI schedule deleted successfully']);
  }

  public function markPayment(Request $request, $id)
  {
    $emi = EmiSchedule::where('id', $id)
      ->where('user_id', Auth::id())
      ->firstOrFail();

    $request->validate([
      'installments_to_pay' => 'required|integer|min:1|max:' . ($emi->total_installments - $emi->installments_paid),
    ]);

    $emi->increment('installments_paid', $request->installments_to_pay);

    $emi->load('account');
    $emi->remaining_installments = $emi->total_installments - $emi->installments_paid;
    $emi->completion_percentage = $emi->total_installments > 0 ? ($emi->installments_paid / $emi->total_installments) * 100 : 0;
    $emi->next_due_date = $this->getNextDueDate($emi);
    $emi->is_completed = $emi->installments_paid >= $emi->total_installments;

    return response()->json([
      'message' => 'Payment marked successfully',
      'data' => $emi,
    ]);
  }

  public function getUpcomingPayments(Request $request)
  {
    $days = $request->get('days', 30);
    $endDate = Carbon::now()->addDays($days);

    $emis = EmiSchedule::with('account')
      ->where('user_id', Auth::id())
      ->where('installments_paid', '<', DB::raw('total_installments'))
      ->get();

    $upcomingPayments = [];

    foreach ($emis as $emi) {
      $nextDueDate = $this->getNextDueDate($emi);
      if ($nextDueDate && $nextDueDate <= $endDate) {
        $upcomingPayments[] = [
          'id' => $emi->id,
          'name' => $emi->name,
          'amount' => $emi->amount,
          'due_date' => $nextDueDate,
          'account' => $emi->account,
          'remaining_installments' => $emi->total_installments - $emi->installments_paid,
        ];
      }
    }

    // Sort by due date
    usort($upcomingPayments, function ($a, $b) {
      return strtotime($a['due_date']) - strtotime($b['due_date']);
    });

    return response()->json($upcomingPayments);
  }

  public function getEMISummary()
  {
    $emis = EmiSchedule::where('user_id', Auth::id())->get();

    $totalEMIs = $emis->count();
    $activeEMIs = $emis->where('installments_paid', '<', DB::raw('total_installments'))->count();
    $completedEMIs = $emis->where('installments_paid', '>=', DB::raw('total_installments'))->count();
    $totalMonthlyEMI = $emis->where('installments_paid', '<', DB::raw('total_installments'))->sum('amount');

    $summary = [
      'total_emis' => $totalEMIs,
      'active_emis' => $activeEMIs,
      'completed_emis' => $completedEMIs,
      'total_monthly_emi' => $totalMonthlyEMI,
    ];

    return response()->json($summary);
  }

  private function getNextDueDate($emi)
  {
    if ($emi->installments_paid >= $emi->total_installments) {
      return null;
    }

    $startDate = Carbon::parse($emi->start_date);
    $nextInstallmentNumber = $emi->installments_paid + 1;

    // Calculate next due date (assuming monthly installments)
    return $startDate->addMonths($nextInstallmentNumber - 1)->format('Y-m-d');
  }
}

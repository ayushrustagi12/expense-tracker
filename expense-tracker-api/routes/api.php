<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\StaticDataController;
use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\BudgetController;
use App\Http\Controllers\Api\EMIController;
use App\Http\Controllers\CardController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::get('/static-data', [StaticDataController::class, 'index']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/accounts', [AccountController::class, 'index']);
    Route::post('/accounts', [AccountController::class, 'store']);
    Route::get('/accounts/{id}', [AccountController::class, 'show']);
    Route::put('/accounts/{id}', [AccountController::class, 'update']);
    Route::delete('/accounts/{id}', [AccountController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);
    Route::put('/transactions/{id}', [TransactionController::class, 'update']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
    Route::get('/transactions-stats', [TransactionController::class, 'getStats']);
    Route::get('/transactions-category-stats', [TransactionController::class, 'getCategoryStats']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cards', [CardController::class, 'index']);
    Route::post('/credit-cards', [CardController::class, 'storeCreditCard']);
    Route::post('/debit-cards', [CardController::class, 'storeDebitCard']);
    Route::get('/cards/{id}', [CardController::class, 'show']);
    Route::put('/cards/{id}', [CardController::class, 'update']);
    Route::delete('/cards/{id}', [CardController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/budgets', [BudgetController::class, 'index']);
    Route::post('/budgets', [BudgetController::class, 'store']);
    Route::get('/budgets/{id}', [BudgetController::class, 'show']);
    Route::put('/budgets/{id}', [BudgetController::class, 'update']);
    Route::delete('/budgets/{id}', [BudgetController::class, 'destroy']);
    Route::get('/budgets-summary', [BudgetController::class, 'getBudgetSummary']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/emis', [EMIController::class, 'index']);
    Route::post('/emis', [EMIController::class, 'store']);
    Route::get('/emis/{id}', [EMIController::class, 'show']);
    Route::put('/emis/{id}', [EMIController::class, 'update']);
    Route::delete('/emis/{id}', [EMIController::class, 'destroy']);
    Route::post('/emis/{id}/mark-payment', [EMIController::class, 'markPayment']);
    Route::get('/emis-upcoming', [EMIController::class, 'getUpcomingPayments']);
    Route::get('/emis-summary', [EMIController::class, 'getEMISummary']);
});

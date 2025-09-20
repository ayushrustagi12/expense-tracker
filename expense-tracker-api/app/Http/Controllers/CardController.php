<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCreditCardRequest;
use App\Http\Requests\StoreDebitCardRequest;
use App\Models\Account;
use App\Models\AccountDetailsCreditCard;
use App\Models\AccountDetailsDebitCard;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CardController extends Controller
{
  public function index()
  {
    $cards = Account::with([
      'creditCardDetails',
      'debitCardDetails',
    ])->where('user_id', Auth::id())
      ->whereIn('account_category', ['credit_card', 'debit_card'])
      ->get();

    return response()->json($cards);
  }

  public function storeCreditCard(StoreCreditCardRequest $request): JsonResponse
  {
    // Create the main account record
    $account = Account::create([
      'user_id' => Auth::id(),
      'account_name' => $request->card_name,
      'account_category' => 'credit_card',
      'balance' => 0,
      'currency' => $request->currency ?? 'INR',
      'status' => 'active',
      'notes' => $request->notes,
    ]);

    // Create credit card details
    $creditCardDetails = AccountDetailsCreditCard::create([
      'account_id' => $account->id,
      'holder_name' => $request->holder_name,
      'bank_name' => $request->bank_name,
      'card_number' => $request->card_number,
      'billing_cycle_day' => $request->billing_cycle_day ?? 1,
      'is_auto_debit_enabled' => $request->is_auto_debit_enabled ?? false,
    ]);

    $account->load('creditCardDetails');

    return response()->json([
      'message' => 'Credit card added successfully',
      'data' => $account,
    ], 201);
  }

  public function storeDebitCard(StoreDebitCardRequest $request): JsonResponse
  {
    // Create the main account record
    $account = Account::create([
      'user_id' => Auth::id(),
      'account_name' => $request->card_name,
      'account_category' => 'debit_card',
      'balance' => 0,
      'currency' => $request->currency ?? 'INR',
      'status' => 'active',
      'notes' => $request->notes,
    ]);

    // Create debit card details
    $debitCardDetails = AccountDetailsDebitCard::create([
      'account_id' => $account->id,
      'holder_name' => $request->holder_name,
      'bank_name' => $request->bank_name,
      'card_number' => $request->card_number,
      'linked_bank_account_id' => $request->linked_bank_account_id,
    ]);

    $account->load('debitCardDetails');

    return response()->json([
      'message' => 'Debit card added successfully',
      'data' => $account,
    ], 201);
  }

  public function show($id)
  {
    $card = Account::with([
      'creditCardDetails',
      'debitCardDetails',
    ])->where('id', $id)
      ->where('user_id', Auth::id())
      ->whereIn('account_category', ['credit_card', 'debit_card'])
      ->firstOrFail();

    return response()->json($card);
  }

  public function update(Request $request, $id)
  {
    $card = Account::where('id', $id)
      ->where('user_id', Auth::id())
      ->whereIn('account_category', ['credit_card', 'debit_card'])
      ->firstOrFail();

    $card->update($request->only(['account_name', 'balance', 'currency', 'status', 'notes']));

    return response()->json(['message' => 'Card updated successfully']);
  }

  public function destroy($id)
  {
    $card = Account::where('id', $id)
      ->where('user_id', Auth::id())
      ->whereIn('account_category', ['credit_card', 'debit_card'])
      ->firstOrFail();

    $card->delete();

    return response()->json(['message' => 'Card deleted successfully']);
  }
}

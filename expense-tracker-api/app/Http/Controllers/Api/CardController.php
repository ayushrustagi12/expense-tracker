<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCreditCardRequest;
use App\Http\Requests\StoreDebitCardRequest;
use App\Models\AccountDetailsCreditCard;
use App\Models\AccountDetailsDebitCard;
use Illuminate\Http\JsonResponse;

class CardController extends Controller
{
    public function storeCreditCard(StoreCreditCardRequest $request): JsonResponse
    {
        $user = $request->user();

        $creditCard = AccountDetailsCreditCard::create([
            'user_id' => $user->id,
            'card_name' => $request->card_name,
            'card_number' => $request->card_number,
            'credit_limit' => $request->credit_limit,
            'billing_date' => $request->billing_date,
        ]);

        return response()->json([
            'message' => 'Credit card added successfully',
            'data' => $creditCard,
        ], 201);
    }

    public function storeDebitCard(StoreDebitCardRequest $request): JsonResponse
    {
        $user = $request->user();

        $debitCard = AccountDetailsDebitCard::create([
            'user_id' => $user->id,
            'card_name' => $request->card_name,
            'card_number' => $request->card_number,
            'linked_account_id' => $request->linked_account_id,
        ]);

        return response()->json([
            'message' => 'Debit card added successfully',
            'data' => $debitCard,
        ], 201);
    }
}

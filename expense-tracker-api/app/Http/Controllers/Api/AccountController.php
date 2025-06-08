<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\AccountDetailBankAccount;
use App\Models\AccountDetailCreditCard;
use App\Models\AccountDetailDebitCard;
use App\Models\AccountDetailWallet;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::with([
            'bankAccountDetails',
            'creditCardDetails',
            'debitCardDetails',
            'walletDetails',
        ])->where('user_id', Auth::id())->get();

        return response()->json($accounts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'account_name' => 'required|string',
            'account_category' => 'required|in:savings,current,credit_card,debit_card,wallet',
            'balance' => 'nullable|numeric',
            'currency' => 'required|string',
            'notes' => 'nullable|string',
            'details' => 'required|array'
        ]);

        $account = Account::create([
            'user_id' => Auth::id(),
            'account_name' => $request->account_name,
            'account_category' => $request->account_category,
            'balance' => $request->balance,
            'currency' => $request->currency,
            'status' => 'active',
            'notes' => $request->notes,
        ]);

        switch ($request->account_category) {
            case 'savings':
            case 'current':
                AccountDetailBankAccount::create([
                    'account_id' => $account->id,
                    'holder_name' => $request->details['holder_name'],
                    'bank_name' => $request->details['bank_name'],
                    'branch' => $request->details['branch'],
                    'account_number' => $request->details['account_number'],
                    'account_type' => $request->account_category,
                ]);
                break;

            case 'credit_card':
                AccountDetailCreditCard::create([
                    'account_id' => $account->id,
                    'holder_name' => $request->details['holder_name'],
                    'bank_name' => $request->details['bank_name'],
                    'card_number' => $request->details['card_number'],
                    'billing_cycle_day' => $request->details['billing_cycle_day'],
                    'is_auto_debit_enabled' => $request->details['is_auto_debit_enabled'] ?? false,
                ]);
                break;

            case 'debit_card':
                AccountDetailDebitCard::create([
                    'account_id' => $account->id,
                    'holder_name' => $request->details['holder_name'],
                    'bank_name' => $request->details['bank_name'],
                    'card_number' => $request->details['card_number'],
                    'linked_bank_account_id' => $request->details['linked_bank_account_id'] ?? null,
                ]);
                break;

            case 'wallet':
                AccountDetailWallet::create([
                    'account_id' => $account->id,
                    'wallet_provider' => $request->details['wallet_provider'],
                    'wallet_type' => $request->details['wallet_type'],
                ]);
                break;
        }

        return response()->json(['message' => 'Account created successfully', 'account_id' => $account->id]);
    }

    public function show($id)
    {
        $account = Account::with([
            'bankAccountDetails',
            'creditCardDetails',
            'debitCardDetails',
            'walletDetails',
        ])->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return response()->json($account);
    }

    public function update(Request $request, $id)
    {
        $account = Account::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        $account->update($request->only(['account_name', 'balance', 'currency', 'status', 'notes']));

        return response()->json(['message' => 'Account updated successfully']);
    }

    public function destroy($id)
    {
        $account = Account::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $account->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }
}

<?php

// app/Models/Account.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Account extends Model
{
    protected $fillable = [
        'user_id',
        'account_name',
        'account_category',
        'balance',
        'currency',
        'status',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bankAccountDetails(): HasOne
    {
        return $this->hasOne(AccountDetailsBankAccount::class);
    }

    public function creditCardDetails(): HasOne
    {
        return $this->hasOne(AccountDetailsCreditCard::class);
    }

    public function debitCardDetails(): HasOne
    {
        return $this->hasOne(AccountDetailsDebitCard::class);
    }

    public function walletDetails(): HasOne
    {
        return $this->hasOne(AccountDetailsWallet::class);
    }
}

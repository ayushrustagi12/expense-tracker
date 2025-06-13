<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountDetailsDebitCard extends Model
{
    protected $fillable = [
        'account_id',
        'holder_name',
        'bank_name',
        'card_number',
        'linked_bank_account_id',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function linkedBankAccount()
    {
        return $this->belongsTo(Account::class, 'linked_bank_account_id');
    }
}

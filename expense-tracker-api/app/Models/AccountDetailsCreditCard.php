<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountDetailsCreditCard extends Model
{
    protected $table = 'account_details_credit_cards';

    protected $fillable = [
        'account_id',
        'holder_name',
        'bank_name',
        'card_number',
        'billing_cycle_day',
        'is_auto_debit_enabled',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}

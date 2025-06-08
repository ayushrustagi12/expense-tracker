<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountDetailBankAccount extends Model
{
    protected $fillable = [
        'account_id',
        'holder_name',
        'bank_name',
        'branch',
        'account_number',
        'account_type',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountDetailsBankAccount extends Model
{
    protected $table = 'account_detail_bank_accounts';

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

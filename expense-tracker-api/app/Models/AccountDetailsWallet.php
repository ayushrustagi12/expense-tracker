<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountDetailsWallet extends Model
{
    protected $fillable = [
        'account_id',
        'wallet_provider',
        'wallet_type',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}

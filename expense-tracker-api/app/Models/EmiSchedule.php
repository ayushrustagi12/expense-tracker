<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmiSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'account_id', 'name', 'amount',
        'total_installments', 'installments_paid', 'start_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}

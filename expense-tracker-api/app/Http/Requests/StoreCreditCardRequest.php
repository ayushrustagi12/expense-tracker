<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCreditCardRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Adjust authorization logic if needed
    }

    public function rules()
    {
        return [
            'card_name' => 'required|string|max:255',
            'holder_name' => 'required|string|max:255',
            'bank_name' => 'required|string|max:255',
            'card_number' => 'required|string|max:19',
            'billing_cycle_day' => 'nullable|integer|min:1|max:31',
            'is_auto_debit_enabled' => 'nullable|boolean',
            'currency' => 'nullable|string|max:10',
            'notes' => 'nullable|string',
        ];
    }
}

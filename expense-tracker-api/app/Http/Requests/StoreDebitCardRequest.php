<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDebitCardRequest extends FormRequest
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
            'linked_bank_account_id' => 'nullable|exists:accounts,id',
            'currency' => 'nullable|string|max:10',
            'notes' => 'nullable|string',
        ];
    }
}

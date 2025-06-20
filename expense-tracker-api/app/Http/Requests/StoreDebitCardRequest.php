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
            'card_number' => 'required|string|size:16',
            'linked_account_id' => 'required|exists:accounts,id',
        ];
    }
}

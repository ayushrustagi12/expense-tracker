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
            'card_number' => 'required|string|size:16',
            'credit_limit' => 'nullable|string|max:255',
            'billing_date' => 'nullable|string|max:255',
        ];
    }
}

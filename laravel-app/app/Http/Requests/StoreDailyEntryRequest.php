<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDailyEntryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'branch_id' => ['required','exists:branches,id'],
            'date' => ['required','date'],
            'total_sales' => ['required','numeric','min:0'],
            'total_returns' => ['required','numeric','min:0'],
            'purchases' => ['nullable','numeric','min:0'],
            'operating_expenses' => ['required','numeric','min:0'],
            'owner_withdrawals' => ['nullable','numeric','min:0'],
            'deposits' => ['nullable','numeric','min:0'],
            'transfers_in' => ['nullable','numeric','min:0'],
            'transfers_out' => ['nullable','numeric','min:0'],
            'notes' => ['nullable','string','max:1000'],
        ];
    }
}

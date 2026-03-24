<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool { return auth()->check(); }

    public function rules(): array
    {
        return [
            'order_number' => ['required', 'string', 'max:50'],
            'branch_id' => ['required', 'exists:branches,id'],
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_phone' => ['nullable', 'string', 'max:30'],
            'address' => ['nullable', 'string'],
            'order_amount' => ['required', 'numeric', 'min:0'],
            'delivery_fee' => ['required', 'numeric', 'min:0'],
            'payment_type' => ['required', 'in:cash,online,mixed,credit'],
            'status' => ['required', 'in:new,ready,out_for_delivery,delivered,returned,cancelled,deferred,partially_settled'],
            'delivery_agent_id' => ['nullable', 'exists:delivery_agents,id'],
            'notes' => ['nullable', 'string'],
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected static function booted(): void
    {
        static::saving(function (self $order) {
            $order->total_due = $order->order_amount + $order->delivery_fee;
        });
    }
}

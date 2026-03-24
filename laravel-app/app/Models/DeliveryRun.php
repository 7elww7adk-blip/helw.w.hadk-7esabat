<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryRun extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function orders(){ return $this->belongsToMany(Order::class, 'delivery_run_orders'); }
}

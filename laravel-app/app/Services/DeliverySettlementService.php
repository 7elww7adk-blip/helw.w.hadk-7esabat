<?php

namespace App\Services;

use App\Models\DeliveryAgent;
use App\Models\DeliveryRun;

class DeliverySettlementService
{
    public function expectedAmount(DeliveryRun $run): float
    {
        return (float)$run->orders()->where('status', 'delivered')->sum('total_due');
    }

    public function calculateDriverFee(DeliveryAgent $agent, float $baseAmount, int $deliveredOrders): float
    {
        return match ($agent->fee_model_type) {
            'per_order' => $deliveredOrders * $agent->fee_value,
            'fixed_daily' => $agent->fee_value,
            'percentage' => ($baseAmount * $agent->fee_value) / 100,
            default => $agent->fee_value,
        };
    }

    public function shortage(float $expected, float $actual): float
    {
        return max(0, $expected - $actual);
    }

    public function overage(float $expected, float $actual): float
    {
        return max(0, $actual - $expected);
    }
}

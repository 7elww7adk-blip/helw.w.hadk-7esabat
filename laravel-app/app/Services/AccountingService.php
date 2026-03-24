<?php

namespace App\Services;

class AccountingService
{
    public function openingTotalAssets(float $cashCapital, float $openingInventory): float
    {
        return $cashCapital + $openingInventory;
    }

    public function netSales(float $sales, float $returns): float
    {
        return $sales - $returns;
    }

    public function dailyNetResult(float $sales, float $returns, float $expenses, float $withdrawals): float
    {
        return $this->netSales($sales, $returns) - $expenses - $withdrawals;
    }

    public function capitalEstimate(float $opening, float $injections, float $withdrawals, float $accumulatedResult): float
    {
        return $opening + $injections - $withdrawals + $accumulatedResult;
    }
}

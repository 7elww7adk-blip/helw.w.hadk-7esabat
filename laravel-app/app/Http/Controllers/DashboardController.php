<?php

namespace App\Http\Controllers;

use App\Models\{Branch, DailyEntry, Purchase, Expense, CashTransaction, Stocktake, DriverSettlement};

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'branches' => Branch::count(),
            'sales' => DailyEntry::sum('total_sales'),
            'purchases' => Purchase::sum('amount'),
            'expenses' => Expense::sum('amount'),
            'cashbox' => CashTransaction::sum('signed_amount'),
            'stocktake_diff' => Stocktake::sum('difference'),
            'delivery_shortage' => DriverSettlement::sum('shortage'),
        ];

        return view('dashboard.index', compact('stats'));
    }
}

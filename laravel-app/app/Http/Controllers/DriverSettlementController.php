<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDriverSettlementRequest;
use App\Models\CashTransaction;
use App\Models\DeliveryRun;
use App\Models\DriverSettlement;
use App\Services\DeliverySettlementService;

class DriverSettlementController extends Controller
{
    public function index()
    {
        $settlements = DriverSettlement::latest()->paginate(20);
        return view('driver_settlements.index', compact('settlements'));
    }

    public function store(StoreDriverSettlementRequest $request, DeliverySettlementService $service)
    {
        $run = DeliveryRun::with(['orders'])->findOrFail($request->delivery_run_id);
        $expected = $service->expectedAmount($run);
        $actual = (float) $request->actual_returned_cash;
        $shortage = $service->shortage($expected, $actual);
        $overage = $service->overage($expected, $actual);

        $settlement = DriverSettlement::create([
            'branch_id' => $run->branch_id,
            'delivery_agent_id' => $run->delivery_agent_id,
            'delivery_run_id' => $run->id,
            'expected_amount' => $expected,
            'actual_returned_cash' => $actual,
            'shortage' => $shortage,
            'overage' => $overage,
            'settlement_status' => $shortage > 0 ? 'shortage' : ($overage > 0 ? 'overage' : 'matched'),
            'settled_by' => auth()->id(),
            'settled_at' => now(),
        ]);

        CashTransaction::create([
            'branch_id' => $run->branch_id,
            'transaction_at' => now(),
            'type' => 'inflow',
            'amount' => $actual,
            'signed_amount' => $actual,
            'reference_type' => DriverSettlement::class,
            'reference_id' => $settlement->id,
            'created_by' => auth()->id(),
            'notes' => 'تحصيل تسوية مندوب',
        ]);

        return back()->with('success', 'تمت التسوية بنجاح');
    }
}

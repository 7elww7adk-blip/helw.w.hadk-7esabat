<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDailyEntryRequest;
use App\Models\DailyEntry;
use App\Services\AccountingService;

class DailyEntryController extends Controller
{
    public function index()
    {
        $entries = DailyEntry::latest('date')->paginate(20);
        return view('daily_entries.index', compact('entries'));
    }

    public function store(StoreDailyEntryRequest $request, AccountingService $service)
    {
        $data = $request->validated();
        $data['daily_net_result'] = $service->dailyNetResult($data['total_sales'],$data['total_returns'],$data['operating_expenses'],$data['owner_withdrawals'] ?? 0);
        DailyEntry::create($data);
        return back()->with('success', 'تم حفظ اليومية بنجاح');
    }
}

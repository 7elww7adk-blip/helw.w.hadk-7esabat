<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{DashboardController,BranchController,BranchSetupController,DailyEntryController,PurchaseController,ExpenseController,CashboxController,StocktakeController,CapitalController,BranchTransferController,DeliveryAgentController,OrderController,DeliveryRunController,DriverSettlementController,ReportController,UserController,SettingController};

Route::redirect('/', '/dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('branches', BranchController::class);
    Route::resource('branch-setups', BranchSetupController::class)->only(['index','store','update']);
    Route::resource('daily-entries', DailyEntryController::class);
    Route::resource('purchases', PurchaseController::class);
    Route::resource('expenses', ExpenseController::class);
    Route::get('/cashbox', [CashboxController::class, 'index'])->name('cashbox.index');
    Route::post('/cashbox/transactions', [CashboxController::class, 'storeTransaction'])->name('cashbox.transactions.store');
    Route::resource('stocktakes', StocktakeController::class);
    Route::get('/capital', [CapitalController::class, 'index'])->name('capital.index');
    Route::resource('branch-transfers', BranchTransferController::class);
    Route::resource('delivery-agents', DeliveryAgentController::class);
    Route::resource('orders', OrderController::class);
    Route::resource('delivery-runs', DeliveryRunController::class);
    Route::resource('driver-settlements', DriverSettlementController::class);
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::resource('users', UserController::class);
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('settings.update');
});

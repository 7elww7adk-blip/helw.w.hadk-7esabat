<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\BranchSetup;
use App\Models\BranchTransfer;
use App\Models\CapitalMovement;
use App\Models\CashTransaction;
use App\Models\DailyEntry;
use App\Models\DeliveryAgent;
use App\Models\DeliveryRun;
use App\Models\DriverSettlement;
use App\Models\Expense;
use App\Models\Order;
use App\Models\Purchase;
use App\Models\Stocktake;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $owner = User::create(['name' => 'صاحب المتجر', 'email' => 'owner@demo.local', 'password' => Hash::make('12345678'), 'role' => 'Owner']);
        $manager = User::create(['name' => 'مدير الفرع', 'email' => 'manager@demo.local', 'password' => Hash::make('12345678'), 'role' => 'Manager']);
        $accountant = User::create(['name' => 'المحاسب', 'email' => 'accountant@demo.local', 'password' => Hash::make('12345678'), 'role' => 'Accountant']);
        $driverUser = User::create(['name' => 'مندوب النظام', 'email' => 'driver@demo.local', 'password' => Hash::make('12345678'), 'role' => 'DeliveryAgent']);
        User::create(['name' => 'مستخدم مشاهدة', 'email' => 'viewer@demo.local', 'password' => Hash::make('12345678'), 'role' => 'Viewer']);

        $main = Branch::create(['name' => 'الفرع الرئيسي', 'code' => 'MAIN', 'opening_date' => now()->subMonths(8), 'manager_id' => $manager->id, 'is_main' => true]);
        $sub = Branch::create(['name' => 'فرع حي الندى', 'code' => 'SUB-NADA', 'opening_date' => now()->subMonths(4), 'parent_branch_id' => $main->id]);

        DB::table('user_branch_access')->insert([
            ['user_id' => $owner->id, 'branch_id' => $main->id],
            ['user_id' => $owner->id, 'branch_id' => $sub->id],
            ['user_id' => $manager->id, 'branch_id' => $main->id],
            ['user_id' => $accountant->id, 'branch_id' => $main->id],
            ['user_id' => $driverUser->id, 'branch_id' => $main->id],
        ]);

        BranchSetup::create(['branch_id' => $main->id, 'opening_cash_capital' => 120000, 'opening_inventory_value' => 80000, 'opening_cashbox_balance' => 20000]);
        BranchSetup::create(['branch_id' => $sub->id, 'opening_cash_capital' => 70000, 'opening_inventory_value' => 50000, 'opening_cashbox_balance' => 12000]);

        DailyEntry::create(['branch_id' => $main->id, 'date' => now()->toDateString(), 'total_sales' => 15000, 'total_returns' => 1200, 'purchases' => 5000, 'operating_expenses' => 2400, 'owner_withdrawals' => 700, 'daily_net_result' => 10700]);
        Purchase::create(['branch_id' => $main->id, 'date' => now()->toDateString(), 'supplier' => 'مؤسسة الأمل', 'amount' => 5000, 'payment_method' => 'cash']);
        Expense::create(['branch_id' => $main->id, 'date' => now()->toDateString(), 'category' => 'إيجار', 'amount' => 3000, 'description' => 'إيجار شهر مارس', 'payment_method' => 'bank']);
        CashTransaction::create(['branch_id' => $main->id, 'transaction_at' => now(), 'type' => 'inflow', 'amount' => 14500, 'signed_amount' => 14500, 'created_by' => $accountant->id]);
        Stocktake::create(['branch_id' => $main->id, 'date' => now()->toDateString(), 'actual_inventory_value' => 76000, 'expected_inventory_value' => 78000, 'difference' => -2000, 'counted_by' => 'لجنة الجرد', 'status' => 'shortage']);
        CapitalMovement::create(['branch_id' => $main->id, 'date' => now()->toDateString(), 'type' => 'injection', 'amount' => 10000]);
        BranchTransfer::create(['date' => now()->toDateString(), 'from_branch_id' => $main->id, 'to_branch_id' => $sub->id, 'transfer_type' => 'cash_transfer', 'amount' => 2500, 'created_by' => $accountant->id]);

        $d1 = DeliveryAgent::create(['branch_id' => $main->id, 'name' => 'أحمد سليم', 'phone' => '0501111111', 'fee_model_type' => 'per_order', 'fee_value' => 7]);
        $d2 = DeliveryAgent::create(['branch_id' => $main->id, 'name' => 'محمود فهد', 'phone' => '0502222222', 'fee_model_type' => 'fixed_daily', 'fee_value' => 120]);
        $d3 = DeliveryAgent::create(['branch_id' => $sub->id, 'name' => 'خالد ناصر', 'phone' => '0503333333', 'fee_model_type' => 'percentage', 'fee_value' => 5]);

        $o1 = Order::create(['order_number' => 'ORD-2001', 'branch_id' => $main->id, 'customer_name' => 'سارة محمد', 'customer_phone' => '0559000001', 'address' => 'الرياض - العليا', 'order_amount' => 210, 'delivery_fee' => 20, 'total_due' => 230, 'payment_type' => 'cash', 'status' => 'delivered', 'delivery_agent_id' => $d1->id]);
        $o2 = Order::create(['order_number' => 'ORD-2002', 'branch_id' => $main->id, 'customer_name' => 'بدر عبدالله', 'customer_phone' => '0559000002', 'address' => 'الرياض - حطين', 'order_amount' => 130, 'delivery_fee' => 20, 'total_due' => 150, 'payment_type' => 'cash', 'status' => 'delivered', 'delivery_agent_id' => $d1->id]);
        $o3 = Order::create(['order_number' => 'ORD-2003', 'branch_id' => $main->id, 'customer_name' => 'هند علي', 'customer_phone' => '0559000003', 'address' => 'الرياض - اليرموك', 'order_amount' => 170, 'delivery_fee' => 15, 'total_due' => 185, 'payment_type' => 'online', 'status' => 'ready', 'delivery_agent_id' => $d2->id]);

        $openRun = DeliveryRun::create(['branch_id' => $main->id, 'delivery_agent_id' => $d2->id, 'start_time' => now()->subHour(), 'status' => 'open']);
        $settledRun = DeliveryRun::create(['branch_id' => $main->id, 'delivery_agent_id' => $d1->id, 'start_time' => now()->subHours(5), 'end_time' => now()->subHours(2), 'status' => 'settled']);
        $openRun->orders()->attach([$o3->id]);
        $settledRun->orders()->attach([$o1->id, $o2->id]);

        DriverSettlement::create([
            'branch_id' => $main->id,
            'delivery_agent_id' => $d1->id,
            'delivery_run_id' => $settledRun->id,
            'expected_amount' => 380,
            'actual_returned_cash' => 370,
            'driver_fee' => 14,
            'shortage' => 10,
            'overage' => 0,
            'settlement_status' => 'shortage',
            'settled_by' => $accountant->id,
            'settled_at' => now()->subHours(1),
            'notes' => 'حالة عجز مقصودة للاختبار',
        ]);

        DB::table('settings')->insert([
            ['key' => 'company', 'value' => json_encode(['name' => 'شركة المتجر المتعدد', 'phone' => '920000000'])],
            ['key' => 'currency', 'value' => json_encode(['code' => 'SAR'])],
            ['key' => 'expense_categories', 'value' => json_encode(['إيجار','كهرباء','مرتبات','نقل','صيانة','نثريات','أخرى'])],
        ]);
    }
}

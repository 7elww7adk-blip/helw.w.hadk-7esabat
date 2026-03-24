<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['Owner','Manager','Accountant','DeliveryAgent','Viewer'])->default('Viewer');
            $table->enum('status', ['active','inactive'])->default('active');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_branch_id')->nullable()->constrained('branches')->nullOnDelete();
            $table->string('name');
            $table->string('code')->unique();
            $table->date('opening_date')->nullable();
            $table->foreignId('manager_id')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('is_main')->default(false);
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->text('notes')->nullable();
            $table->timestamps();
        });


        Schema::create('user_branch_access', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['user_id','branch_id']);
        });

        Schema::create('branch_setups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->decimal('opening_cash_capital', 14, 2)->default(0);
            $table->decimal('opening_inventory_value', 14, 2)->default(0);
            $table->decimal('opening_cashbox_balance', 14, 2)->default(0);
            $table->text('opening_notes')->nullable();
            $table->timestamps();
        });

        Schema::create('daily_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->decimal('total_sales', 14, 2)->default(0);
            $table->decimal('total_returns', 14, 2)->default(0);
            $table->decimal('purchases', 14, 2)->default(0);
            $table->decimal('operating_expenses', 14, 2)->default(0);
            $table->decimal('owner_withdrawals', 14, 2)->default(0);
            $table->decimal('deposits', 14, 2)->default(0);
            $table->decimal('transfers_in', 14, 2)->default(0);
            $table->decimal('transfers_out', 14, 2)->default(0);
            $table->decimal('daily_net_result', 14, 2)->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->string('supplier');
            $table->decimal('amount', 14, 2);
            $table->enum('payment_method', ['cash', 'bank', 'credit', 'online']);
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->string('category');
            $table->decimal('amount', 14, 2);
            $table->text('description')->nullable();
            $table->enum('payment_method', ['cash', 'bank', 'credit', 'online']);
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('cash_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->dateTime('transaction_at');
            $table->enum('type', ['inflow', 'outflow', 'deposit', 'withdrawal', 'transfer']);
            $table->decimal('amount', 14, 2);
            $table->decimal('signed_amount', 14, 2);
            $table->string('reference_type')->nullable();
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('stocktakes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->decimal('actual_inventory_value', 14, 2);
            $table->decimal('expected_inventory_value', 14, 2);
            $table->decimal('difference', 14, 2)->default(0);
            $table->string('counted_by')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['matched', 'shortage', 'surplus'])->default('matched');
            $table->timestamps();
        });

        Schema::create('capital_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->enum('type', ['opening', 'injection', 'withdrawal', 'result_adjustment']);
            $table->decimal('amount', 14, 2);
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('branch_transfers', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->foreignId('from_branch_id')->constrained('branches')->cascadeOnDelete();
            $table->foreignId('to_branch_id')->constrained('branches')->cascadeOnDelete();
            $table->enum('transfer_type', ['inventory_transfer', 'cash_transfer', 'expense_allocation', 'capital_support', 'settlement']);
            $table->decimal('amount', 14, 2);
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('delivery_agents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('phone')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->enum('fee_model_type', ['per_order', 'fixed_daily', 'percentage', 'custom']);
            $table->decimal('fee_value', 14, 2)->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->string('customer_name');
            $table->string('customer_phone')->nullable();
            $table->text('address')->nullable();
            $table->decimal('order_amount', 14, 2);
            $table->decimal('delivery_fee', 14, 2)->default(0);
            $table->decimal('total_due', 14, 2);
            $table->enum('payment_type', ['cash', 'online', 'mixed', 'credit']);
            $table->enum('status', ['new', 'ready', 'out_for_delivery', 'delivered', 'returned', 'cancelled', 'deferred', 'partially_settled'])->default('new');
            $table->foreignId('delivery_agent_id')->nullable()->constrained('delivery_agents')->nullOnDelete();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('delivery_runs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->foreignId('delivery_agent_id')->constrained('delivery_agents')->cascadeOnDelete();
            $table->dateTime('start_time');
            $table->dateTime('end_time')->nullable();
            $table->enum('status', ['open', 'in_progress', 'returned', 'settled', 'under_review'])->default('open');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('delivery_run_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('delivery_run_id')->constrained()->cascadeOnDelete();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['delivery_run_id', 'order_id']);
        });

        Schema::create('driver_settlements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->foreignId('delivery_agent_id')->constrained('delivery_agents')->cascadeOnDelete();
            $table->foreignId('delivery_run_id')->constrained('delivery_runs')->cascadeOnDelete();
            $table->decimal('expected_amount', 14, 2);
            $table->decimal('actual_returned_cash', 14, 2);
            $table->decimal('driver_fee', 14, 2)->default(0);
            $table->decimal('shortage', 14, 2)->default(0);
            $table->decimal('overage', 14, 2)->default(0);
            $table->enum('settlement_status', ['matched', 'shortage', 'overage', 'review_required'])->default('matched');
            $table->text('notes')->nullable();
            $table->foreignId('settled_by')->nullable()->constrained('users')->nullOnDelete();
            $table->dateTime('settled_at')->nullable();
            $table->timestamps();
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('value')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('driver_settlements');
        Schema::dropIfExists('delivery_run_orders');
        Schema::dropIfExists('delivery_runs');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('delivery_agents');
        Schema::dropIfExists('branch_transfers');
        Schema::dropIfExists('capital_movements');
        Schema::dropIfExists('stocktakes');
        Schema::dropIfExists('cash_transactions');
        Schema::dropIfExists('expenses');
        Schema::dropIfExists('purchases');
        Schema::dropIfExists('daily_entries');
        Schema::dropIfExists('branch_setups');
        Schema::dropIfExists('user_branch_access');
        Schema::dropIfExists('branches');
        Schema::dropIfExists('users');
    }
};

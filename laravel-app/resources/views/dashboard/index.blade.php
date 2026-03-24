@extends('layouts.app')

@section('content')
<div class="grid md:grid-cols-4 gap-4">
    <x-stat-card title="إجمالي المبيعات" :value="$stats['sales']" />
    <x-stat-card title="إجمالي المشتريات" :value="$stats['purchases']" />
    <x-stat-card title="إجمالي المصروفات" :value="$stats['expenses']" />
    <x-stat-card title="رصيد الخزنة" :value="$stats['cashbox']" />
</div>
<div class="mt-6 bg-white rounded-lg shadow p-4">
    <canvas id="branchChart"></canvas>
</div>
@endsection

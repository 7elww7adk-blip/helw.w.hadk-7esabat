@extends('layouts.app')
@section('content')
<div class="bg-white rounded shadow p-4">
    <h2 class="font-bold mb-4">اليومية اليومية</h2>
    <table class="w-full text-sm">
        <thead><tr><th>التاريخ</th><th>الفرع</th><th>المبيعات</th><th>المرتجعات</th><th>صافي اليوم</th></tr></thead>
        <tbody>
        @foreach($entries as $entry)
            <tr class="border-t"><td>{{ $entry->date }}</td><td>{{ $entry->branch->name ?? '-' }}</td><td>{{ $entry->total_sales }}</td><td>{{ $entry->total_returns }}</td><td>{{ $entry->daily_net_result }}</td></tr>
        @endforeach
        </tbody>
    </table>
</div>
@endsection

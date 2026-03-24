@props(['title','value'])
<div class="bg-white rounded-lg shadow p-4">
    <div class="text-gray-600">{{ $title }}</div>
    <div class="text-2xl font-bold mt-2">{{ number_format($value, 2) }}</div>
</div>

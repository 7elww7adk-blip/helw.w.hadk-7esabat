<!doctype html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100" style="direction:rtl;text-align:right">
<div class="min-h-screen flex">
    <aside class="w-64 bg-slate-900 text-white p-4 space-y-3">
        <h1 class="font-bold text-lg">لوحة الإدارة</h1>
        <a class="block" href="{{ route('dashboard') }}">الرئيسية</a>
        <a class="block" href="{{ route('branches.index') }}">الفروع</a>
        <a class="block" href="{{ route('daily-entries.index') }}">اليومية</a>
        <a class="block" href="{{ route('orders.index') }}">الطلبات</a>
        <a class="block" href="{{ route('driver-settlements.index') }}">تسويات المندوبين</a>
        <a class="block" href="{{ route('reports.index') }}">التقارير</a>
    </aside>
    <main class="flex-1 p-6">
        <header class="bg-white rounded-lg p-4 mb-6 shadow">{{ now()->translatedFormat('l d F Y') }}</header>
        @yield('content')
    </main>
</div>
</body>
</html>

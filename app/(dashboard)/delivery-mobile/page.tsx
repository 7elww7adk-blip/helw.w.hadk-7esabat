export default function Page() {
  const orders = [
    { id: "ORD-1003", customer: "حسن", address: "صقر قريش", total: 200 },
    { id: "ORD-1004", customer: "ليلى", address: "حدائق المعادي", total: 180 }
  ];

  return (
    <section className="max-w-md mx-auto space-y-3">
      <div className="card p-4">
        <h2 className="font-bold text-lg">رحلتي الحالية</h2>
        <p className="text-sm text-slate-500">المندوب: عمرو عبد الله • الحالة: قيد التنفيذ</p>
      </div>
      {orders.map((order) => (
        <article key={order.id} className="card p-4 space-y-2">
          <p className="font-semibold">{order.id}</p>
          <p className="text-sm">العميل: {order.customer}</p>
          <p className="text-sm">العنوان: {order.address}</p>
          <p className="text-sm">الإجمالي المستحق: {order.total} جنيه</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="btn-primary">تم التسليم</button>
            <button className="btn bg-slate-200">راجع</button>
            <button className="btn bg-amber-200">مؤجل</button>
            <button className="btn bg-red-200">ملغي</button>
          </div>
        </article>
      ))}
    </section>
  );
}

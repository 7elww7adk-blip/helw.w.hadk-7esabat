import { settleDeliveryAndCashbox } from "@/lib/services/accounting";
import { formatCurrency } from "@/lib/utils";

export default function Page() {
  const sample = settleDeliveryAndCashbox({
    expectedAmount: 330,
    actualReturnedAmount: 300,
    feeModel: "PER_ORDER",
    feeValue: 20,
    deliveredOrders: 2,
    deliveredTotal: 330
  });

  return (
    <section className="space-y-4">
      <div className="card p-4">
        <h2 className="text-xl font-bold">تسويات الدليفري</h2>
        <p className="text-slate-600">تسوية الرحلات بحساب المتوقع والمُعاد والعجز/الزيادة ومستحق المندوب.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <form className="card p-4 grid gap-3">
          {["الفرع", "المندوب", "الرحلة", "المبلغ المتوقع", "المبلغ المُعاد", "مستحق المندوب", "ملاحظات"].map((f) => (
            <label key={f} className="block"><span className="text-sm mb-1 block">{f}</span><input className="input" /></label>
          ))}
          <button type="button" className="btn-primary">تنفيذ التسوية</button>
        </form>
        <div className="card p-4 space-y-3">
          <h3 className="font-semibold">نتيجة تسوية نموذجية</h3>
          <div className="text-sm space-y-2">
            <p>المبلغ المتوقع: <strong>{formatCurrency(330)}</strong></p>
            <p>المبلغ المُعاد: <strong>{formatCurrency(300)}</strong></p>
            <p>العجز: <strong>{formatCurrency(sample.shortage)}</strong></p>
            <p>الزيادة: <strong>{formatCurrency(sample.overage)}</strong></p>
            <p>مستحق المندوب: <strong>{formatCurrency(sample.driverFee)}</strong></p>
            <p>حالة التسوية: <span className="badge">{sample.status}</span></p>
            <p>تكامل الخزنة: توريد {formatCurrency(sample.cashInflow)} وصرف مستحق {formatCurrency(sample.cashOutflowForDriver)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

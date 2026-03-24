import { KpiCard } from "@/components/shared/kpi-card";
import { SalesExpensesChart } from "@/components/shared/charts";
import { alerts, branchComparison, kpis, monthlyTrend } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function Page() {
  return (
    <section className="space-y-4">
      <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-3">
        {kpis.map((k) => <KpiCard key={k.label} label={k.label} value={k.value} />)}
      </div>
      <div className="grid xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2"><SalesExpensesChart data={monthlyTrend} /></div>
        <div className="card p-4">
          <h3 className="font-semibold mb-3">مقارنة الفروع</h3>
          <div className="space-y-2 text-sm">
            {branchComparison.map((b) => (
              <div key={b.name} className="flex justify-between border-b pb-2">
                <span>{b.name}</span><span>{formatCurrency(b.net)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card p-4">
        <h3 className="font-semibold mb-2">تنبيهات وتشغيل</h3>
        <ul className="list-disc pr-6 space-y-1 text-sm text-slate-700">{alerts.map((a) => <li key={a}>{a}</li>)}</ul>
      </div>
    </section>
  );
}

import { formatCurrency } from "@/lib/utils";

export function KpiCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="card p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold mt-2">{formatCurrency(value)}</p>
    </article>
  );
}

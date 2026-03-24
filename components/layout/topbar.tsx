import { todayAr } from "@/lib/utils";

export function Topbar() {
  return (
    <header className="card mb-4 p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">مرحبًا بك</p>
        <p className="font-semibold">لوحة تحكم الشركة متعددة الفروع</p>
      </div>
      <div className="text-sm text-slate-500">{todayAr}</div>
    </header>
  );
}

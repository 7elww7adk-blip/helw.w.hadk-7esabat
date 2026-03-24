import Link from "next/link";
import { sidebarItems } from "@/lib/nav";

export function Sidebar() {
  return (
    <aside className="w-72 shrink-0 border-l border-slate-200 bg-white p-4 hidden lg:block">
      <h1 className="font-bold text-lg mb-4">نظام إدارة الفروع</h1>
      <nav className="space-y-1">
        {sidebarItems.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded-xl px-3 py-2 text-sm hover:bg-slate-100">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="التقارير" description="تقارير يومية وأسبوعية وشهرية مع أزرار تصدير PDF/Excel/Print." fields={["نوع التقرير","من تاريخ","إلى تاريخ","الفرع"]} />;
}

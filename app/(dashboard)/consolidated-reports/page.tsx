import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="التقارير المجمعة" description="تقارير شاملة على مستوى الشركة لجميع الفروع." fields={["من تاريخ","إلى تاريخ","الفروع","نوع التقرير المجمع"]} />;
}

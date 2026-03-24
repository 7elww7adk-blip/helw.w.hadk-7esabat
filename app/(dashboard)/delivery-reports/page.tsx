import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="تقارير الدليفري" description="تقارير الأداء والتحصيل والعجز/الزيادة والرحلات غير المسواة." fields={["من تاريخ","إلى تاريخ","الفرع","المندوب","الحالة"]} />;
}

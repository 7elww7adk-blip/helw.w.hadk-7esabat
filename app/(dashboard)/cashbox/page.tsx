import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="الخزنة" description="متابعة رصيد الخزنة الدفتري والفعلي وفروق الجرد النقدي." fields={["الفرع","التاريخ","نوع الحركة","المبلغ","الوصف"]} />;
}

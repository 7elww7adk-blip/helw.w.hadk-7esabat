import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="رأس المال" description="متابعة رأس المال لكل فرع ومعادلة رأس المال الحالي." fields={["الفرع","التاريخ","نوع الحركة","المبلغ","ملاحظات"]} />;
}

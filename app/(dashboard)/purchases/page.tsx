import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="المشتريات" description="تسجيل المشتريات النقدية والآجلة مع دعم مرفقات الفاتورة." fields={["الفرع","التاريخ","المورد/الوصف","المبلغ","طريقة الدفع","ملاحظات"]} />;
}

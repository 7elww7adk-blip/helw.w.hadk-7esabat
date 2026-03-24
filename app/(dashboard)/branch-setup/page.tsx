import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="تأسيس الفرع" description="تسجيل بيانات الافتتاح وحساب الأصول الافتتاحية." fields={["الفرع","تاريخ الافتتاح","رأس المال النقدي","المخزون الافتتاحي","رصيد الخزنة"]} />;
}

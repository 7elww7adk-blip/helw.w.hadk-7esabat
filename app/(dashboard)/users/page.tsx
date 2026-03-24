import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="المستخدمون والصلاحيات" description="إدارة الأدوار: مالك، مدير، محاسب، مندوب، مراقب." fields={["الاسم","البريد","الدور","الفرع","الحالة"]} />;
}

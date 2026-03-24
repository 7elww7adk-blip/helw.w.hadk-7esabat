import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="الدليفريهات" description="إدارة مندوبي الدليفري ونماذج احتساب العمولة." fields={["الاسم","الهاتف","الفرع","الحالة","نموذج العمولة","قيمة العمولة"]} />;
}

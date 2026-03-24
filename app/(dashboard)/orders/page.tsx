import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="الأوردرات" description="إدارة أوردرات الدليفري والتعيين للمندوبين." fields={["رقم الأوردر","الفرع","اسم العميل","الهاتف","العنوان","قيمة الأوردر","رسوم التوصيل","نوع الدفع","الحالة"]} />;
}

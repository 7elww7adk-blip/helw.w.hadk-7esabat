import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="اليومية" description="إدخال نهاية اليوم للفرع مع حساب صافي النتيجة اليومية." fields={["الفرع","التاريخ","إجمالي المبيعات","المرتجعات","المشتريات","المصروفات التشغيلية","سحوبات المالك","الإيداعات","تحويلات داخلة","تحويلات خارجة"]} />;
}

import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="الإعدادات" description="إعدادات عامة للنظام وسياسات المحاسبة والتسوية." fields={["اسم الشركة","العملة","منطقة الوقت","سياسة التسوية","ملاحظات"]} />;
}

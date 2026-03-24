import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="لوحة الفرع" description="مؤشرات فرع محدد: مبيعات، مشتريات، مصروفات، خزنة، جرد، وصافي النتيجة." fields={["الفرع","الفترة من","الفترة إلى"]} />;
}

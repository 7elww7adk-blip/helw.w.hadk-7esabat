import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="الجرد" description="جرد المخزون بالقيمة وتحديد فرق الجرد حالة العجز أو الزيادة." fields={["الفرع","التاريخ","القيمة الفعلية","القيمة المتوقعة","القائم بالجرد","ملاحظات"]} />;
}

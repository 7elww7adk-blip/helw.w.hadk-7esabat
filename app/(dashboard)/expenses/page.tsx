import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="المصروفات" description="إدارة مصروفات الفروع بالتصنيفات العربية المعتمدة." fields={["الفرع","التاريخ","التصنيف","المبلغ","الوصف","طريقة الدفع"]} />;
}

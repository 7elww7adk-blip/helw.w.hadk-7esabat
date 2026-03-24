import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="التحويلات بين الفروع" description="تسجيل التحويلات الداخلية دون اعتبارها مبيعات أو أرباح." fields={["التاريخ","من فرع","إلى فرع","نوع التحويل","المبلغ","ملاحظات"]} />;
}

import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="رحلات الدليفري" description="إنشاء رحلة وتعيين أوردرات جاهزة فقط ومتابعة الحالة." fields={["الفرع","المندوب","وقت البدء","وقت الانتهاء","الحالة","ملاحظات"]} />;
}

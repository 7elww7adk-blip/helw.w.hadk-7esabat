import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="إدارة الفروع" description="إنشاء وتعديل وتفعيل الفروع وربط الفروع الفرعية بالفرع الرئيسي." fields={["اسم الفرع","كود الفرع","النوع","الفرع الأب","تاريخ الافتتاح","المدير","الحالة","ملاحظات"]} />;
}

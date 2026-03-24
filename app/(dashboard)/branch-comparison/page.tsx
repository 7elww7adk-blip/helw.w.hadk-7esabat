import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="مقارنة الفروع" description="مقارنة أداء الفروع جنبًا إلى جنب مع ترتيب الفروع." fields={["الفترة من","الفترة إلى","الفروع المختارة"]} />;
}

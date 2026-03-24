import { ModulePage } from "@/components/shared/module-page";

export default function Page() {
  return <ModulePage title="سجل اليوميات" description="فلترة واستعراض سجل اليومية حسب التاريخ والفرع والحالة." fields={["من تاريخ","إلى تاريخ","الفرع","الحالة","بحث"]} />;
}

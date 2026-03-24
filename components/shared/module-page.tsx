export function ModulePage({ title, description, fields }: { title: string; description: string; fields: string[] }) {
  return (
    <section className="space-y-4">
      <div className="card p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-slate-600 mt-1">{description}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <form className="card p-4 space-y-3">
          {fields.map((field) => (
            <label key={field} className="block">
              <span className="text-sm mb-1 block">{field}</span>
              <input className="input" placeholder={`أدخل ${field}`} />
            </label>
          ))}
          <button type="button" className="btn-primary">حفظ</button>
        </form>
        <div className="card p-4">
          <h3 className="font-semibold mb-3">سجل آخر العمليات</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p>• تم إنشاء سجل جديد بنجاح.</p>
            <p>• تم تحديث عملية محاسبية للفرع الرئيسي.</p>
            <p>• تم تسجيل مراجعة بواسطة المحاسب.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center p-4">
      <form className="card w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
        <label className="block"><span className="text-sm">البريد الإلكتروني / اسم المستخدم</span><input className="input mt-1" /></label>
        <label className="block"><span className="text-sm">كلمة المرور</span><input type="password" className="input mt-1" /></label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> تذكرني</label>
        <button type="button" className="btn-primary w-full">دخول</button>
      </form>
    </main>
  );
}

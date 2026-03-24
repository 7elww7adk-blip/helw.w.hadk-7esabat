# نظام إدارة الفروع والمحاسبة والدليفري (RTL)

تطبيق Next.js احترافي لإدارة الفروع، المحاسبة التشغيلية، وتحكم الدليفري مع التسويات.

## المزايا
- متعدد الفروع (رئيسي + فرعي) مع تقارير مجمعة
- يومية فرع، مشتريات، مصروفات، خزنة، جرد، رأس مال
- تحويلات داخلية بين الفروع مع معالجة محاسبية سليمة
- نظام دليفري كامل: أوردرات، رحلات، تسوية مندوب، عجز/زيادة
- واجهة عربية RTL كاملة ومتجاوبة للجوال

## التقنية
- Next.js App Router + TypeScript
- Tailwind + واجهات مكونات قابلة لإعادة الاستخدام
- Prisma + PostgreSQL
- React Hook Form + Zod
- Recharts

## التشغيل
```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## الحسابات التجريبية
- المالك: `owner@demo.local`
- المدير: `manager@demo.local`
- المحاسب: `accountant@demo.local`
- مندوب: `driver@demo.local`
- كلمة المرور الافتراضية: `12345678`

## ملاحظات
- هذا النظام **ليس POS**.
- المخزون في هذه النسخة بتقييم مالي (Valuation) وليس SKU.
- الأزرار الخاصة بالتصدير (PDF/Excel/Print) متاحة كواجهات جاهزة ويمكن ربطها بخدمة التصدير لاحقًا.

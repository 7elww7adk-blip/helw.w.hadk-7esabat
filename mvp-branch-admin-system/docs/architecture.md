# 1) Architecture Overview

## الهدف
نظام إداري ومحاسبي وتشغيلي مبسط لإدارة الفروع، الدليفري، الخزنة، والتقارير بدون تعقيد POS.

## الطبقات
1. **Presentation (Frontend)**
   - صفحة واحدة (SPA) عربية RTL.
   - مكونات واضحة: Login، Dashboard، الفروع، اليومية، التحويلات، الدليفري، التقارير، الإعدادات.
   - حماية واجهات بالـ permissions على مستوى الـ UI.

2. **Application/API (Apps Script)**
   - `doPost` Endpoint واحد بنمط action-based.
   - Router بسيط يوجه إلى خدمات (Auth / Branch / Accounting / Delivery / Reports / Settings).
   - Validation + Authorization قبل أي كتابة.

3. **Data (Google Sheets)**
   - جداول منفصلة (Sheet لكل كيان).
   - UUID لكل سجل.
   - حقول Audit: `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `isDeleted`.

## مبدأ محاسبي أساسي
**التحويلات بين الفروع (بضاعة/أموال/دعم رأس مال/تسويات داخلية) تسجل فقط في `BranchTransfers` ولا تعتبر مبيعات أو مصروفات.**

## الأمان والصلاحيات
- تسجيل دخول عبر username + password hash داخل شيت Users.
- Token Session داخل `Sessions`.
- أدوار:
  - `OWNER`
  - `BRANCH_MANAGER`
  - `ACCOUNTANT`
  - `DELIVERY_AGENT`
  - `VIEWER`
- يمكن ربط المستخدم بفروع متعددة عبر `allowedBranchIds`.

## قابلية التوسعة
- إضافة module جديد = Service جديد + action جديد داخل router.
- إعدادات قابلة للتعديل من شاشة الإعدادات وتقرأ مباشرة من Sheet `Settings`.

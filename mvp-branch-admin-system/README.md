# نظام إدارة الفروع والمحاسبة والدليفري (MVP)

نسخة MVP عربية (RTL) مبنية بـ:
- Frontend: HTML/CSS/Vanilla JS
- Backend: Google Apps Script
- Data Layer: Google Sheets

## المجلدات
- `frontend/` واجهة المستخدم.
- `backend/` كود Apps Script.
- `sample-data/` بيانات تجريبية للشيتات.
- `docs/` المعمارية، الـ schema، والنشر.

## تشغيل سريع
1. اقرأ `docs/architecture.md`.
2. أنشئ Google Sheet وSheets بالأسماء المطلوبة من `docs/google-sheets-schema.md`.
3. الصق ملفات `backend/*.gs` داخل مشروع Apps Script واربطه بالشيت.
4. انشر Apps Script كـ Web App.
5. ضع رابط الـ Web App في `frontend/js/config.js` داخل `API_BASE_URL`.
6. افتح `frontend/index.html`.

> ملاحظة: هذا النظام إداري/محاسبي تشغيلي وليس POS.

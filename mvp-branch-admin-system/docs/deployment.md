# 7) خطوات النشر Deployment

## A) تجهيز Google Sheet
1. أنشئ Google Spreadsheet جديد.
2. أنشئ الشيتات طبقًا لـ `google-sheets-schema.md`.
3. انسخ Header لكل شيت.
4. (اختياري) استورد ملفات CSV من `sample-data/`.

## B) إعداد Google Apps Script
1. من الشيت: Extensions -> Apps Script.
2. أنشئ الملفات بنفس أسماء `backend/*.gs` والصق المحتوى.
3. احفظ ثم نفذ `seedMvpData` مرة واحدة (اختياري).
4. Deploy -> New deployment -> Web app.
5. Execute as: **Me**.
6. Who has access: **Anyone with the link** (لـ MVP).
7. انسخ رابط الـ Web App.

## C) ربط الواجهة
1. افتح `frontend/js/config.js`.
2. ضع رابط Apps Script في `API_BASE_URL`.
3. ارفع مجلد `frontend/` على GitHub Pages أو Netlify أو أي static hosting.

## D) بيانات الدخول المبدئية
- username: `owner`
- password: `123456`

> غيّر كلمات المرور فورًا بعد أول تشغيل.

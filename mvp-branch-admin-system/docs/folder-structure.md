# 2) Folder Structure

```text
mvp-branch-admin-system/
├─ README.md
├─ docs/
│  ├─ architecture.md
│  ├─ folder-structure.md
│  ├─ google-sheets-schema.md
│  ├─ deployment.md
│  └─ تشغيل-خطوة-بخطوة.md
├─ backend/
│  ├─ appsscript.json
│  ├─ Config.gs
│  ├─ Helpers.gs
│  ├─ AuthService.gs
│  ├─ SheetRepository.gs
│  ├─ BranchService.gs
│  ├─ AccountingService.gs
│  ├─ DeliveryService.gs
│  ├─ ReportService.gs
│  ├─ SettingsService.gs
│  ├─ Router.gs
│  └─ Seed.gs
├─ frontend/
│  ├─ index.html
│  ├─ css/
│  │  └─ style.css
│  └─ js/
│     ├─ config.js
│     ├─ app.js
│     ├─ core/
│     │  ├─ state.js
│     │  ├─ auth.js
│     │  └─ router.js
│     ├─ api/
│     │  └─ client.js
│     ├─ modules/
│     │  ├─ login.js
│     │  ├─ dashboard.js
│     │  ├─ branches.js
│     │  ├─ dailyAccounting.js
│     │  ├─ transfers.js
│     │  ├─ delivery.js
│     │  ├─ reports.js
│     │  └─ settings.js
│     └─ ui/
│        ├─ components.js
│        └─ toast.js
└─ sample-data/
   ├─ Users.csv
   ├─ Branches.csv
   ├─ Settings.csv
   ├─ DailyEntries.csv
   ├─ BranchTransfers.csv
   ├─ DeliveryAgents.csv
   ├─ Orders.csv
   ├─ DeliveryTrips.csv
   ├─ DeliverySettlements.csv
   ├─ CashboxTransactions.csv
   ├─ InventoryCounts.csv
   └─ CapitalTransactions.csv
```

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.driverSettlement.deleteMany();
  await prisma.deliveryRunOrder.deleteMany();
  await prisma.deliveryRun.deleteMany();
  await prisma.order.deleteMany();
  await prisma.deliveryAgent.deleteMany();
  await prisma.branchTransfer.deleteMany();
  await prisma.capitalMovement.deleteMany();
  await prisma.stocktake.deleteMany();
  await prisma.cashTransaction.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.dailyEntry.deleteMany();
  await prisma.branchSetup.deleteMany();
  await prisma.user.deleteMany();
  await prisma.branch.deleteMany();

  const mainBranch = await prisma.branch.create({ data: { name: "الفرع الرئيسي", code: "MAIN", type: "MAIN", openingDate: new Date("2025-01-01"), status: "ACTIVE", managerName: "أحمد علي" } });
  const subBranch = await prisma.branch.create({ data: { name: "فرع المعادي", code: "MAD", type: "SUB", parentBranchId: mainBranch.id, openingDate: new Date("2025-03-01"), status: "ACTIVE", managerName: "سارة محمود" } });

  const owner = await prisma.user.create({ data: { name: "المالك", email: "owner@demo.local", passwordHash: "12345678", role: "OWNER" } });
  await prisma.user.createMany({ data: [
    { name: "مدير الفرع", email: "manager@demo.local", passwordHash: "12345678", role: "MANAGER", branchId: subBranch.id },
    { name: "محاسب", email: "accountant@demo.local", passwordHash: "12345678", role: "ACCOUNTANT", branchId: mainBranch.id },
    { name: "مندوب", email: "driver@demo.local", passwordHash: "12345678", role: "DELIVERY_AGENT", branchId: subBranch.id }
  ] });

  await prisma.branchSetup.createMany({ data: [
    { branchId: mainBranch.id, openingDate: new Date("2025-01-01"), openingCashCapital: 500000, openingInventoryValue: 300000, openingCashboxBalance: 50000, openingNotes: "بداية التشغيل" },
    { branchId: subBranch.id, openingDate: new Date("2025-03-01"), openingCashCapital: 150000, openingInventoryValue: 120000, openingCashboxBalance: 20000, openingNotes: "افتتاح فرع جديد" }
  ] });

  await prisma.dailyEntry.createMany({ data: [
    { branchId: mainBranch.id, date: new Date("2026-03-20"), totalSales: 98000, totalReturns: 3500, purchases: 18000, operatingExpenses: 9000, ownerWithdrawals: 2000, deposits: 5000, transfersIn: 0, transfersOut: 10000 },
    { branchId: subBranch.id, date: new Date("2026-03-20"), totalSales: 42000, totalReturns: 1500, purchases: 12000, operatingExpenses: 4500, ownerWithdrawals: 1000, deposits: 3000, transfersIn: 10000, transfersOut: 0 }
  ] });

  await prisma.purchase.createMany({ data: [
    { branchId: mainBranch.id, date: new Date("2026-03-21"), supplier: "شركة النور", amount: 25000, paymentMethod: "BANK_TRANSFER", notes: "توريد أسبوعي" },
    { branchId: subBranch.id, date: new Date("2026-03-21"), supplier: "مخزن القاهرة", amount: 9000, paymentMethod: "CASH", notes: "شراء عاجل" }
  ] });

  await prisma.expense.createMany({ data: [
    { branchId: mainBranch.id, date: new Date("2026-03-21"), category: "إيجار", amount: 12000, description: "إيجار شهر مارس", paymentMethod: "BANK_TRANSFER" },
    { branchId: subBranch.id, date: new Date("2026-03-21"), category: "كهرباء", amount: 2300, description: "فاتورة كهرباء", paymentMethod: "CASH" }
  ] });

  await prisma.cashTransaction.createMany({ data: [
    { branchId: mainBranch.id, date: new Date("2026-03-22"), type: "INFLOW", amount: 45000, description: "توريد مبيعات" },
    { branchId: subBranch.id, date: new Date("2026-03-22"), type: "OUTFLOW", amount: 3000, description: "مصروفات تشغيل" }
  ] });

  await prisma.stocktake.createMany({ data: [
    { branchId: mainBranch.id, date: new Date("2026-03-22"), actualInventoryValue: 318000, expectedInventoryValue: 320000, difference: -2000, status: "SHORTAGE", countedBy: "لجنة الجرد" },
    { branchId: subBranch.id, date: new Date("2026-03-22"), actualInventoryValue: 131000, expectedInventoryValue: 130000, difference: 1000, status: "SURPLUS", countedBy: "مشرف الفرع" }
  ] });

  await prisma.capitalMovement.createMany({ data: [
    { branchId: mainBranch.id, date: new Date("2026-03-23"), type: "INJECTION", amount: 50000, notes: "دعم توسع" },
    { branchId: subBranch.id, date: new Date("2026-03-23"), type: "WITHDRAWAL", amount: 5000, notes: "سحب مالك" }
  ] });

  await prisma.branchTransfer.create({ data: { date: new Date("2026-03-20"), fromBranchId: mainBranch.id, toBranchId: subBranch.id, type: "CASH_TRANSFER", amount: 10000, createdById: owner.id, notes: "دعم خزنة" } });

  const [driver1, driver2, driver3] = await Promise.all([
    prisma.deliveryAgent.create({ data: { name: "محمد السيد", phone: "0100000001", branchId: subBranch.id, status: "ACTIVE", feeModelType: "PER_ORDER", feeValue: 20 } }),
    prisma.deliveryAgent.create({ data: { name: "عمرو عبد الله", phone: "0100000002", branchId: subBranch.id, status: "ACTIVE", feeModelType: "FIXED_DAILY", feeValue: 180 } }),
    prisma.deliveryAgent.create({ data: { name: "يوسف حسن", phone: "0100000003", branchId: mainBranch.id, status: "ACTIVE", feeModelType: "PERCENTAGE", feeValue: 5 } })
  ]);

  const order1 = await prisma.order.create({ data: { orderNumber: "ORD-1001", branchId: subBranch.id, customerName: "خالد", customerPhone: "0111000", address: "زهراء المعادي", orderAmount: 300, deliveryFee: 30, totalDue: 330, paymentType: "CASH", status: "DELIVERED", assignedDriverId: driver1.id, assignedAt: new Date(), deliveredAt: new Date() } });
  const order2 = await prisma.order.create({ data: { orderNumber: "ORD-1002", branchId: subBranch.id, customerName: "منى", customerPhone: "0112000", address: "المعادي الجديدة", orderAmount: 220, deliveryFee: 25, totalDue: 245, paymentType: "CASH", status: "RETURNED", assignedDriverId: driver1.id, assignedAt: new Date(), returnedAt: new Date() } });
  const order3 = await prisma.order.create({ data: { orderNumber: "ORD-1003", branchId: subBranch.id, customerName: "حسن", customerPhone: "0113000", address: "صقر قريش", orderAmount: 180, deliveryFee: 20, totalDue: 200, paymentType: "CASH", status: "OUT_FOR_DELIVERY", assignedDriverId: driver2.id, assignedAt: new Date() } });

  const settledRun = await prisma.deliveryRun.create({ data: { branchId: subBranch.id, driverId: driver1.id, startTime: new Date("2026-03-23T10:00:00Z"), endTime: new Date("2026-03-23T14:00:00Z"), status: "SETTLED", totalOrders: 2, totalOrderAmount: 520, totalDeliveryFees: 55, totalDue: 575 } });
  const openRun = await prisma.deliveryRun.create({ data: { branchId: subBranch.id, driverId: driver2.id, startTime: new Date(), status: "IN_PROGRESS", totalOrders: 1, totalOrderAmount: 180, totalDeliveryFees: 20, totalDue: 200 } });

  await prisma.deliveryRunOrder.createMany({ data: [
    { runId: settledRun.id, orderId: order1.id, orderStatusInRun: "DELIVERED", collectedAmount: 330 },
    { runId: settledRun.id, orderId: order2.id, orderStatusInRun: "RETURNED", collectedAmount: 0 },
    { runId: openRun.id, orderId: order3.id, orderStatusInRun: "OUT_FOR_DELIVERY" }
  ] });

  await prisma.driverSettlement.create({ data: { runId: settledRun.id, driverId: driver1.id, branchId: subBranch.id, expectedAmount: 330, actualReturnedAmount: 300, driverFee: 40, shortage: 30, overage: 0, status: "SHORTAGE", settledById: owner.id, settledAt: new Date("2026-03-23T15:00:00Z"), notes: "تم فتح مراجعة عجز" } });
}

main().finally(async () => prisma.$disconnect());

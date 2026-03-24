import { calculateDriverFee, settlement } from "@/lib/delivery";

export function computeDailyNet(totalSales: number, totalReturns: number, operatingExpenses: number, ownerWithdrawals: number) {
  const netSales = totalSales - totalReturns;
  const dailyNetResult = netSales - operatingExpenses - ownerWithdrawals;
  return { netSales, dailyNetResult };
}

export function computeCapital(openingCapital: number, injections: number, withdrawals: number, accumulatedResult: number) {
  return openingCapital + injections - withdrawals + accumulatedResult;
}

export function applyTransferToValuation(type: "INVENTORY_TRANSFER" | "CASH_TRANSFER", sourceValue: number, destinationValue: number, amount: number) {
  if (type === "INVENTORY_TRANSFER" || type === "CASH_TRANSFER") {
    return { sourceAfter: sourceValue - amount, destinationAfter: destinationValue + amount };
  }
  return { sourceAfter: sourceValue, destinationAfter: destinationValue };
}

export function settleDeliveryAndCashbox(input: {
  expectedAmount: number;
  actualReturnedAmount: number;
  feeModel: "PER_ORDER" | "FIXED_DAILY" | "PERCENTAGE" | "CUSTOM";
  feeValue: number;
  deliveredOrders: number;
  deliveredTotal: number;
}) {
  const status = settlement(input.expectedAmount, input.actualReturnedAmount);
  const driverFee = calculateDriverFee(input.feeModel, input.feeValue, input.deliveredOrders, input.deliveredTotal);
  return {
    ...status,
    driverFee,
    cashInflow: input.actualReturnedAmount,
    cashOutflowForDriver: driverFee
  };
}

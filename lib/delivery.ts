export type FeeModel = "PER_ORDER" | "FIXED_DAILY" | "PERCENTAGE" | "CUSTOM";

export function calculateDriverFee(model: FeeModel, feeValue: number, deliveredOrders: number, deliveredTotal: number) {
  if (model === "PER_ORDER") return deliveredOrders * feeValue;
  if (model === "FIXED_DAILY") return feeValue;
  if (model === "PERCENTAGE") return (deliveredTotal * feeValue) / 100;
  return feeValue;
}

export function settlement(expectedAmount: number, actualReturnedAmount: number) {
  const shortage = Math.max(expectedAmount - actualReturnedAmount, 0);
  const overage = Math.max(actualReturnedAmount - expectedAmount, 0);
  return { shortage, overage, status: shortage ? "SHORTAGE" : overage ? "OVERAGE" : "MATCHED" };
}

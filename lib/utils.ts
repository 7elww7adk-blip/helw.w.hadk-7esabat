export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(value);

export const todayAr = new Intl.DateTimeFormat("ar-EG", { dateStyle: "full" }).format(new Date());

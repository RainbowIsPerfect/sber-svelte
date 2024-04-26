export const formatUpdateTime = (time: Date) => {
  return Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(time);
}

export const formatCurrency = (number: number, currency: string) => {
  return Intl.NumberFormat("en-GB", { currency, style: "currency", currencyDisplay: "name" }).format(number);
}
export function formatPrice(price: number, currency = "NGN"): string {
  if (currency === "NGN") {
    return `₦${price.toLocaleString("en-NG")}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatArea(area: number): string {
  return `${area.toLocaleString("en-NG")} m²`;
}

/** Aplica un descuento porcentual (0-100) a un precio en pesos enteros, redondeando al peso. */
export function applyPercentDiscount(price: number, percent: number): number {
  const clamped = Math.min(100, Math.max(0, percent));
  return Math.round(price * (1 - clamped / 100));
}

export function discountAmount(price: number, percent: number): number {
  return price - applyPercentDiscount(price, percent);
}

/** Combina descuentos sucesivos: 10 % y luego 20 % dan 28 % en total, no 30 %. */
export function stackDiscounts(price: number, percents: number[]): number {
  return percents.reduce((acc, p) => applyPercentDiscount(acc, p), price);
}

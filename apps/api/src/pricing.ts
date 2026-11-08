import { COUPONS } from "./config";

/** Precio final en pesos enteros después de aplicar el cupón (si existe). */
export function priceWithCoupon(price: number, coupon?: string): number {
  const percent = coupon ? (COUPONS[coupon.trim().toUpperCase()] ?? 0) : 0;
  return Math.round(price * (1 - percent / 100));
}

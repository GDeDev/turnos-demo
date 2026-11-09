export interface CouponRule {
  code: string;
  percent: number;
  expiresAt?: string;
  maxUses?: number;
}

const registry = new Map<string, { rule: CouponRule; uses: number }>();

export function registerCoupon(rule: CouponRule): void {
  registry.set(rule.code.trim().toUpperCase(), { rule, uses: 0 });
}

/** Devuelve el porcentaje vigente del cupón o 0 si no existe, venció o llegó a su tope de usos. */
export function couponPercent(code: string, now = new Date()): number {
  const entry = registry.get(code.trim().toUpperCase());
  if (!entry) return 0;
  if (entry.rule.expiresAt && Date.parse(entry.rule.expiresAt) < now.getTime()) return 0;
  if (entry.rule.maxUses !== undefined && entry.uses >= entry.rule.maxUses) return 0;
  return entry.rule.percent;
}

export function redeemCoupon(code: string): void {
  const entry = registry.get(code.trim().toUpperCase());
  if (entry) entry.uses += 1;
}

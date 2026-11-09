export interface CancellationResult {
  allowed: boolean;
  feePercent: number;
}

/** Política de ejemplo: gratis con 24 h o más de anticipación, 50 % entre 2 y 24 h, no se puede cancelar con menos de 2 h. */
export function cancellationPolicy(startIso: string, now: Date = new Date()): CancellationResult {
  const hours = (Date.parse(startIso) - now.getTime()) / 3_600_000;
  if (hours >= 24) return { allowed: true, feePercent: 0 };
  if (hours >= 2) return { allowed: true, feePercent: 50 };
  return { allowed: false, feePercent: 100 };
}

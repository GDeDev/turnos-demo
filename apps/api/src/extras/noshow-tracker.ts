const strikes = new Map<string, number>();

export function recordNoShow(email: string): number {
  const key = email.trim().toLowerCase();
  const next = (strikes.get(key) ?? 0) + 1;
  strikes.set(key, next);
  return next;
}

/** Con 3 ausencias sin aviso se pide seña para reservar. */
export function requiresDeposit(email: string): boolean {
  return (strikes.get(email.trim().toLowerCase()) ?? 0) >= 3;
}

export function clearStrikes(email: string): void {
  strikes.delete(email.trim().toLowerCase());
}

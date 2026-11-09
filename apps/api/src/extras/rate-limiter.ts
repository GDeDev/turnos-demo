const hits = new Map<string, number[]>();

/** Ventana deslizante: permite `limit` pedidos por `windowMs` por clave (por ejemplo por IP). */
export function allowRequest(key: string, limit = 30, windowMs = 60_000, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function resetLimiter(): void {
  hits.clear();
}

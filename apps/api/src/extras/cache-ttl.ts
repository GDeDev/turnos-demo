interface Entry<T> {
  value: T;
  expiresAt: number;
}

/** Caché en memoria con vencimiento por entrada. */
export class TtlCache<T> {
  private store = new Map<string, Entry<T>>();

  constructor(private ttlMs: number) {}

  set(key: string, value: T, now = Date.now()): void {
    this.store.set(key, { value, expiresAt: now + this.ttlMs });
  }

  get(key: string, now = Date.now()): T | undefined {
    const hit = this.store.get(key);
    if (!hit) return undefined;
    if (hit.expiresAt <= now) {
      this.store.delete(key);
      return undefined;
    }
    return hit.value;
  }
}

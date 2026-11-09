const counters = new Map<string, number>();

export function increment(name: string, by = 1): number {
  const next = (counters.get(name) ?? 0) + by;
  counters.set(name, next);
  return next;
}

export function snapshot(): Record<string, number> {
  return Object.fromEntries([...counters.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

export function resetMetrics(): void {
  counters.clear();
}

/** Genera ids incrementales por entidad: nextId("turno") -> 1, 2, 3... */
const counters = new Map<string, number>();

export function nextId(entity: string): number {
  const next = (counters.get(entity) ?? 0) + 1;
  counters.set(entity, next);
  return next;
}

export function peekId(entity: string): number {
  return counters.get(entity) ?? 0;
}

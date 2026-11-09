const OFFSET_MIN = -180;

/** Convierte un instante ISO UTC al reloj de Buenos Aires: "2026-03-10T01:00:00Z" -> "2026-03-09T22:00:00". */
export function toBuenosAiresClock(iso: string): string {
  const shifted = new Date(Date.parse(iso) + OFFSET_MIN * 60_000);
  return shifted.toISOString().slice(0, 19);
}

export function buenosAiresDate(iso: string): string {
  return toBuenosAiresClock(iso).slice(0, 10);
}

export function buenosAiresHour(iso: string): number {
  return Number(toBuenosAiresClock(iso).slice(11, 13));
}

/** Cuántos días hacia adelante se puede reservar y con cuántas horas mínimas de anticipación. */
export const MAX_DAYS_AHEAD = 60;
export const MIN_HOURS_AHEAD = 1;

export function withinBookingWindow(startIso: string, now: Date = new Date()): boolean {
  const diffH = (Date.parse(startIso) - now.getTime()) / 3_600_000;
  return diffH >= MIN_HOURS_AHEAD && diffH <= MAX_DAYS_AHEAD * 24;
}

export function earliestBookable(now: Date = new Date()): string {
  return new Date(now.getTime() + MIN_HOURS_AHEAD * 3_600_000).toISOString();
}

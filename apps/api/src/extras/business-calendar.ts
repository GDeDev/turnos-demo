/** Feriados nacionales de ejemplo (YYYY-MM-DD): el negocio no abre esos días. */
const HOLIDAYS = new Set(["2026-01-01", "2026-03-24", "2026-04-02", "2026-05-01", "2026-05-25", "2026-07-09", "2026-12-08", "2026-12-25"]);

export function isHoliday(dateKey: string): boolean {
  return HOLIDAYS.has(dateKey);
}

/** Domingo = 0. El local no abre los domingos. */
export function isOpenDay(dateKey: string): boolean {
  const day = new Date(`${dateKey}T12:00:00Z`).getUTCDay();
  return day !== 0 && !isHoliday(dateKey);
}

export function nextOpenDay(dateKey: string): string {
  let cursor = new Date(`${dateKey}T12:00:00Z`);
  for (let i = 0; i < 14; i += 1) {
    cursor = new Date(cursor.getTime() + 86_400_000);
    const key = cursor.toISOString().slice(0, 10);
    if (isOpenDay(key)) return key;
  }
  return dateKey;
}

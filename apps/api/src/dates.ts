import { BUSINESS_OFFSET_MIN } from "./config";

export const pad = (n: number): string => String(n).padStart(2, "0");

/** Devuelve la fecha (YYYY-MM-DD) en la que cae un instante, según el calendario del negocio. */
export function toLocalDateKey(iso: string): string {
  return iso.slice(0, 10);
}

/** Instante UTC (ms) de una hora del día del negocio. */
export function localTime(dateKey: string, hour: number, minute = 0): number {
  const sign = BUSINESS_OFFSET_MIN <= 0 ? "-" : "+";
  const abs = Math.abs(BUSINESS_OFFSET_MIN);
  return Date.parse(`${dateKey}T${pad(hour)}:${pad(minute)}:00${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`);
}

export const isDateKey = (s: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(s);

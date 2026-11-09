import type { Appointment } from "../types";

export interface Summary {
  month: string;
  count: number;
  revenue: number;
  byDay: Record<string, number>;
}

/** Resumen de un mes que siempre devuelve todos los campos, incluso sin turnos. Solo cuenta turnos vigentes. */
export function summarizeMonth(month: string, list: Appointment[]): Summary {
  const live = list.filter((a) => a.status === "booked" && a.start.startsWith(month));
  const byDay: Record<string, number> = {};
  for (const a of live) byDay[a.start.slice(0, 10)] = (byDay[a.start.slice(0, 10)] ?? 0) + 1;
  return { month, count: live.length, revenue: live.reduce((s, a) => s + a.total, 0), byDay };
}

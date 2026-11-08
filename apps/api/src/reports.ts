import { allAppointments, findService } from "./appointments";
import { toLocalDateKey } from "./dates";

export interface MonthlyReport {
  month: string;
  count: number;
  revenue: number;
  byService?: { serviceId: number; name: string; count: number; revenue: number }[];
}

/** Resumen de ingresos de un mes (YYYY-MM). */
export function monthlyReport(month: string): MonthlyReport {
  const inMonth = allAppointments().filter((a) => toLocalDateKey(a.start).startsWith(month));
  if (inMonth.length === 0) return { month, count: 0, revenue: 0 };

  const byService = new Map<number, { serviceId: number; name: string; count: number; revenue: number }>();
  for (const a of inMonth) {
    const row = byService.get(a.serviceId) ?? { serviceId: a.serviceId, name: findService(a.serviceId).name, count: 0, revenue: 0 };
    row.count += 1;
    row.revenue += a.total;
    byService.set(a.serviceId, row);
  }
  return {
    month,
    count: inMonth.length,
    revenue: inMonth.reduce((sum, a) => sum + a.total, 0),
    byService: [...byService.values()],
  };
}

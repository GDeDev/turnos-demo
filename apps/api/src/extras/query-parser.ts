export interface ListQuery {
  page: number;
  pageSize: number;
  status?: "booked" | "cancelled";
}

function toPositiveInt(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

/** Lee los parámetros de listado de la URL con valores por defecto seguros. */
export function parseListQuery(raw: Record<string, unknown>): ListQuery {
  const status = raw.status === "booked" || raw.status === "cancelled" ? raw.status : undefined;
  return { page: toPositiveInt(raw.page, 1), pageSize: Math.min(100, toPositiveInt(raw.pageSize, 10)), status };
}

export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/** Paginación genérica con páginas desde 1. Una página fuera de rango devuelve la lista vacía. */
export function paginate<T>(items: T[], page = 1, pageSize = 10): Page<T> {
  const size = Math.max(1, Math.floor(pageSize));
  const current = Math.max(1, Math.floor(page));
  const start = (current - 1) * size;
  return { items: items.slice(start, start + size), page: current, pageSize: size, total: items.length, totalPages: Math.max(1, Math.ceil(items.length / size)) };
}

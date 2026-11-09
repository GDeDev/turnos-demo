export interface Row {
  key: string;
  amount: number;
}

/** Suma importes agrupados por clave; las claves vacías van a "sin clasificar". */
export function sumBy(rows: Row[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const r of rows) {
    const key = r.key || "sin clasificar";
    out[key] = (out[key] ?? 0) + r.amount;
  }
  return out;
}

export function topN(totals: Record<string, number>, n: number): [string, number][] {
  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

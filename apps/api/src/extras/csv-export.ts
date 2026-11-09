function cell(value: unknown): string {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Convierte filas a CSV (con comillas escapadas) para exportar listados. */
export function toCsv(headers: string[], rows: Record<string, unknown>[]): string {
  const lines = [headers.map(cell).join(",")];
  for (const row of rows) lines.push(headers.map((h) => cell(row[h])).join(","));
  return lines.join("\n");
}

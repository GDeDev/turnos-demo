const formatter = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

/** Formatea pesos enteros para mostrar: 8000 -> "$ 8.000". */
export function formatPesos(amount: number): string {
  return formatter.format(amount).replace(/\s/g, " ");
}

export function parsePesos(text: string): number {
  return Number(text.replace(/[^\d,-]/g, "").replace(",", ".")) || 0;
}

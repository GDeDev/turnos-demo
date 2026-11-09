let counter = 0;

/** Número de comprobante con formato 0001-00000042. */
export function nextInvoiceNumber(pointOfSale = 1): string {
  counter += 1;
  return `${String(pointOfSale).padStart(4, "0")}-${String(counter).padStart(8, "0")}`;
}

export function parseInvoiceNumber(value: string): { pointOfSale: number; sequence: number } | null {
  const m = /^(\d{4})-(\d{8})$/.exec(value);
  return m ? { pointOfSale: Number(m[1]), sequence: Number(m[2]) } : null;
}

export function resetInvoiceCounter(): void {
  counter = 0;
}

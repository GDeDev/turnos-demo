export const VAT_PERCENT = 21;

/** Separa un precio final (con IVA incluido) en neto e IVA, en pesos redondeados. */
export function splitVat(gross: number, percent = VAT_PERCENT): { net: number; vat: number } {
  const net = Math.round(gross / (1 + percent / 100));
  return { net, vat: gross - net };
}

export function addVat(net: number, percent = VAT_PERCENT): number {
  return Math.round(net * (1 + percent / 100));
}

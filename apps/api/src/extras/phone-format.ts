/** Muestra un teléfono argentino ya normalizado (solo dígitos) en formato legible. */
export function formatPhoneAR(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length === 13 && d.startsWith("549")) return `+54 9 ${d.slice(3, 5)} ${d.slice(5, 9)}-${d.slice(9)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return d;
}

export function isMobileAR(digits: string): boolean {
  return digits.replace(/\D/g, "").startsWith("549");
}

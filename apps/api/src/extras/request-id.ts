let seq = 0;

/** Identificador corto para correlacionar los logs de un mismo pedido. */
export function newRequestId(prefix = "req"): string {
  seq = (seq + 1) % 1_000_000;
  return `${prefix}-${Date.now().toString(36)}-${seq.toString(36)}`;
}

export function isRequestId(value: string): boolean {
  return /^[a-z]+-[a-z0-9]+-[a-z0-9]+$/.test(value);
}

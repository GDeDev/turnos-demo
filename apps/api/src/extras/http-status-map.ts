const REASONS: Record<number, string> = {
  200: "OK",
  201: "Creado",
  400: "Pedido inválido",
  404: "No encontrado",
  409: "Conflicto",
  422: "No procesable",
  500: "Error interno",
};

export function reasonFor(status: number): string {
  return REASONS[status] ?? "Desconocido";
}

export function isClientError(status: number): boolean {
  return status >= 400 && status < 500;
}

export function isRetryable(status: number): boolean {
  return status === 429 || status >= 500;
}

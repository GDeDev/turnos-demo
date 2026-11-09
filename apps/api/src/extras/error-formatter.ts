export interface ApiErrorBody {
  error: string;
  status: number;
  details?: string[];
}

/** Cuerpo de error uniforme para las respuestas de la API. */
export function errorBody(status: number, message: string, details?: string[]): ApiErrorBody {
  return details && details.length ? { error: message, status, details } : { error: message, status };
}

export function describeError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return typeof err === "string" ? err : "Error desconocido";
}

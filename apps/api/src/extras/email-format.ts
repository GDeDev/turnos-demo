/** Normaliza un email para comparar: recorta espacios y pasa a minúsculas. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Oculta la parte local de un email para mostrarlo en pantallas públicas: "juan@x.com" -> "j***@x.com". */
export function maskEmail(email: string): string {
  const [local, domain] = normalizeEmail(email).split("@");
  if (!domain) return "***";
  return `${local.slice(0, 1)}***@${domain}`;
}

export function emailDomain(email: string): string {
  return normalizeEmail(email).split("@")[1] ?? "";
}

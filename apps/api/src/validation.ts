import type { Customer } from "./types";
import { HttpError } from "./types";

const EMAIL_RE = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim().toLowerCase());
}

/** Deja solo dígitos: "+54 9 11 5555-1234" -> "5491155551234". */
export function normalizePhone(phone: string | undefined): string {
  return phone ? phone.replace(/\D/g, "") : "";
}

export function validateCustomer(raw: Partial<Customer> | undefined): Customer {
  if (!raw || !raw.name || !raw.name.trim()) throw new HttpError(400, "El nombre es obligatorio");
  if (!raw.email || !isValidEmail(raw.email)) throw new HttpError(400, "El email no es válido");
  return { name: raw.name.trim(), email: raw.email.trim().toLowerCase(), phone: normalizePhone(raw.phone) };
}

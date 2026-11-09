import type { Customer } from "../types";

function fold(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** Busca clientes por nombre o email ignorando mayúsculas y tildes. */
export function searchCustomers(customers: Customer[], text: string): Customer[] {
  const q = fold(text.trim());
  if (!q) return customers;
  return customers.filter((c) => fold(c.name).includes(q) || fold(c.email).includes(q));
}

export function uniqueByEmail(customers: Customer[]): Customer[] {
  const seen = new Set<string>();
  return customers.filter((c) => {
    const key = c.email.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

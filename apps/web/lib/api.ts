export interface Service { id: number; name: string; durationMin: number; price: number }
export interface Professional { id: number; name: string }
export interface Appointment {
  id: number; serviceId: number; professionalId: number; start: string; end: string; date: string;
  status: "booked" | "cancelled"; total: number; customer: { name: string; email: string; phone?: string };
}
export interface MonthlyReport {
  month: string; count: number; revenue: number;
  byService: { serviceId: number; name: string; count: number; revenue: number }[];
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, { ...init, headers: { "Content-Type": "application/json" } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string }).error ?? `Error ${res.status}`);
  return body as T;
}

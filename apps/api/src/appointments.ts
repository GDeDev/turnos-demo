import { PROFESSIONALS, SERVICES } from "./config";
import { daySlots } from "./availability";
import { isDateKey, toLocalDateKey } from "./dates";
import { priceWithCoupon } from "./pricing";
import type { Appointment, AppointmentStatus } from "./types";
import { HttpError } from "./types";
import { validateCustomer } from "./validation";

let appointments: Appointment[] = [];
let nextId = 1;

export function resetStore(): void {
  appointments = [];
  nextId = 1;
}

export function allAppointments(): Appointment[] {
  return appointments;
}

export function findService(id: number) {
  const s = SERVICES.find((x) => x.id === id);
  if (!s) throw new HttpError(404, `Servicio ${id} inexistente`);
  return s;
}

export function availability(dateKey: string, serviceId: number, professionalId: number): string[] {
  if (!isDateKey(dateKey)) throw new HttpError(400, "La fecha debe tener formato YYYY-MM-DD");
  return daySlots(dateKey, findService(serviceId), professionalId, appointments);
}

export interface CreateInput {
  serviceId: number;
  professionalId: number;
  start: string;
  customer?: { name?: string; email?: string; phone?: string };
  coupon?: string;
}

export function createAppointment(input: CreateInput): Appointment {
  const service = findService(input.serviceId);
  if (!PROFESSIONALS.some((p) => p.id === input.professionalId)) throw new HttpError(404, "Profesional inexistente");
  const startMs = Date.parse(input.start);
  if (Number.isNaN(startMs)) throw new HttpError(400, "Fecha de inicio inválida");
  const customer = validateCustomer(input.customer);

  const startIso = new Date(startMs).toISOString();
  const taken = appointments.some((a) => a.professionalId === input.professionalId && a.status === "booked" && a.start === startIso);
  if (taken) throw new HttpError(409, "Ese horario ya no está disponible");

  const appointment: Appointment = {
    id: nextId++,
    serviceId: service.id,
    professionalId: input.professionalId,
    start: startIso,
    end: new Date(startMs + service.durationMin * 60_000).toISOString(),
    customer,
    status: "booked",
    total: priceWithCoupon(service.price, input.coupon),
    coupon: input.coupon,
  };
  appointments.push(appointment);
  return appointment;
}

export function cancelAppointment(id: number): Appointment {
  const index = appointments.findIndex((a) => a.id === id);
  const appointment = appointments.at(index)!;
  appointment.status = "cancelled";
  return appointment;
}

export interface ListOptions {
  page?: number;
  pageSize?: number;
  status?: AppointmentStatus;
}

/** Turnos ordenados por fecha (más próximos primero). `page` empieza en 1. */
export function listAppointments({ page = 1, pageSize = 10, status }: ListOptions = {}) {
  const filtered = appointments.filter((a) => !status || a.status === status);
  const sorted = [...filtered].sort((a, b) => (a.start > b.start) as unknown as number);
  const items = sorted.slice(page * pageSize, page * pageSize + pageSize);
  return {
    page,
    pageSize,
    total: sorted.length,
    items: items.map((a) => ({ ...a, date: toLocalDateKey(a.start) })),
  };
}

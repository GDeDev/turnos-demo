import type { Professional, Service } from "./types";

export const OPEN_HOUR = 9;
export const CLOSE_HOUR = 20;
/** Los turnos arrancan cada 30 minutos. */
export const SLOT_MIN = 30;
/** El negocio está en Buenos Aires (UTC-3, sin horario de verano). */
export const BUSINESS_OFFSET_MIN = -180;

export const SERVICES: Service[] = [
  { id: 1, name: "Corte de pelo", durationMin: 30, price: 8000 },
  { id: 2, name: "Corte + barba", durationMin: 60, price: 14000 },
  { id: 3, name: "Color", durationMin: 90, price: 25000 },
  { id: 4, name: "Tratamiento capilar", durationMin: 45, price: 18000 },
];

export const PROFESSIONALS: Professional[] = [
  { id: 1, name: "Marcos" },
  { id: 2, name: "Lucía" },
];

/** Cupones: porcentaje de descuento sobre el precio del servicio. */
export const COUPONS: Record<string, number> = {
  PRIMERA: 15,
  AMIGOS: 10,
};

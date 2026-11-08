export interface Service {
  id: number;
  name: string;
  durationMin: number;
  /** Precio en pesos enteros (no centavos). */
  price: number;
}

export interface Professional {
  id: number;
  name: string;
}

export interface Customer {
  name: string;
  email: string;
  phone?: string;
}

export type AppointmentStatus = "booked" | "cancelled";

export interface Appointment {
  id: number;
  serviceId: number;
  professionalId: number;
  /** ISO 8601 en UTC. */
  start: string;
  end: string;
  customer: Customer;
  status: AppointmentStatus;
  total: number;
  coupon?: string;
}

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

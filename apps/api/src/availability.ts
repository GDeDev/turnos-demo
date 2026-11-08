import { CLOSE_HOUR, OPEN_HOUR, SLOT_MIN } from "./config";
import { localTime } from "./dates";
import type { Appointment, Service } from "./types";

const MIN = 60_000;

export function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd;
}

/** Horarios (ISO UTC) en los que se puede empezar `service` con `professionalId` ese día. */
export function daySlots(dateKey: string, service: Service, professionalId: number, appointments: Appointment[]): string[] {
  const open = localTime(dateKey, OPEN_HOUR);
  const close = localTime(dateKey, CLOSE_HOUR);
  const slotsNeeded = Math.floor(service.durationMin / SLOT_MIN);
  const mine = appointments.filter((a) => a.professionalId === professionalId);

  const slots: string[] = [];
  for (let start = open; start < close; start += SLOT_MIN * MIN) {
    const end = start + slotsNeeded * SLOT_MIN * MIN;
    const busy = mine.some((a) => overlaps(start, end, Date.parse(a.start), Date.parse(a.end)));
    if (!busy) slots.push(new Date(start).toISOString());
  }
  return slots;
}

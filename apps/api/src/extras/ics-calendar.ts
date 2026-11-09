import type { Appointment } from "../types";

const stamp = (iso: string): string => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Evento iCalendar para agregar un turno a la agenda personal del cliente. */
export function toIcsEvent(a: Appointment, title: string): string {
  return ["BEGIN:VEVENT", `UID:turno-${a.id}@turnos.example`, `DTSTART:${stamp(a.start)}`, `DTEND:${stamp(a.end)}`, `SUMMARY:${title}`, "END:VEVENT"].join("\r\n");
}

export function toIcsCalendar(events: string[]): string {
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//turnos-demo//ES", ...events, "END:VCALENDAR"].join("\r\n");
}

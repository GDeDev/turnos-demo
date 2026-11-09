import type { Appointment } from "../types";

/** Ordena turnos por fecha de inicio ascendente (los empates se resuelven por id). No muta la lista original. */
export function sortByStart(list: Appointment[]): Appointment[] {
  return [...list].sort((a, b) => Date.parse(a.start) - Date.parse(b.start) || a.id - b.id);
}

/** Agrupa por profesional manteniendo el orden por inicio dentro de cada grupo. */
export function groupByProfessional(list: Appointment[]): Map<number, Appointment[]> {
  const groups = new Map<number, Appointment[]>();
  for (const a of sortByStart(list)) {
    const bucket = groups.get(a.professionalId) ?? [];
    bucket.push(a);
    groups.set(a.professionalId, bucket);
  }
  return groups;
}

export interface Shift {
  professionalId: number;
  weekday: number;
  fromHour: number;
  toHour: number;
}

export const SHIFTS: Shift[] = [
  { professionalId: 1, weekday: 1, fromHour: 9, toHour: 18 },
  { professionalId: 1, weekday: 2, fromHour: 9, toHour: 18 },
  { professionalId: 2, weekday: 3, fromHour: 12, toHour: 20 },
  { professionalId: 2, weekday: 4, fromHour: 12, toHour: 20 },
];

export function worksAt(professionalId: number, weekday: number, hour: number): boolean {
  return SHIFTS.some((s) => s.professionalId === professionalId && s.weekday === weekday && hour >= s.fromHour && hour < s.toHour);
}

export function professionalsOn(weekday: number): number[] {
  return [...new Set(SHIFTS.filter((s) => s.weekday === weekday).map((s) => s.professionalId))];
}

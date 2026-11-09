export interface Hours {
  open: number;
  close: number;
}

/** ¿Un servicio que arranca a `startHour` (decimal, 15.5 = 15:30) y dura `durationMin` termina antes del cierre? */
export function fitsBeforeClose(startHour: number, durationMin: number, hours: Hours): boolean {
  return startHour >= hours.open && startHour + durationMin / 60 <= hours.close;
}

export function lastStartHour(durationMin: number, hours: Hours): number {
  return hours.close - durationMin / 60;
}

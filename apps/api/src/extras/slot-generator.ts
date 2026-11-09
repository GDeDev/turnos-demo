export interface Slot {
  start: number;
  end: number;
}

/** Genera huecos consecutivos de `durationMin` dentro de [open, close) cada `stepMin`, sin pasarse del cierre. */
export function generateSlots(open: number, close: number, durationMin: number, stepMin = 30): Slot[] {
  const slots: Slot[] = [];
  const dur = durationMin * 60_000;
  for (let start = open; start + dur <= close; start += stepMin * 60_000) slots.push({ start, end: start + dur });
  return slots;
}

export function removeBusy(slots: Slot[], busy: Slot[]): Slot[] {
  return slots.filter((s) => !busy.some((b) => s.start < b.end && b.start < s.end));
}

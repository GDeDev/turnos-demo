/** 90 -> "1 h 30 min", 45 -> "45 min", 60 -> "1 h". */
export function minutesToLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export function labelToMinutes(label: string): number {
  const h = /(\d+)\s*h/.exec(label);
  const m = /(\d+)\s*min/.exec(label);
  return (h ? Number(h[1]) * 60 : 0) + (m ? Number(m[1]) : 0);
}

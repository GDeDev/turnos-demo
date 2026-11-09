export interface Range {
  start: number;
  end: number;
}

/** Dos intervalos semiabiertos [start, end) se pisan si cada uno empieza antes de que termine el otro. */
export function rangesOverlap(a: Range, b: Range): boolean {
  return a.start < b.end && b.start < a.end;
}

export function findConflicts(candidate: Range, existing: Range[]): Range[] {
  return existing.filter((r) => rangesOverlap(candidate, r));
}

export function mergeRanges(ranges: Range[]): Range[] {
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const out: Range[] = [];
  for (const r of sorted) {
    const last = out[out.length - 1];
    if (last && r.start <= last.end) last.end = Math.max(last.end, r.end);
    else out.push({ ...r });
  }
  return out;
}

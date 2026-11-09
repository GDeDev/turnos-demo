export interface WaitEntry {
  email: string;
  serviceId: number;
  since: number;
}

const queue: WaitEntry[] = [];

export function joinWaitlist(entry: WaitEntry): number {
  if (!queue.some((e) => e.email === entry.email && e.serviceId === entry.serviceId)) queue.push(entry);
  return queue.filter((e) => e.serviceId === entry.serviceId).findIndex((e) => e.email === entry.email) + 1;
}

/** Saca de la cola al que esperaba hace más tiempo para ese servicio. */
export function popWaitlist(serviceId: number): WaitEntry | undefined {
  const idx = queue.findIndex((e) => e.serviceId === serviceId);
  return idx === -1 ? undefined : queue.splice(idx, 1)[0];
}

export function waitlistSize(serviceId: number): number {
  return queue.filter((e) => e.serviceId === serviceId).length;
}

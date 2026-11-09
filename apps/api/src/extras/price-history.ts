export interface PricePoint {
  serviceId: number;
  price: number;
  from: string;
}

/** Precio vigente de un servicio en una fecha: el último punto cuyo `from` no supera la fecha. */
export function priceOn(history: PricePoint[], serviceId: number, dateKey: string): number | undefined {
  return history
    .filter((p) => p.serviceId === serviceId && p.from <= dateKey)
    .sort((a, b) => (a.from < b.from ? 1 : -1))[0]?.price;
}

export function priceChanges(history: PricePoint[], serviceId: number): number {
  return history.filter((p) => p.serviceId === serviceId).length - 1;
}

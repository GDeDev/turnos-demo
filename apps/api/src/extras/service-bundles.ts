export interface Bundle {
  name: string;
  serviceIds: number[];
  percentOff: number;
}

export const BUNDLES: Bundle[] = [{ name: "Look completo", serviceIds: [2, 4], percentOff: 10 }];

/** Precio de un pack: suma de los servicios menos el porcentaje del pack, en pesos enteros. */
export function bundlePrice(bundle: Bundle, prices: Record<number, number>): number {
  const sum = bundle.serviceIds.reduce((acc, id) => acc + (prices[id] ?? 0), 0);
  return Math.round(sum * (1 - bundle.percentOff / 100));
}

export function bundleDuration(bundle: Bundle, durations: Record<number, number>): number {
  return bundle.serviceIds.reduce((acc, id) => acc + (durations[id] ?? 0), 0);
}

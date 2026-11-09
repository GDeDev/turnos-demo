export interface Branch {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export const BRANCHES: Branch[] = [
  { id: 1, name: "Palermo", address: "Honduras 4800", lat: -34.588, lng: -58.43 },
  { id: 2, name: "Belgrano", address: "Cabildo 2100", lat: -34.562, lng: -58.456 },
];

/** Distancia aproximada en km (haversine) entre dos puntos. */
export function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const rad = (d: number): number => (d * Math.PI) / 180;
  const h = Math.sin(rad(bLat - aLat) / 2) ** 2 + Math.cos(rad(aLat)) * Math.cos(rad(bLat)) * Math.sin(rad(bLng - aLng) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

export function nearestBranch(lat: number, lng: number): Branch {
  return [...BRANCHES].sort((a, b) => distanceKm(lat, lng, a.lat, a.lng) - distanceKm(lat, lng, b.lat, b.lng))[0];
}

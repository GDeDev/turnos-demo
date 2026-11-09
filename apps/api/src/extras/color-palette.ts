export interface Swatch {
  name: string;
  hex: string;
}

export const SWATCHES: Swatch[] = [
  { name: "Castaño oscuro", hex: "#3b2a20" },
  { name: "Castaño claro", hex: "#8a6a4d" },
  { name: "Rubio", hex: "#d9b97a" },
  { name: "Cobre", hex: "#b4572a" },
];

export function findSwatch(name: string): Swatch | undefined {
  const q = name.trim().toLowerCase();
  return SWATCHES.find((s) => s.name.toLowerCase() === q);
}

export function isHexColor(value: string): boolean {
  return /^#[0-9a-f]{6}$/i.test(value);
}

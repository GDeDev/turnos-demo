export interface CatalogEntry {
  id: number;
  name: string;
  category: "pelo" | "barba" | "color" | "tratamiento";
  active: boolean;
}

export const CATALOG: CatalogEntry[] = [
  { id: 1, name: "Corte de pelo", category: "pelo", active: true },
  { id: 2, name: "Corte + barba", category: "barba", active: true },
  { id: 3, name: "Color", category: "color", active: true },
  { id: 4, name: "Tratamiento capilar", category: "tratamiento", active: true },
];

export function activeByCategory(category: CatalogEntry["category"]): CatalogEntry[] {
  return CATALOG.filter((e) => e.active && e.category === category);
}

export function searchCatalog(text: string): CatalogEntry[] {
  const q = text.trim().toLowerCase();
  return CATALOG.filter((e) => e.active && e.name.toLowerCase().includes(q));
}

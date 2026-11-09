/** "  juan   PÉREZ " -> "Juan Pérez". Respeta partículas como "de" y "del". */
export function titleCaseName(raw: string): string {
  const small = new Set(["de", "del", "la", "las", "los", "y"]);
  return raw
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((w, i) => (i > 0 && small.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

export function initials(name: string): string {
  return titleCaseName(name)
    .split(" ")
    .filter((w) => w.length > 2)
    .map((w) => w[0])
    .join("");
}

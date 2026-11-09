const tags = new Map<string, Set<string>>();

export function addTag(email: string, tag: string): void {
  const key = email.trim().toLowerCase();
  const set = tags.get(key) ?? new Set<string>();
  set.add(tag.trim().toLowerCase());
  tags.set(key, set);
}

export function tagsOf(email: string): string[] {
  return [...(tags.get(email.trim().toLowerCase()) ?? [])].sort();
}

export function customersWithTag(tag: string): string[] {
  const wanted = tag.trim().toLowerCase();
  return [...tags.entries()].filter(([, set]) => set.has(wanted)).map(([email]) => email).sort();
}

const flags = new Map<string, boolean>([
  ["loyalty", false],
  ["waitlist", false],
  ["gift-cards", true],
]);

export function isEnabled(flag: string): boolean {
  return flags.get(flag) ?? false;
}

export function setFlag(flag: string, value: boolean): void {
  flags.set(flag, value);
}

export function enabledFlags(): string[] {
  return [...flags.entries()].filter(([, on]) => on).map(([name]) => name).sort();
}

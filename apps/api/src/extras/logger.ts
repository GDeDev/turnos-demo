type Level = "debug" | "info" | "warn" | "error";
const ORDER: Level[] = ["debug", "info", "warn", "error"];

let minLevel: Level = "info";

export function setLogLevel(level: Level): void {
  minLevel = level;
}

export function formatLog(level: Level, message: string, fields: Record<string, unknown> = {}): string {
  const extra = Object.entries(fields).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(" ");
  return `[${level}] ${message}${extra ? " " + extra : ""}`;
}

export function shouldLog(level: Level): boolean {
  return ORDER.indexOf(level) >= ORDER.indexOf(minLevel);
}

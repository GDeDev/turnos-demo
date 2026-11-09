export interface AuditEntry {
  at: string;
  actor: string;
  action: string;
  target: string;
}

const entries: AuditEntry[] = [];

export function audit(actor: string, action: string, target: string, now = new Date()): void {
  entries.push({ at: now.toISOString(), actor, action, target });
}

export function auditFor(target: string): AuditEntry[] {
  return entries.filter((e) => e.target === target);
}

export function lastAudit(n = 20): AuditEntry[] {
  return entries.slice(-n).reverse();
}

"use client";
import { useEffect, useState } from "react";
import { api, type Appointment } from "@/lib/api";
import { formatDateTime, formatPrice } from "@/lib/format";

export default function AppointmentsPage() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<{ items: Appointment[] }>("/appointments?status=booked&pageSize=50").then((r) => setItems(r.items));
  }, []);

  const sorted = [...items].sort((a, b) => a.start.localeCompare(b.start));

  async function cancel(index: number) {
    try {
      await api(`/appointments/${sorted[index].id}/cancel`, { method: "PATCH" });
      setItems(items.filter((_, i) => i !== index));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  }

  return (
    <main>
      <h1>Mis turnos</h1>
      {error ? <p role="alert" style={{ color: "crimson" }}>{error}</p> : null}
      {sorted.length === 0 ? <p>No tenés turnos reservados.</p> : null}
      <ul>
        {sorted.map((a, i) => (
          <li key={i}>
            {formatDateTime(a.start)} · {a.customer.name} · {formatPrice(a.total)}{" "}
            <button onClick={() => cancel(i)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

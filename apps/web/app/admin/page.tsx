"use client";
import { useEffect, useState } from "react";
import { api, type MonthlyReport } from "@/lib/api";
import { formatPrice } from "@/lib/format";

const currentMonth = () => new Date().toISOString().slice(0, 7);

export default function AdminPage() {
  const [month, setMonth] = useState(currentMonth());
  const [report, setReport] = useState<MonthlyReport | null>(null);

  useEffect(() => {
    api<MonthlyReport>(`/reports/monthly?month=${month}`).then(setReport);
  }, [month]);

  return (
    <main>
      <h1>Reporte mensual</h1>
      <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      {report ? (
        <section>
          <p>{report.count} turnos · {formatPrice(report.revenue)}</p>
          <ul>
            {report.byService?.map((s) => (
              <li key={s.serviceId}>{s.name}: {s.count} · {formatPrice(s.revenue)}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}

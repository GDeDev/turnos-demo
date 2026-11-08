"use client";
import { useEffect, useState } from "react";
import { api, type Service } from "@/lib/api";
import { formatPrice } from "@/lib/format";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    api<Service[]>("/services").then(setServices);
  }, []);
  return (
    <main>
      <h1>Servicios</h1>
      <ul>
        {services.map((s) => (
          <li key={s.id}>
            {s.name} · {s.durationMin} min · {formatPrice(s.price)}
          </li>
        ))}
      </ul>
    </main>
  );
}

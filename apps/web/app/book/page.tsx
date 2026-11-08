"use client";
import { useEffect, useState, type FormEvent } from "react";
import { api, type Appointment, type Professional, type Service } from "@/lib/api";
import { formatDateTime } from "@/lib/format";

export default function BookPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [pros, setPros] = useState<Professional[]>([]);
  const [serviceId, setServiceId] = useState(1);
  const [professionalId, setProfessionalId] = useState(1);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [start, setStart] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<Appointment | null>(null);

  useEffect(() => {
    api<Service[]>("/services").then(setServices);
    api<Professional[]>("/professionals").then(setPros);
  }, []);

  useEffect(() => {
    if (!date) return;
    api<{ slots: string[] }>(`/availability?date=${date}&serviceId=${serviceId}&professionalId=${professionalId}`).then((r) => {
      setSlots(r.slots);
      setStart("");
    });
  }, [date, serviceId, professionalId]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const appointment = await api<Appointment>("/appointments", {
        method: "POST",
        body: JSON.stringify({ serviceId, professionalId, start, coupon: coupon || undefined, customer: { name, email, phone: phone || undefined } }),
      });
      setDone(appointment);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  }

  if (done) return <p>¡Listo! Tu turno es el {formatDateTime(done.start)}.</p>;

  return (
    <main>
      <h1>Reservar turno</h1>
      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <select value={serviceId} onChange={(e) => setServiceId(Number(e.target.value))}>
          {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select value={professionalId} onChange={(e) => setProfessionalId(Number(e.target.value))}>
          {pros.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <select value={start} onChange={(e) => setStart(e.target.value)} required>
          <option value="">Elegí un horario</option>
          {slots.map((s) => <option key={s} value={s}>{formatDateTime(s)}</option>)}
        </select>
        <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Teléfono (opcional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="Cupón (opcional)" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
        {error ? <p role="alert" style={{ color: "crimson" }}>{error}</p> : null}
        <button type="submit" disabled={loading || !start}>{loading ? "Reservando…" : "Reservar"}</button>
      </form>
    </main>
  );
}

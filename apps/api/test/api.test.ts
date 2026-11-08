// Estos tests describen el comportamiento CORRECTO. Mientras haya bugs, algunos fallan (es a propósito).
import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { availability, cancelAppointment, createAppointment, listAppointments, resetStore } from "../src/appointments";
import { toLocalDateKey } from "../src/dates";
import { priceWithCoupon } from "../src/pricing";
import { monthlyReport } from "../src/reports";
import { isValidEmail } from "../src/validation";

const DAY = "2026-03-10";
const at = (hhmm: string) => new Date(`${DAY}T${hhmm}:00-03:00`).toISOString();
const customer = { name: "Ana", email: "ana@example.com", phone: "11 5555-1234" };
const book = (hhmm: string, serviceId = 1, professionalId = 1) => createAppointment({ serviceId, professionalId, start: at(hhmm), customer });

beforeEach(() => resetStore());

describe("disponibilidad", () => {
  it("BUG-01: no ofrece horarios en los que el servicio termina después del cierre", () => {
    const slots = availability(DAY, 2, 1); // corte + barba = 60 min, cierra 20:00
    assert.ok(!slots.includes(at("19:30")), "19:30 no debería estar disponible");
    assert.ok(slots.includes(at("19:00")));
  });

  it("BUG-12: un servicio de 45 min bloquea el tiempo que realmente dura", () => {
    book("16:00"); // corte de 30 min, 16:00 a 16:30
    const slots = availability(DAY, 4, 1); // tratamiento de 45 min
    assert.ok(!slots.includes(at("15:30")), "15:30 + 45 min pisa el turno de las 16:00");
  });

  it("BUG-03: un turno cancelado libera el horario", () => {
    const a = book("10:00");
    cancelAppointment(a.id);
    assert.ok(availability(DAY, 1, 1).includes(at("10:00")));
  });
});

describe("turnos", () => {
  it("BUG-02: no permite pisar un turno que ya está en curso", () => {
    book("15:00", 2); // 15:00 a 16:00
    assert.throws(() => book("15:30"), /disponible/);
  });

  it("BUG-10: cancelar un id inexistente falla y no toca otros turnos", () => {
    const a = book("10:00");
    assert.throws(() => cancelAppointment(999));
    assert.equal(a.status, "booked");
  });

  it("BUG-06: el teléfono es opcional", () => {
    const a = createAppointment({ serviceId: 1, professionalId: 1, start: at("11:00"), customer: { name: "Ana", email: "ana@example.com" } });
    assert.equal(a.status, "booked");
  });

  it("BUG-07: la página 1 incluye los primeros turnos", () => {
    for (const h of ["09:00", "09:30", "10:00"]) book(h);
    const page = listAppointments({ page: 1, pageSize: 2 });
    assert.equal(page.items.length, 2);
    assert.equal(page.items[0].start, at("09:00"));
  });

  it("BUG-11: la lista viene ordenada por fecha", () => {
    for (const h of ["19:00", "18:00", "17:00", "16:00", "15:00", "14:00", "13:00", "12:00", "11:00", "10:00", "09:00"]) book(h);
    const starts = listAppointments({ page: 1, pageSize: 50 }).items.map((a) => a.start);
    assert.equal(starts.length, 11);
    assert.deepEqual(starts, [...starts].sort());
  });
});

describe("precios y validación", () => {
  it("BUG-04: el cupón PRIMERA descuenta 15%", () => {
    assert.equal(priceWithCoupon(10000, "PRIMERA"), 8500);
    assert.equal(priceWithCoupon(10000), 10000);
  });

  it("BUG-05: acepta emails con + y subdominios", () => {
    assert.ok(isValidEmail("juan+turnos@gmail.com"));
    assert.ok(isValidEmail("ana@mail.empresa.com.ar"));
    assert.ok(!isValidEmail("sin-arroba.com"));
  });
});

describe("fechas y reportes", () => {
  it("BUG-09: un turno a las 22:00 (hora de Buenos Aires) cae en su día", () => {
    assert.equal(toLocalDateKey(at("22:00")), DAY);
  });

  it("BUG-08: el reporte no cuenta turnos cancelados", () => {
    const a = book("10:00");
    book("11:00");
    cancelAppointment(a.id);
    const r = monthlyReport("2026-03");
    assert.equal(r.count, 1);
    assert.equal(r.revenue, 8000);
  });

  it("BUG-16: un mes sin turnos devuelve el detalle vacío (no undefined)", () => {
    assert.deepEqual(monthlyReport("2026-04").byService, []);
  });
});

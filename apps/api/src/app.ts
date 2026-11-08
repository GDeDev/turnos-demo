import express, { type NextFunction, type Request, type Response } from "express";
import { availability, cancelAppointment, createAppointment, listAppointments } from "./appointments";
import { PROFESSIONALS, SERVICES } from "./config";
import { monthlyReport } from "./reports";
import { HttpError } from "./types";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.use((req, res, next) => {
    res.on("finish", () => console.log(`[http] ${req.method} ${req.originalUrl} -> ${res.statusCode}`));
    next();
  });

  app.get("/api/services", (_req, res) => res.json(SERVICES));
  app.get("/api/professionals", (_req, res) => res.json(PROFESSIONALS));

  app.get("/api/availability", (req, res) => {
    const slots = availability(String(req.query.date ?? ""), Number(req.query.serviceId), Number(req.query.professionalId));
    res.json({ slots });
  });

  app.post("/api/appointments", (req, res) => {
    res.status(201).json(createAppointment(req.body ?? {}));
  });

  app.get("/api/appointments", (req, res) => {
    const status = req.query.status === "booked" || req.query.status === "cancelled" ? req.query.status : undefined;
    res.json(listAppointments({ page: Number(req.query.page) || 1, pageSize: Number(req.query.pageSize) || 10, status }));
  });

  app.patch("/api/appointments/:id/cancel", (req, res) => {
    const appointment = cancelAppointment(Number(req.params.id));
    console.log(`[info] cancelled appointment ${appointment.id} (${req.originalUrl})`);
    res.json(appointment);
  });

  app.get("/api/reports/monthly", (req, res) => {
    res.json(monthlyReport(String(req.query.month ?? "")));
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpError) return res.status(err.status).json({ error: err.message });
    const e = err instanceof Error ? err : new Error(String(err));
    console.error(`[error] ${e.name}: ${e.message}\n${e.stack}`);
    res.status(500).json({ error: "Error interno" });
  });

  return app;
}

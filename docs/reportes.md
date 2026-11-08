# Reporte mensual

`GET /api/reports/monthly?month=YYYY-MM` resume la facturación de un mes.

- Cuenta **solo turnos vigentes** (`booked`). Los cancelados no suman ni a la cantidad ni a los ingresos.
- El mes de un turno se define por su fecha en el calendario de Buenos Aires.
- Devuelve `{ month, count, revenue, byService }`.
- `byService` agrupa por servicio con cantidad e ingresos.

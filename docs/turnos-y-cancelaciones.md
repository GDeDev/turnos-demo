# Turnos, cancelaciones y listados

- Un turno se crea con servicio, profesional, fecha/hora de inicio y datos del cliente.
- Si el horario ya está ocupado para ese profesional, la API responde **409**.
- **Cancelar** no borra el turno: cambia su estado a `cancelled`. Cancelar un turno que no existe responde **404** y no modifica ningún otro turno.
- El listado `GET /api/appointments` está **ordenado por fecha de inicio, del más próximo al más lejano**.
- La paginación es **de base 1**: `page=1` devuelve los primeros `pageSize` turnos, `page=2` los siguientes.
- Cada turno del listado incluye `date`: el día (YYYY-MM-DD) **en el calendario de Buenos Aires**. Un turno a las 22:00 del lunes en Buenos Aires es del lunes, aunque en UTC ya sea martes.

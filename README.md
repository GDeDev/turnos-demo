# Turnos (demo con bugs a propósito)

Sistema chico de reserva de turnos para una peluquería: API (Express + TypeScript) y web (Next.js), en un monorepo con npm workspaces.

> **Este repo tiene errores intencionales.** Existe para probar [Bugsmith](../bugsmith): se le reporta un error (un log o el mensaje de un usuario) y el agente propone el fix leyendo el código y la documentación de `docs/`.

```bash
npm install
npm run dev:api     # http://localhost:4000
npm run dev:web     # http://localhost:3100  (reenvía /api al backend)
npm test            # tests del comportamiento correcto: hoy fallan a propósito
npm run typecheck
```

- `apps/api`: reglas de negocio (disponibilidad, turnos, cupones, reportes). Datos en memoria.
- `apps/web`: servicios, reserva, mis turnos y reporte.
- `docs/`: reglas del negocio, en lenguaje de producto.
- `BUGS.md`: índice de bugs con el reporte para pegarle al agente. Es la "solución", no se lo des al agente.

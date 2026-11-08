# Índice de bugs (solo para vos)

> **No lo expongas al agente.** Cuando configures el agente de Bugsmith usá `apps/` como carpeta de código y `docs/` como documentación; este archivo, el `README.md` y los tests quedan afuera.
> Los tests de `apps/api/test` describen el comportamiento correcto: hoy **fallan a propósito** (uno por bug de la API). Cuando el agente arregla uno, el test correspondiente pasa.

Cada fila trae un **reporte listo para pegar** en *Analizar* (un log, o un mensaje de usuario), qué debería pasar y dónde está el problema. Pegá uno por vez, de a uno.

**Docs**: ✅ la documentación de `docs/` menciona la regla (el agente debería resolverlo mejor con docs) · ➖ la doc no lo cubre (hay que deducirlo del código).

## API

| ID | Docs | Reporte para pegar | Qué debería pasar | Dónde |
|---|---|---|---|---|
| BUG-01 | ✅ | *Mensaje de usuario:* "Me dejaron sacar un corte + barba a las 19:30 y el local cierra a las 20:00, ¿cómo va a entrar el turno?" | No ofrecer horarios cuyo servicio termine después del cierre (60 min → último a las 19:00). | `apps/api/src/availability.ts` (el ciclo no valida el fin contra el cierre) |
| BUG-02 | ✅ | *Log:* `[error] Conflict check passed for professional=1 start=2026-03-10T18:30:00.000Z overlapping with appointment 12 (2026-03-10T18:00:00.000Z-2026-03-10T19:00:00.000Z)` — *o mensaje:* "A Marcos le pusieron dos clientes a la vez, uno a las 15 (corte+barba) y otro a las 15:30." | Rechazar con 409 cualquier turno que se superponga con uno existente del mismo profesional, no solo los que empiezan a la misma hora. | `apps/api/src/appointments.ts` (`createAppointment` compara igualdad de inicio) |
| BUG-03 | ✅ | *Mensaje de usuario:* "Cancelé mi turno de las 10 pero el horario sigue apareciendo ocupado, no lo puede sacar nadie más." | Los turnos cancelados no bloquean la agenda. | `apps/api/src/availability.ts` (no filtra por estado) |
| BUG-04 | ✅ | *Log:* `[error] Invoice total negative: service=2 price=14000 coupon=PRIMERA total=-196000` | El cupón PRIMERA descuenta 15 % (14000 → 11900). | `apps/api/src/pricing.ts` (usa `1 - percent` con percent=15) |
| BUG-05 | ➖ | *Mensaje de usuario:* "No me deja reservar con mi mail juan+turnos@gmail.com, dice que no es válido. Con otro sí anda." | Aceptar emails válidos con `+`, `-` y subdominios. | `apps/api/src/validation.ts` (`EMAIL_RE`) |
| BUG-06 | ✅ | *Log:* `[error] TypeError: Cannot read properties of undefined (reading 'replace')` + `at normalizePhone (apps/api/src/validation.ts:12:24)` + `at validateCustomer` + `[http] POST /api/appointments -> 500` | El teléfono es opcional: sin teléfono el turno se crea igual. | `apps/api/src/validation.ts` (`normalizePhone`) |
| BUG-07 | ✅ | *Mensaje de usuario:* "En la lista de turnos me faltan los primeros, empieza directamente desde el 11." | `page=1` devuelve los primeros turnos. | `apps/api/src/appointments.ts` (`listAppointments`, `slice(page * pageSize…)`) |
| BUG-08 | ✅ | *Mensaje de usuario:* "El reporte de marzo dice que facturamos $ 126.000 pero en la caja tenemos mucho menos. Creo que suma los turnos cancelados." | El reporte solo cuenta turnos `booked`. | `apps/api/src/reports.ts` |
| BUG-09 | ✅ | *Mensaje de usuario:* "Mi turno del lunes a las 22:00 aparece como si fuera el martes en el listado." | `date` y el mes del reporte usan el calendario de Buenos Aires (UTC-3). | `apps/api/src/dates.ts` (`toLocalDateKey`) |
| BUG-10 | ✅ | *Log:* `[http] PATCH /api/appointments/999/cancel -> 200` + `[info] cancelled appointment 7 (/api/appointments/999/cancel)` — *y:* "se me canceló un turno que no era el que pedí". | Cancelar un id inexistente responde 404 y no toca nada. | `apps/api/src/appointments.ts` (`appointments.at(-1)`) |
| BUG-11 | ✅ | *Mensaje de usuario:* "La agenda aparece desordenada: el de las 16 sale antes que el de las 9." | El listado va ordenado por fecha de inicio. | `apps/api/src/appointments.ts` (comparador del `sort` devuelve un booleano) |
| BUG-12 | ✅ | *Mensaje de usuario:* "Reservé un tratamiento capilar (45 min) a las 15:30 y el profesional ya tenía un cliente a las 16:00, se pisan los turnos." | Un servicio ocupa su duración real (45 min), no se redondea hacia abajo a bloques de 30. | `apps/api/src/availability.ts` (`Math.floor` de `slotsNeeded`) |

> Nota: BUG-07 y BUG-11 están en la misma función; con BUG-07 sin arreglar, el test de BUG-11 también falla (el listado sale vacío). Arreglá primero el 07.

## Web

| ID | Docs | Reporte para pegar | Qué debería pasar | Dónde |
|---|---|---|---|---|
| BUG-13 | ➖ | *Mensaje de usuario:* "Intenté reservar un horario que ya estaba ocupado, me tiró el error y después el botón se quedó en 'Reservando…' y no puedo volver a intentar sin recargar la página." | Tras un error el botón se vuelve a habilitar. | `apps/web/app/book/page.tsx` (`loading` no se resetea en el `catch`) |
| BUG-14 | ✅ | *Mensaje de usuario:* "En la página de servicios los precios aparecen re baratos: el corte figura $ 80 y en el local cuesta $ 8.000." | Mostrar el precio tal cual llega (pesos enteros). | `apps/web/lib/format.ts` (`pesos / 100`) |
| BUG-15 | ➖ | *Mensaje de usuario:* "Cancelo un turno en 'Mis turnos' y en pantalla desaparece otro distinto. Si recargo, está bien, pero da miedo." | Al cancelar desaparece el turno cancelado. | `apps/web/app/appointments/page.tsx` (índice de la lista ordenada usado sobre la lista sin ordenar; `key={i}`) |
| BUG-16 | ➖ | *Log del navegador:* `TypeError: Cannot read properties of undefined (reading 'map')` + `at AdminPage (apps/web/app/admin/page.tsx:22)` — *o:* "El reporte de abril rompe la pantalla en blanco." | Un mes sin turnos muestra 0 turnos y lista vacía. | Cruza capas: `apps/api/src/reports.ts` devuelve sin `byService` cuando no hay turnos (y la web asume que existe) |

## Para escalar (el agente NO debería inventar un fix)

| ID | Reporte para pegar | Por qué se escala |
|---|---|---|
| ESC-01 | "Sería genial que se pudieran reprogramar los turnos sin cancelar y volver a reservar." | Es una funcionalidad nueva, no un bug: requiere decisión de producto. |
| ESC-02 | "A veces la página tarda mucho en cargar, no sé cuándo ni en cuál." | Sin datos reproducibles ni evidencia en el código. |
| ESC-03 | "Quiero que el sistema mande un recordatorio por WhatsApp un día antes." | Requiere integración externa, credenciales y definiciones fuera del repo. |

## Cómo conectarlo al agente

1. Subí este repo a GitHub (privado) y creá un token fine-grained con permisos sobre este repo (Contents, Issues, Pull requests).
2. En Bugsmith → **Ajustes**: cargá el token y, en guardrails, poné este repo en `allowed_repos`.
3. **Agentes → Nuevo agente**: origen **Manual**; repo de código = este repo, `ref: main`, carpeta `apps/`; repo de docs = este repo, carpeta `docs/`.
4. **Analizar**: elegí el agente y pegá un reporte de las tablas de arriba.
5. Mirá el issue y el PR que abre. Para comparar, corré `npm test` antes y después.

## Cómo lo reiniciás

Después de probar, descartá los PR/ramas del agente (nunca mergees a `main` si querés conservar los bugs), o creá una rama `base` desde `main` y trabajá siempre contra esa.

## Resumen rápido

16 bugs reales (12 en la API y 4 en la web) y 3 casos para escalar. Docs ✅ en 12 bugs y ➖ en 4 (BUG-05, 13, 15 y 16), para poder medir cuánto ayuda la documentación.

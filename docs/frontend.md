# Pantallas

- **Servicios** (`/`): lista de servicios con duración y precio. Los precios llegan en pesos enteros y se muestran sin dividir ni multiplicar (`8000` → `$ 8.000`).
- **Reservar** (`/book`): formulario de reserva. Si la API devuelve un error (por ejemplo, horario ocupado), se muestra el mensaje.
- **Mis turnos** (`/appointments`): turnos vigentes ordenados por fecha. Al cancelar uno, desaparece **ese** turno de la lista, y no otro.
- **Reporte** (`/admin`): resumen mensual.

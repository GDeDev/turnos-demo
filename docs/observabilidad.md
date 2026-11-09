# Observabilidad

- Cada pedido recibe un identificador corto (`extras/request-id`) que se repite en los logs.
- Los logs usan el formato `[nivel] mensaje clave=valor` (`extras/logger`).
- `extras/rate-limiter` limita pedidos por clave en una ventana deslizante y `extras/metrics-counter` cuenta eventos en memoria.

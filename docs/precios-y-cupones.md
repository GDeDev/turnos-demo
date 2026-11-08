# Precios y cupones

- Todos los precios están en **pesos argentinos enteros** (no centavos). Un corte de pelo cuesta 8000, que se muestra como `$ 8.000`.
- Un cupón descuenta un **porcentaje** del precio del servicio. Los cupones vigentes:
  - `PRIMERA`: 15 % de descuento.
  - `AMIGOS`: 10 % de descuento.
- El total nunca puede ser negativo ni mayor al precio de lista. Un cupón inexistente se ignora (sin error).
- El total se redondea al peso entero más cercano.
- Los cupones no se acumulan: se aplica uno solo por turno.

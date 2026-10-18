# GYM TOOLZ

Aplicación web móvil (mobile-first) para **calcular rápidamente la carga total de una barra** en el gimnasio y **configurar el equipo disponible** en tu gimnasio (discos, barras y poleas). Olvídate de sumar discos de memoria: carga los discos de cada lado y la app te dice el peso total en KG o LBS.

Interfaz en español con estética de cómic (paneles con trazo grueso, "POW!", halftone).

## Objetivo

Evitar errores de cálculo al montar peso. La app refleja **el equipo real que tienes a mano**: si tu gimnasio solo tiene 4 discos de 25 kg o no tiene barra romana, lo configuras una vez y la calculadora solo te ofrece lo que realmente puedes cargar.

## Funciones

### Calculadora de carga (`/`)

- **Selector de equipo:** Barra, Mancuernas, Kettlebell y Poleas.
- **Selector de barra** (modo barra): elige entre las barras activas (olímpica, femenina, Z, romana, hexagonal o personalizadas).
- **Visualizador de manga:** dibujo de la barra con los discos cargados en un lado, con tamaños y colores proporcionales al peso, y detalle por lado (p. ej. `1x20k + 1x10k (30 KG)`).
- **Control de discos:** agrega o quita discos de 25, 20, 15, 10, 5 kg y fraccionales de 2.5, 1.25 y 0.5 kg. Los discos deshabilitados o sin stock no aparecen, y no puedes cargar más discos de los que tienes.
- **Carga total:** peso de la barra + discos (ambos lados) en grande, con la conversión a la otra unidad (`≈ 99.2 LBS`).
- **Cambio de unidad KG / LBS** al instante (los pesos se almacenan siempre en kg).
- **Limpiar** la manga con un toque.

### Configuración de equipo (`/discos`)

- **Discos:** activar/desactivar cada disco y definir el **stock** (pares disponibles) de los discos principales; activar/desactivar los fraccionales.
- **Calibración:** vista de pesos nominales vs. medidos de discos y barras.
- **Barras:** activar/desactivar las barras estándar y **crear barras personalizadas** (nombre y peso) o eliminarlas.
- **Poleas:** paso de la pila (5 / 4.5 / 2.5 kg) y relación de polea (1:1 o 2:1, mitad de peso).
- **Guardar y restablecer** la configuración a sus valores por defecto.
- **Selector de unidad** KG / LBS.

### Persistencia y consistencia

- Todo se guarda localmente en el navegador (`localStorage`, clave `gym-toolz:v1`); no hay backend ni cuenta.
- La sesión de carga se mantiene coherente con la configuración: si desactivas una barra o un disco, o reduces su stock, la carga actual se ajusta automáticamente.

### Próximamente (código preparado, aún oculto)

Registro de series ("Log set"), rutinas e historial.

## Stack

- [React 19](https://react.dev) + TypeScript
- [Vite](https://vite.dev)
- [React Router](https://reactrouter.com) para la navegación
- [Zustand](https://zustand.docs.pmnd.rs) (con middleware `persist`) para el estado
- [Tailwind CSS 4](https://tailwindcss.com)

## Estructura

```
src/
├── components/
│   ├── Land/      # Calculadora de carga
│   ├── Config/    # Configuración de discos, barras y poleas
│   ├── layout/    # Layout y navegación inferior
│   └── shared/    # Componentes reutilizables (Modal, Stepper, Toggle...)
├── store/         # Estado global (useGymStore) y selectores
└── lib/           # Utilidades (conversión de unidades, cx)
```

## Desarrollo

Requiere Node.js y [pnpm](https://pnpm.io).

```bash
pnpm install     # instalar dependencias
pnpm dev         # servidor de desarrollo
pnpm build       # type-check + build de producción
pnpm preview     # previsualizar el build
pnpm lint        # ESLint
```

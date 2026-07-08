# Venta de Seguros — Hub de herramientas

Hub interno para el equipo de ventas de seguros. Primera herramienta: **Calculadora de ingresos anual (FPL)**.

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo (http://localhost:5173)
npm run build     # type-check + build de producción
npm run preview   # servir el build
```

## Stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** (CSS-first: todo el tema vive en `src/index.css`, no hay `tailwind.config.js`)
- **shadcn/ui** (componentes en `src/components/ui/`)
- **motion** (sucesor de framer-motion — importar siempre desde `"motion/react"`, nunca instalar `framer-motion`)
- **lucide-react** para iconos
- **echarts** solo para el gauge FPL (aislado y lazy en `src/features/calculadora/components/FplGauge.tsx`)
- **Firebase v12**: Google Auth + Firestore (proyecto `venta-de-seguros-953c9`)

## Arquitectura

- `src/app/sections.ts` — **registro de herramientas del hub**. Para agregar una nueva sección al sidebar basta con añadir una entrada `{ id, label, icon, component }` a este array.
- `src/features/calculadora/` — la calculadora completa: reducer de sesión (`state.ts`), reglas del deducible (`deductible.ts`) y componentes.
- `src/lib/fpl.ts` — guías federales de pobreza (FPL). **Actualización anual**: cambiar `FPL_YEAR`, `FPL_BASE` y `FPL_PER_ADDITIONAL` con la publicación del HHS.
- `src/hooks/useCalculations.ts` — CRUD del historial en Firestore (`users/{uid}/calculations`), en vivo con `onSnapshot`.
- `src/context/AuthContext.tsx` + `src/components/auth/` — login con Google (popup); toda la app está detrás del `AuthGuard`.

## Reglas de negocio de la calculadora

- Ingreso anual = ingreso semanal × 52.
- **W-2**: sin deducibles (el campo ni se muestra). Neto = anual.
- **1099**: deducible obligatorio entre $4,000 y $8,000. Neto = anual − deducible.
  - $4,000–$5,999 → mensaje "persona SIN hogar fiscal".
  - $6,000–$8,000 → mensaje "si existiese un hogar fiscal".
- Se pueden agregar varios cotizantes (mezcla de contratos); el total del hogar es la suma de netos.
- % FPL = total ÷ umbral(tamaño del hogar) × 100, redondeado a 1 decimal. Umbral 2025: $15,650 + $5,500 por persona adicional (48 estados contiguos).

## Firestore — reglas de seguridad

⚠️ La base está en **modo prueba hasta el 2026-08-06** (abierta a cualquiera). Publicar cuanto antes el contenido de [`firestore.rules`](firestore.rules):

**Consola Firebase → Firestore Database → Reglas → pegar → Publicar.**

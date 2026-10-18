# GYM TOOLZ

A mobile-first web app to **quickly calculate the total load on a barbell** at the gym and **configure the equipment available** in your gym (plates, bars and cables). Stop adding up plates in your head: load the plates on each side and the app tells you the total weight in KG or LBS.

The interface is in Spanish, with a comic-book look (thick-outlined panels, "POW!", halftone).

## Goal

Avoid math mistakes when loading weight. The app reflects **the real equipment you have on hand**: if your gym only has 4 plates of 25 kg or no triceps bar, you set it up once and the calculator only offers what you can actually load.

## Features

### Load calculator (`/`)

- **Equipment selector:** Barbell, Dumbbells, Kettlebell and Cables.
- **Bar selector** (barbell mode): choose among the active bars (Olympic, women's, Z-curl, triceps, trap bar or custom ones).
- **Sleeve visualizer:** a drawing of the bar with the plates loaded on one side, with sizes and colors proportional to the weight, plus a per-side breakdown (e.g. `1x20k + 1x10k (30 KG)`).
- **Plate controls:** add or remove plates of 25, 20, 15, 10, 5 kg and fractional plates of 2.5, 1.25 and 0.5 kg. Disabled or out-of-stock plates are hidden, and you can't load more plates than you own.
- **Total load:** bar weight + plates (both sides) displayed large, with the conversion to the other unit (`≈ 99.2 LBS`).
- **KG / LBS switch** on the fly (weights are always stored in kg).
- **Clear** the sleeve with one tap.

### Equipment settings (`/discos`)

- **Plates:** enable/disable each plate and set the **stock** (pairs available) of the main plates; enable/disable fractional plates.
- **Calibration:** view of nominal vs. measured weights for plates and bars.
- **Bars:** enable/disable the standard bars and **create custom bars** (name and weight) or delete them.
- **Cables:** stack step (5 / 4.5 / 2.5 kg) and pulley ratio (1:1 or 2:1, half weight).
- **Save and reset** the settings to their defaults.
- **KG / LBS** unit selector.

### Persistence and consistency

- Everything is stored locally in the browser (`localStorage`, key `gym-toolz:v1`); there is no backend or account.
- The current load stays consistent with the settings: if you disable a bar or a plate, or reduce its stock, the current load adjusts automatically.

### Coming soon (code in place, still hidden)

Set logging ("Log set"), routines and history.

## Stack

- [React 19](https://react.dev) + TypeScript
- [Vite](https://vite.dev)
- [React Router](https://reactrouter.com) for navigation
- [Zustand](https://zustand.docs.pmnd.rs) (with the `persist` middleware) for state
- [Tailwind CSS 4](https://tailwindcss.com)

## Structure

```
src/
├── components/
│   ├── Land/      # Load calculator
│   ├── Config/    # Plate, bar and cable settings
│   ├── layout/    # Layout and bottom navigation
│   └── shared/    # Reusable components (Modal, Stepper, Toggle...)
├── store/         # Global state (useGymStore) and selectors
└── lib/           # Utilities (unit conversion, cx)
```

## Development

Requires Node.js and [pnpm](https://pnpm.io).

```bash
pnpm install     # install dependencies
pnpm dev         # development server
pnpm build       # type-check + production build
pnpm preview     # preview the build
pnpm lint        # ESLint
```

---
name: html-to-react
description: Converts an HTML file from src/raw-assets into a tree of React + TypeScript components with styles translated to Tailwind CSS, reusing existing components from src/components/shared. Use when the user asks to convert, migrate, or "componentize" an HTML file from raw-assets into React/Tailwind.
argument-hint: <html-file-name>
---

# html-to-react

Converts `src/raw-assets/<name>.html` into React (TSX) components styled with Tailwind.

Argument: file name (with or without `.html`). If none is given, list `src/raw-assets/*.html` and ask which one to convert.

## Paths (relative to the project root, where `package.json` lives)

| What | Where |
|---|---|
| Source HTML | `src/raw-assets/<name>.html` |
| Page folder | `src/components/<Name>/` |
| Main container | `src/components/<Name>/<Name>.tsx` (export `<Name>`) |
| Page-specific subcomponents | `src/components/<Name>/components/*.tsx` |
| Reusable components | `src/components/shared/*.tsx` |

`<Name>` = the HTML file name in PascalCase (`land.html` → `Land`, `user-config.html` → `UserConfig`).

## Procedure

### 1. Preparation
1. Read the whole HTML file. If it doesn't exist, say so and list the available ones.
2. Inventory `src/components/shared/` (and the other page folders): read every existing component (props, markup, classes). Do this **before** designing anything.
3. Check Tailwind: look for `tailwindcss` in `package.json` and `@import "tailwindcss"` (v4) or `@tailwind` (v3) in the CSS. If missing, **do not install it without telling the user**: report it and ask whether to install (`pnpm add -D tailwindcss @tailwindcss/vite` + plugin in `vite.config.ts` + `@import "tailwindcss";` in `src/index.css`). If the project uses v3, follow the existing config.
4. Extract the styles from the HTML: `<style>`, `style=""` attributes, `<link>` to local CSS, CSS classes. Build a selector → declarations map.

### 2. Decomposition
Split the DOM into components by **semantic blocks** (`header`, `nav`, `section`, `footer`, cards, forms, repeated item lists…):
- One component per block with its own identity. Don't create components for a lone `<div>` or `<span>` with no logic.
- Repeated elements (cards, list items, rows) → one component + a typed data array and `.map()` in the parent, with `key`.
- Variable text/images/links become **typed props**; the original HTML texts become the data/default values in the container.

### 3. Shared vs. local decision
For each candidate component:

1. **Search first**: does `shared/` (or another page) already contain something with the same structure and purpose? Compare by markup and function, not by name.
   - Match → **import and use it**. If it differs only in content or minor variants, add optional props to the existing one (without breaking its current usages).
   - Match in another page folder (not shared) → move it to `shared/`, update that page's imports, and use it.
2. If it doesn't exist, it is **generic** when it meets at least one of:
   - it appears 2+ times in the HTML (or in the HTML and another page) with the same pattern,
   - it is a UI primitive (Button, Input, Card, Badge, Modal, Avatar, Icon, SectionTitle, Container…),
   - it doesn't depend on page-specific content and can be parameterized with props.
   → create it in `src/components/shared/`.
3. Otherwise it is page-specific → `src/components/<Name>/components/`.

A local component **never** imports from another page's folder; only from `shared/` or its local siblings.

### 4. HTML → JSX conversion
- `class` → `className`, `for` → `htmlFor`, `tabindex` → `tabIndex`, event attributes to camelCase, close void tags (`<img />`, `<br />`, `<input />`).
- `style="a:b"` → Tailwind classes; if there's no exact equivalent, use an arbitrary value (`w-[437px]`, `bg-[#1a2b3c]`, `grid-cols-[1fr_2fr]`). Avoid `style={{}}` except for dynamic values.
- HTML comments → `{/* */}` or drop them if they're noise.
- Inline SVG: convert to JSX (`stroke-width` → `strokeWidth`, etc.); if it repeats, extract an icon component into `shared/`.
- `<script>`: don't copy it verbatim. Translate the logic into hooks/state (`useState`, handlers) or, if it's complex/ambiguous, leave it out and report it.
- Referenced images/fonts: if they point to local files, import them from `src/assets` or `public/` and warn if they don't exist.
- Preserve DOM order, text, and semantics (tags, `alt`, `aria-*`).

### 5. CSS → Tailwind
**The design system is the law.** Tokens live in `src/styles/theme.css` (`@theme`), base rules in `src/styles/base.css`, comic utilities in `src/styles/utilities.css`. Read them first. Rules:
- Never hardcode hex colors, px font sizes, or `shadow-[Npx_Npx_0px_#...]`. Map them to tokens: colors → `bg-primary-container`, `text-on-surface`, `bg-plate-25`…; type → `font-headline-sm text-headline-sm` (size, line-height, tracking and weight come with the token); spacing → `px-margin`, `gap-space-sm`; radius → `rounded-xl`, `rounded-full`.
- Ink outline + hard shadow combos (`outline/border: 2px solid #1a1b24` + `shadow-[3px_3px_0px_#1a1b24]`) → `comic-panel` / `comic-card` / `comic-chip` / `comic-modal`, or `comic-stroke*` + `shadow-comic-xs|sm|md|lg|xl`. Snap off-scale values to the nearest step (1.5→2px shadow, 2.5→3px). Pressed buttons → `comic-press`. Halftone dots → `halftone`; star shape → `comic-burst`; bar texture → `knurl`; safe areas → `pt-safe`/`pb-safe`.
- Use `#1a1b24` = `ink` (the HTML also had `#12131C`; treat both as `ink`).
- If a value has no token, **add it to `theme.css`/`utilities.css`** (and reuse it) instead of an arbitrary value in the component. Arbitrary values are only for truly one-off geometry (e.g. a plate's pixel height driven by data).
- Map each remaining declaration to the closest utility, using Tailwind's scale when the value matches (`16px` → `p-4`, `600` → `font-semibold`) and arbitrary values when it doesn't.
- Cover: layout (flex/grid/gap/position), spacing, typography, colors, borders, radii, shadows, opacity, transitions, z-index, overflow, cursor.
- `:hover`, `:focus`, `:active`, `::before/::after` → variants (`hover:`, `focus:`, `before:`). Media queries → `sm: md: lg:` using the closest breakpoint (mobile-first: base styles without a prefix).
- CSS variables (`:root { --x }`) → tokens in `@theme` (v4) / `theme.extend` (v3), or arbitrary values if one-off. Keyframes/animations → `@theme`/`@keyframes` in the global CSS.
- Rules that can't be expressed with utilities (e.g. complex selectors) → keep them in the global CSS and report them.
- Long class lists: order them layout → box → typography → color → effects; don't use `@apply` unless the project already does.

### 6. TypeScript
- Every component: explicit `interface <Name>Props` (no `any`), named export function, one component per file, file name = component name (PascalCase).
- Optional props with sensible defaults; `children?: React.ReactNode` if the component wraps content; extend `React.ComponentProps<'button'>` etc. in primitives to forward native attributes.
- Type data arrays with their own interfaces.
- Don't `import React` unless the tsconfig requires it.

### 7. Container
`<Name>.tsx` only composes: it imports local and `shared/` subcomponents, defines the data, and passes it via props. No styles of its own beyond the root wrapper.

### 8. Verification
1. Run `pnpm exec tsc -p tsconfig.app.json --noEmit` (or `pnpm build`) and `pnpm lint`; fix errors.
2. Check that no `class=`, `style=`, or unclosed tags remain.
3. Don't modify the original HTML or `App.tsx` unless the user asks (do offer to mount `<Name />` in `App.tsx`).

### 9. Final report (brief)
- Tree of created files.
- Components **reused** from `shared/`, **new** in `shared/` (with the reason), and **moved**.
- Styles that couldn't be translated, omitted scripts, missing assets, and whether Tailwind was installed/configured.

# v3.11.0 — Framework Wing Completion Design

**Goal:** Complete the Framework Specialist role file by adding the 3 missing standard sections, upgrade the smoke fixture to meaningful coverage, add 4 evals covering the 3 missing frameworks and a chain workflow, and bump to v3.11.0.

**Architecture:** Polish-only release — no new commands, no new roles, no routing changes. All changes are within `framework-specialist.md`, `evals/fixtures/design-framework-output.md`, `evals/evals.json`, `scripts/behavioral-smoke.sh`, and version files.

**Tech Stack:** Markdown (role file), JSON (evals), Bash (smoke script), standard 8-file version bump set.

---

## Task 1: Complete `framework-specialist.md` — 3 missing sections

**File:** `skills/design/references/framework-specialist.md`

Append three sections between `## QA Checklist` and `## Reference-Sourced Insights`.

### `## Handoffs`

Framework Specialist hands off to:
- **Design System Lead** — before conversion, if the source HTML has undocumented color tokens or spacing values. Design System Lead extracts and names them before the Specialist maps them to framework equivalents.
- **Frontend Developer** — after conversion, delivers `.tsx` / `.vue` / `.svelte` / `.astro` files with a setup note (packages to install, config additions). Frontend Developer handles integration into the project scaffold.
- **Design Manager** — reports which framework was resolved so subsequent commands in the same session (`/design-review`, `/design-handoff`) can use framework-aware output format.

### `## Advanced Patterns`

**Compound component pattern (Radix-style)**
Components that share state without prop drilling. Use `React.createContext` + a parent component that provides context, with sub-components (`Card.Header`, `Card.Body`, `Card.Footer`) consuming it via `useContext`. In Vue, use `provide`/`inject`. In Svelte 5, use a `$state` rune in a shared module.

**Polymorphic `as` prop**
Allows callers to change the rendered element without changing the component:
```tsx
interface ButtonProps<T extends React.ElementType = 'button'> {
  as?: T
  children: React.ReactNode
}
export function Button<T extends React.ElementType = 'button'>({
  as,
  children,
  ...props
}: ButtonProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const Component = as ?? 'button'
  return <Component {...props}>{children}</Component>
}
```
Use when a design element should render as `<a>`, `<button>`, or `<div>` depending on context.

**Compound variants with `cva`**
For components with multiple independent variant axes (e.g., `intent` × `size` × `disabled`), use `cva` (class-variance-authority) to declare all combinations declaratively instead of nested conditionals:
```tsx
const button = cva('base-classes', {
  variants: {
    intent: { primary: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  compoundVariants: [
    { intent: 'primary', size: 'lg', class: 'extra-large-primary' },
  ],
  defaultVariants: { intent: 'primary', size: 'md' },
})
```

**Server/Client component boundary strategy (Next.js App Router)**
Default to Server Components. Move to Client Component only when you need:
- `useState`, `useEffect`, `useReducer`
- Browser-only APIs (`window`, `localStorage`)
- Event listeners (`onClick`, `onChange`)
Mark the boundary as low as possible in the tree — a page can be a Server Component with a single Client Component island for interactive parts.

**Island hydration strategy (Astro)**
Static structure goes in `.astro`. Interactive elements become React/Svelte/Vue components with `client:` directive:
- `client:load` — hydrate immediately on page load (use for above-the-fold interactive UI)
- `client:idle` — hydrate when browser is idle (use for secondary interactive elements)
- `client:visible` — hydrate when component enters viewport (use for below-the-fold, saves JS)
Default to `client:visible` unless immediate interaction is required.

**Svelte 5 rune migration path**
Svelte 5 replaces the `$:` reactive syntax with explicit runes. Key migration pairs:
- `let count = 0` + `$: doubled = count * 2` → `let count = $state(0)` + `let doubled = $derived(count * 2)`
- `export let name` → `let { name } = $props()`
- `createEventDispatcher` → `let { onclick } = $props()` (events become props)
- `<slot />` → `{@render children?.()}`

### `## Full Coverage`

**React + Tailwind — SaaS dashboard page**
Input: HTML dashboard with sidebar nav, header with user menu, main area with stat cards and a data table.
Output: `DashboardLayout.tsx` (Server Component), `Sidebar.tsx` (Server), `UserMenu.tsx` (Client — dropdown state), `StatCard.tsx` (Server), `DataTable.tsx` (Client — sort/filter state).
Watch for: Don't make the entire layout a Client Component because one dropdown needs state. Isolate the interactive island.

**Vue 3 + UnoCSS — e-commerce product card**
Input: HTML product card with image, title, price, color swatches, add-to-cart button.
Output: `ProductCard.vue` with `<script setup lang="ts">`, typed `defineProps`, `defineEmits` for cart event, `ref` for selected color state. UnoCSS utility classes replace inline styles.
Watch for: `defineEmits` type must match the parent's `@add-to-cart` handler signature. Don't use Options API.

**Svelte 5 — interactive form**
Input: HTML multi-step form with validation state and error messages.
Output: `MultiStepForm.svelte` using `$state` for step and field values, `$derived` for validation errors, `$effect` for side effects (localStorage save). Use `{@render}` for step slot content.
Watch for: `$effect` runs after every reactive update — scope it tightly. Don't use `onMount` (Svelte 4 pattern).

**Next.js App Router — page with static header + client data table**
Input: HTML analytics page with a static page header and a filterable/sortable data table.
Output: `page.tsx` (Server Component, no `'use client'`) + `DataTable.tsx` (Client Component with `'use client'`, `useState` for filters). `metadata` export on the page.
Watch for: The `metadata` export is only valid in Server Components. The Client Component cannot export `metadata`.

**Astro — marketing landing with React island CTA**
Input: HTML landing page with hero, features grid, pricing section, and an interactive pricing toggle (monthly/annual).
Output: `LandingPage.astro` (static hero + features + pricing layout) + `PricingToggle.tsx` (React island with `client:visible`). Astro props typed with `interface Props`.
Watch for: Astro components don't support client-side state — the toggle must be a React/Svelte/Vue island. Pass initial data as props from the `.astro` parent to the island.

---

## Task 2: Upgrade smoke fixture

**File:** `evals/fixtures/design-framework-output.md`

Replace existing content (thin, only covers file list) with a richer React + Tailwind output that naturally contains all 6 required keywords: `component`, `tsx`, `props`, `tailwind`, `interface`, `cn`.

The fixture should contain:
- A TypeScript `interface` declaration for component props
- A component function using `cn()` for conditional Tailwind classes
- At least one Tailwind utility class applied
- `## Files to Create`, `## Setup`, `## Usage` sections (3 `##` headers minimum)
- At least 300 characters total

**Updated smoke line in `scripts/behavioral-smoke.sh`:**
```bash
check_fixture "design-framework-output.md" "component,tsx,props,tailwind,interface,cn"  3  300
```

---

## Task 3: Add evals 80–83

**File:** `evals/evals.json`

Append 4 new eval objects. All assertions use object format `{"name": "kebab-name", "description": "prose"}`.

**Eval 80 — design-framework-vue**
- Prompt: `/design-framework vue — Convert this Lumina SaaS product card HTML to a Vue 3 SFC with typed props and UnoCSS`
- Assertions (5): output contains `.vue` file, uses `<script setup lang="ts">`, uses `defineProps`, applies UnoCSS utility classes, typed emit for user interaction event

**Eval 81 — design-framework-svelte**
- Prompt: `/design-framework svelte — Convert this Lumina SaaS form component to Svelte 5 using rune syntax`
- Assertions (5): output contains `.svelte` file, uses `$props()` rune, uses `$state()` rune, no legacy `export let` syntax, includes setup notes

**Eval 82 — design-framework-astro**
- Prompt: `/design-framework astro — Convert this Lumina SaaS marketing hero section to an Astro component with a React island for the CTA button`
- Assertions (5): output contains `.astro` file, static hero structure in Astro component, React island component present, `client:visible` directive used, `interface Props` typed

**Eval 83 — design-to-framework-chain**
- Prompt: `/design a SaaS pricing page for Lumina with 3 tiers and monthly/annual toggle — then convert it to React + Tailwind components using /design-framework react-tailwind`
- Assertions (5): HTML design output is produced first, output contains `.tsx` files, TypeScript interfaces defined for props, Tailwind classes present, setup instructions include npm install command

---

## Task 4: Version bump to 3.11.0

**Files to update** (same 8-file pattern as all prior releases):

| File | Change |
|------|--------|
| `.claude-plugin/plugin.json` | version `3.10.0` → `3.11.0`; no role/command count changes |
| `.claude-plugin/marketplace.json` | version `3.10.0` → `3.11.0` |
| `meta/stats.json` | `{"version":"3.11.0","roles":23,"commands":42,"knowledge_lines":11820,"reference_files":29}` |
| `CHANGELOG.md` | prepend `## [3.11.0] — 2026-03-16` entry |
| `README.md` | no badge changes; update any inline version references |
| `docs/plugin-directory-submission.md` | version → 3.11.0 |
| `MCP-SETUP.md` | version → 3.11.0 if present |
| `CONTRIBUTING.md` | version → 3.11.0 if present |

**No changes** to: role count (23), command count (42), SKILL.md routing.

---

## Constraints & Conventions

- Role file sections append in order: `## Handoffs` → `## Advanced Patterns` → `## Full Coverage` → `## Reference-Sourced Insights` → trailing `---`
- Eval assertion arrays have exactly 5 items, each an object `{"name": "kebab-case", "description": "prose sentence"}`
- Smoke script `check_fixture` args: `"filename" "keyword1,keyword2,..."  min_headers  min_chars` — keywords are comma-separated, no spaces
- All files end with `---` followed by a newline (plugin convention for role files)
- Commit each task separately with descriptive message

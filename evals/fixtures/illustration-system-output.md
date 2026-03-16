# /illustration-system — Lumina SaaS Illustration System

**Inputs:** Brand "Lumina SaaS", style directive "geometric minimal 2D flat", icon set "custom", palette "Indigo + Slate"

---

## Illustration Style

The Lumina illustration style is **geometric, minimal, and 2D flat**. No photorealism, no isometric 3D, no gradients within shapes. The style is a direct expression of the brand's clarity value: simple forms, purposeful detail, zero decoration for decoration's sake.

### Style Principles

| Principle | Definition |
|-----------|-----------|
| Geometric | Shapes derive from circles, rectangles, and triangles. Organic or hand-drawn forms are avoided. |
| Minimal | Every element in an illustration earns its place. If it can be removed without losing meaning, remove it. |
| 2D flat | No drop shadows on illustrated objects, no gradients within fills, no perspective distortion. |
| Brand-aligned | Illustration color pulls exclusively from the Lumina brand palette. No custom off-palette colors. |
| Consistent | Style is identical across all illustration types — hero, spot, and icon. |

### Style Reference Comparisons

- **Like:** Intercom, Linear, Vercel illustration styles — clean, geometric, purposeful
- **Not like:** Undraw (too generic), Humaaans (too humanoid/organic), Lottie packs (too decorative)

All illustration files are delivered as SVG. No raster formats for illustrations.

---

## Icon Grid & Sizing

All Lumina icons are drawn on a precise grid to ensure optical consistency across the full set.

### Base Grid (24×24px)

```
┌────────────────────────────┐
│  2px padding (inset)       │
│  ┌──────────────────────┐  │
│  │  20×20 live area     │  │
│  │                      │  │
│  │   8×8 sub-grid       │  │
│  │   (2.5px cells)      │  │
│  │                      │  │
│  └──────────────────────┘  │
│                            │
└────────────────────────────┘
  24×24px total canvas
```

### Size Variants

| Size | Canvas | Padding | Live Area | Usage |
|------|--------|---------|-----------|-------|
| 16px | 16×16 | 1px | 14×14 | Dense tables, breadcrumbs, inline |
| 24px | 24×24 | 2px | 20×20 | Default UI — buttons, nav, labels |
| 32px | 32×32 | 2px | 28×28 | Feature cards, empty states (small) |

### Grid Rules

- Align all anchor points to the sub-grid. No off-grid coordinates.
- Optical corrections are permitted for circular forms (circles may extend 0.5px beyond grid center).
- Icon weight scales proportionally: 1.5px at 24px, 1px at 16px, 2px at 32px.

---

## Stroke & Fill Rules

Lumina icons come in two sets: **line icons** and **solid icons**. The sets are never mixed within a single UI context.

### Line Icon Rules

| Property | Value |
|----------|-------|
| Stroke weight | 1.5px at 24px (scales with icon size) |
| Line cap | Round |
| Line join | Round |
| Fill | None (transparent) |
| Color | `currentColor` — inherits from parent text color |

### Solid Icon Rules

| Property | Value |
|----------|-------|
| Fill | Solid — single color fill per icon |
| Stroke | None |
| Color | `currentColor` or explicit brand token |

### Mixed Use Policy

- **Product UI:** Use line icons exclusively. Solid icons are reserved for status indicators (success checkmark, error X) and notification badges.
- **Marketing:** Solid icons may be used in feature grid callouts, sized at 32px.
- **Never mix line and solid icons** in the same component or layout section.

---

## Color Usage

Illustration and icon color follows strict rules to maintain brand consistency and accessibility.

### Icons

- All line icons use `currentColor` — they inherit the text color of their context automatically.
- Never hardcode a hex value in an icon SVG that will be used in UI.
- For icons used as standalone decorative elements, use `--color-primary` or `--color-text-secondary`.

### Illustrations

- **Maximum 3 colors** per illustration, drawn from the brand palette.
- **Primary shape color:** `--color-primary` (`#4F46E5`) or `--color-primary-light` (`#818CF8`)
- **Secondary shape color:** `--color-surface-overlay` (`#F1F5F9`) or Slate-200 (`#E2E8F0`)
- **Accent (use sparingly):** `--color-success` (`#10B981`) for positive/growth-related illustrations only
- **Backgrounds in illustrations:** Always use `--color-surface-*` tokens. No hardcoded background colors.
- **Off-limits:** No gradients, no photographic textures, no color outside the brand palette.

### Accessibility

All illustrations that convey meaning must include a descriptive `aria-label` or be accompanied by a visible text description. Purely decorative illustrations use `aria-hidden="true"`.

---

## Illustration Types

The Lumina illustration system defines three distinct types, each with a specific canvas, usage context, and complexity level.

### Type 1: Hero Illustrations (480×320px)

- **Purpose:** Empty states, onboarding screens, error pages, feature introduction slides
- **Canvas:** 480×320px
- **Padding:** 24px on all sides (432×272px active area)
- **Composition:** Primary subject centered in the top 60% of the canvas. Supporting elements in the lower 40%.
- **Complexity:** Medium — 6–12 distinct shapes. Enough detail to be interesting; minimal enough to load fast.
- **Examples:** "No data yet" empty state, "Welcome to Lumina" onboarding, "500 error" page

### Type 2: Spot Illustrations (80×80px)

- **Purpose:** Feature callout cards, tooltip illustrations, marketing feature grid
- **Canvas:** 80×80px
- **Padding:** 8px on all sides
- **Composition:** Single focused concept. One primary shape, one or two supporting elements.
- **Complexity:** Low — 3–5 shapes. Must be legible at 80px.
- **Examples:** "Real-time sync" feature icon, "One-click sharing" callout, "Automated alerts" badge

### Type 3: Icons (24px — see Icon Grid section)

- **Purpose:** UI actions, navigation, status, and labels
- **Canvas:** 24×24px (see Icon Grid section)
- **Complexity:** Minimal — single concept, single path group
- **Count:** Lumina icon set contains 96 icons across 8 categories

### Illustration Categories by Canvas

| Type | Canvas | Count | File Location |
|------|--------|-------|--------------|
| Hero | 480×320px | 12 | `illustrations/hero/` |
| Spot | 80×80px | 24 | `illustrations/spot/` |
| Icons (line) | 24×24px | 96 | `icons/line/` |
| Icons (solid) | 24×24px | 96 | `icons/solid/` |

---

## Grid System

All hero illustrations follow a strict grid to ensure compositional consistency when illustrations are displayed side by side or in a gallery.

### Hero Grid (480×320px)

```
┌────────────────────────────────────────────────────────────┐
│ 24px padding                                               │
│ ┌──────────────────────────────────────────────────────┐   │
│ │                                                      │   │
│ │   Subject zone (top 60% = 432×163px)                 │   │
│ │   Primary illustration subject lives here            │   │
│ │                                                      │   │
│ ├──────────────────────────────────────────────────────┤   │
│ │                                                      │   │
│ │   Supporting zone (bottom 40% = 432×109px)           │   │
│ │   Ground line, secondary elements, or empty          │   │
│ │                                                      │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                            │
└────────────────────────────────────────────────────────────┘
  480×320px total canvas, 24px padding, 432×272px live area
```

### Spot Grid (80×80px)

- 8px padding inset on all sides → 64×64px live area
- Single subject, centered vertically and horizontally
- No supporting elements that break the 64×64 boundary

### Grid Compliance

All illustration files are delivered with grid guides embedded as Figma components. The grid layer is locked and named `_grid` (prefix underscore = non-exportable). Export always excludes the grid layer.

---

## Delivered Files

- `icons/line/` — 96 SVG line icons (24px)
- `icons/solid/` — 96 SVG solid icons (24px)
- `illustrations/hero/` — 12 SVG hero illustrations (480×320px)
- `illustrations/spot/` — 24 SVG spot illustrations (80×80px)
- `illustration-system.figma` — Figma component library with all assets
- `icon-usage-guide.pdf` — Quick reference for engineers and designers

---

## What's Next

- `/brand-kit` — ensure illustration palette aligns with brand color tokens
- `/design-system` — integrate icon set into component library as `<Icon>` component
- `/motion-design` — add micro-interaction specs for icon animations

---

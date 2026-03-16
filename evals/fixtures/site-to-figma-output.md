# /site-to-figma — Lumina SaaS Homepage Capture

**Inputs:** URL `lumina.io`, viewport `1440px`, purpose "redesign reference", pages "homepage only"

---

## Capture Overview

This capture documents the Lumina SaaS marketing homepage (`lumina.io`) at 1440px viewport width, imported into Figma as a structured reference for the upcoming homepage redesign.

**Capture summary:**

| Property | Value |
|----------|-------|
| URL | `https://lumina.io` |
| Viewport | 1440×900px |
| Capture date | 2026-03-16 |
| Sections captured | Hero, Features, Pricing teaser, Social proof, Footer |
| Total Figma frames | 5 section frames + 1 full-page frame |
| Figma pages created | 3 (Captured, Tokens, Components) |

**Purpose:** The captured file is a faithful, pixel-accurate reference of the current site. It is not a redesign — no creative changes have been made. It exists to give the design team a structured, annotated starting point.

---

## Layer Structure

The Figma file is organized to mirror the DOM structure of the page. All layers are semantically named — no "Group 47" or "Rectangle 12" layer names.

### Page: "Captured" — Layer Hierarchy

```
Page / lumina.io Homepage (1440px)
├── Full Page Frame (1440×4200)
│   ├── NavBar
│   │   ├── Logo
│   │   ├── Nav Links Group
│   │   └── CTA Button
│   ├── Section / Hero (1440×760)
│   │   ├── Background
│   │   ├── Content
│   │   │   ├── Headline Text
│   │   │   ├── Subheadline Text
│   │   │   ├── CTA Button Group
│   │   │   └── Social Proof Bar
│   │   └── Hero Illustration
│   ├── Section / Features (1440×680)
│   │   ├── Background
│   │   ├── Section Heading
│   │   └── Feature Cards Grid
│   │       ├── FeatureCard / Real-time Sync
│   │       ├── FeatureCard / Cohort Analysis
│   │       ├── FeatureCard / Automated Insights
│   │       └── FeatureCard / Slack Integration
│   ├── Section / Pricing (1440×520)
│   │   ├── Background
│   │   ├── Section Heading
│   │   └── Pricing Cards Row
│   │       ├── PricingCard / Starter
│   │       ├── PricingCard / Growth (highlighted)
│   │       └── PricingCard / Enterprise
│   ├── Section / SocialProof (1440×440)
│   │   ├── Background
│   │   ├── Stats Row
│   │   └── Testimonials Grid
│   │       ├── TestimonialCard / 1
│   │       ├── TestimonialCard / 2
│   │       └── TestimonialCard / 3
│   └── Section / Footer (1440×300)
│       ├── Background
│       ├── Footer Columns Group
│       │   ├── FooterColumn / Product
│       │   ├── FooterColumn / Company
│       │   ├── FooterColumn / Resources
│       │   └── FooterColumn / Social
│       └── Legal Bar
```

### Layer Naming Conventions

- Section frames: `Section / [Name]`
- Reusable elements: `ComponentName / Variant` (e.g., `FeatureCard / Cohort Analysis`)
- Background fills: `Background` (always at the bottom of the section layer stack)
- Text layers: Named by content role, not content text (e.g., `Headline Text`, not `See what's really driving`)

---

## Component Extraction

12 reusable components were identified during capture and extracted into the "Components" Figma page. Each has been cleaned of site-specific content and converted to a Figma component with properly named layers.

| # | Component Name | Instances Found | Notes |
|---|---------------|----------------|-------|
| 1 | NavBar | 1 | Sticky; includes logo, 5 nav links, 1 CTA |
| 2 | PrimaryButton | 7 | 40px height, 8px radius, Indigo fill |
| 3 | SecondaryButton | 3 | 40px height, 8px radius, outlined |
| 4 | FeatureCard | 4 | Icon + heading + body, card shadow |
| 5 | PricingCard | 3 | Includes highlighted variant (Growth tier) |
| 6 | TestimonialCard | 3 | Avatar + quote + name/company |
| 7 | StatBadge | 4 | Large number + label, used in social proof section |
| 8 | SectionHeading | 5 | Centered headline + optional subheadline |
| 9 | FooterColumn | 4 | Heading + 4–6 link list |
| 10 | SocialIcon | 4 | Twitter/X, LinkedIn, GitHub, YouTube |
| 11 | Logo | 3 | Wordmark variant (nav, footer, og image) |
| 12 | Badge | 6 | Small label pill — "New", "Popular", tier labels |

### Component Notes

- **PrimaryButton** and **SecondaryButton** are the same base component with a `variant` property — consolidated during extraction.
- **SectionHeading** appears in 5 places with consistent structure; extracted as a single component with optional subheadline slot.
- **FeatureCard** uses an icon from the Lumina icon set (24px line icons). Icons are linked to the illustration system library.

---

## Token Discovery

Design tokens extracted from the live site via computed styles. These values are the ground truth of what is currently in production.

### Colors Extracted (6 unique values)

| Token Name (assigned) | Hex | Observed Usage |
|----------------------|-----|----------------|
| `--color-primary` | `#4F46E5` | CTA buttons, active nav link, pricing card highlight |
| `--color-primary-dark` | `#3730A3` | Button hover state |
| `--color-surface` | `#F8FAFC` | Page background |
| `--color-surface-raised` | `#FFFFFF` | Cards, nav, footer |
| `--color-text-primary` | `#0F172A` | All body + heading text |
| `--color-text-secondary` | `#64748B` | Captions, footer links, placeholder text |

These 6 colors match the Lumina brand kit exactly. No off-palette colors detected on the homepage.

### Spacing Values (8px grid confirmed)

| Step | Value | Usage |
|------|-------|-------|
| 1 | 8px | Icon-to-text gap, fine internal spacing |
| 2 | 16px | Internal card padding (small), list item gaps |
| 3 | 24px | Card padding, gap between cards in a grid |
| 4 | 32px | Section heading margin-bottom |
| 5 | 48px | Between major content groups within a section |
| 6 | 64px | Between component rows |
| 7 | 80px | Section vertical padding (top + bottom) |
| 8 | 96px | Extra-large section padding (Hero) |

### Border Radius Values

| Value | Usage |
|-------|-------|
| 4px | Badge pill, input fields |
| 8px | Buttons, small cards |
| 16px | Large cards (FeatureCard, PricingCard, TestimonialCard) |

---

## Spacing Analysis

The Lumina homepage uses a consistent 8px spacing grid throughout. This was confirmed by measuring 40+ element gaps in the captured layout.

### Vertical Rhythm

- **Section padding:** 80px top + 80px bottom on all sections except Hero (96px)
- **Section heading → first content item:** 32px
- **Between content items (same group):** 24px
- **Between content groups within a section:** 48px

### Grid System

- **Max content width:** 1200px (centered in 1440px viewport, 120px auto margins)
- **Column system:** 12 columns
- **Column gutter:** 24px
- **Column width (at 1200px):** ~76px per column (including gutters)

### Card Layout (FeatureCard grid)

- **Layout:** 4-column at 1440px (each card: 3/12 columns)
- **Card width:** 264px
- **Card padding:** 24px internal
- **Card gap:** 24px between cards
- **Card border:** 1px solid `#E2E8F0`
- **Card shadow:** `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`

---

## Import Notes

The Figma import is organized across 3 pages for clean separation of concerns.

### Page 1: "Captured"

Pixel-accurate representation of the current live site at 1440px. Do not edit this page — it is the reference truth. All layers are locked by default.

### Page 2: "Tokens"

All extracted design token values organized as:
- Color swatches with token names and hex values
- Spacing scale with visual reference bars
- Border radius samples
- Typography samples at all observed sizes

This page feeds directly into the Figma variable library setup.

### Page 3: "Components"

All 12 extracted components as clean Figma components with:
- Properly named layers (no "Group" or "Rectangle" names)
- Component properties set up (variant, boolean, text overrides)
- Auto layout applied where the original uses flexbox/grid
- Linked to the Figma illustration system library (icons)

### Known Limitations

1. **Animations not captured:** Scroll-triggered animations (Hero section entry, feature card reveals) are not represented in the static capture.
2. **Mobile viewport:** Only 1440px captured. Mobile (375px) and tablet (768px) need a separate capture pass.
3. **Hover states:** Button hover states were manually noted in component annotations but not captured as screenshots.
4. **Dynamic content:** The testimonial section rotates — only the first visible state is captured.

---

## Delivered Files

- `lumina-site-capture.figma` — Figma file with 3 pages (Captured, Tokens, Components)
- `spacing-audit.pdf` — Annotated screenshots with all spacing measurements
- `token-export.json` — Extracted tokens in W3C Design Tokens format

---

## What's Next

- `/design-system` — use extracted components as the starting point for a design system
- `/brand-kit` — cross-reference extracted tokens against brand kit for any drift
- `/figma-create` — publish extracted tokens as Figma variables

---

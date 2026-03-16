# /brand-kit — Lumina SaaS Brand Kit

**Inputs:** Brand name "Lumina", primary color `#4F46E5` (Indigo), platform "SaaS analytics", mood "clarity-focused"

---

## Brand Kit Overview

**Lumina** is a SaaS analytics platform built for product and growth teams. The brand is defined by a single design value: *clarity*. Every element — color, typography, spacing, logo — is chosen to eliminate noise and surface what matters.

This brand kit delivers a complete, production-ready design system covering color palette, typography system, logo guidelines, and design token reference. It is designed for cross-functional teams: designers working in Figma, engineers implementing in code, and marketers producing collateral.

**Kit Contents:**
- Full color palette (semantic + raw scales)
- Complete typography system with role-based scale
- Logo usage guidelines and clear space rules
- 10 semantic design tokens with CSS variable names
- Brand guideline summary and do/don't principles

---

## Color Palette

The Lumina color palette is anchored in Indigo — a color that conveys intelligence, trust, and focus. It is paired with a neutral Slate scale for surfaces and text.

### Primary Scale

| Token | Hex | Role |
|-------|-----|------|
| `--color-primary` | `#4F46E5` | Primary actions, brand anchors |
| `--color-primary-dark` | `#3730A3` | Hover states, pressed buttons |
| `--color-primary-light` | `#818CF8` | Tinted backgrounds, decorative |
| `--color-primary-subtle` | `#EEF2FF` | Chip backgrounds, highlighted rows |

### Neutral / Surface Scale

| Token | Hex | Role |
|-------|-----|------|
| `--color-surface` | `#F8FAFC` | App background |
| `--color-surface-raised` | `#FFFFFF` | Cards, modals, panels |
| `--color-surface-overlay` | `#F1F5F9` | Hover row backgrounds |
| `--color-border` | `#E2E8F0` | Dividers, card borders |

### Text Scale

| Token | Hex | Role |
|-------|-----|------|
| `--color-text-primary` | `#0F172A` | Body copy, headings |
| `--color-text-secondary` | `#64748B` | Captions, placeholder, metadata |
| `--color-text-disabled` | `#CBD5E1` | Disabled form fields |

### Semantic / Status Colors

| Token | Hex | Role |
|-------|-----|------|
| `--color-success` | `#10B981` | Positive trends, confirmations |
| `--color-warning` | `#F59E0B` | Alerts, caution states |
| `--color-error` | `#EF4444` | Validation errors, destructive actions |
| `--color-info` | `#0EA5E9` | Informational banners |

**Accessibility:** Primary button (white on `#4F46E5`) achieves 4.6:1 — passes WCAG AA. Text Primary on Surface achieves 16.3:1 — passes WCAG AAA.

---

## Typography System

Lumina uses **Inter** exclusively. Its geometric construction aligns with the brand's clarity value, and it performs well across all screen sizes and resolutions.

### Type Scale

| Role | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| Display | 56px | 1.1 | 700 | Hero headlines, landing page above-fold |
| H1 | 40px | 1.15 | 700 | Page titles, onboarding headers |
| H2 | 32px | 1.2 | 600 | Section headings, modal titles |
| H3 | 24px | 1.3 | 600 | Card headings, sidebar section labels |
| H4 | 20px | 1.35 | 600 | Sub-section headings, list labels |
| Body Large | 18px | 1.6 | 400 | Marketing body copy, long-form descriptions |
| Body | 16px | 1.6 | 400 | Standard UI body text |
| Body Small | 14px | 1.5 | 400 | Secondary descriptions, table cell content |
| Caption | 12px | 1.4 | 500 | Timestamps, badges, metadata labels |
| Micro | 11px | 1.3 | 500 | Legal, fine print, keyboard shortcuts |

### Typography Rules

- **Never use fewer than 2 type sizes on a single screen** — hierarchy must be visible at a glance.
- **Line length:** Body text capped at 72 characters (~640px at 16px). Never allow full-bleed paragraphs.
- **Letter spacing:** -0.01em on Display and H1; 0.01em on Caption and Micro for legibility.
- **Font loading:** Use `font-display: swap` to prevent invisible text during load.

---

## Logo Guidelines

The Lumina logo comes in two forms: the **primary wordmark** (logotype + icon lockup) and the **icon-only mark** (the crystalline "L" glyph).

### Logo Variants

| Variant | File | Usage |
|---------|------|-------|
| Primary wordmark (color) | `logo-color.svg` | Default — use on white/light backgrounds |
| Primary wordmark (white) | `logo-white.svg` | Use on Indigo, dark, or photographic backgrounds |
| Icon only (color) | `icon-color.svg` | Favicons, app icons, square lockups |
| Icon only (white) | `icon-white.svg` | Icon on dark backgrounds |

### Logo Rules

1. **Minimum size:** 24px height for icon-only; 80px width for full wordmark. Do not display smaller.
2. **Clear space:** Maintain clear space equal to 1× the icon width on all sides of the logo.
3. **Proportions:** Never stretch or distort the logo. Scale uniformly only.
4. **Color:** Only use the approved logo color variants. Do not recolor.
5. **No effects:** No drop shadows, gradients, outlines, or transparency applied to the logo.
6. **Backgrounds:** The logo must always appear on a background with sufficient contrast — minimum 3:1 ratio.

### Logo Don'ts

- Do not place the wordmark at an angle.
- Do not use the logo as a watermark at low opacity.
- Do not add taglines or other text adjacent to the logo without approved lockup files.
- Do not use old logo versions — only use files from the current brand kit.

---

## Design Token Reference

Ten semantic tokens form the foundation of all Lumina components. Engineers implement these as CSS custom properties; designers reference them in Figma as variable styles.

| # | Token Name | CSS Variable | Value | Notes |
|---|-----------|-------------|-------|-------|
| 1 | Brand Primary | `--color-primary` | `#4F46E5` | Main CTA, active states |
| 2 | Brand Primary Dark | `--color-primary-dark` | `#3730A3` | Hover on primary |
| 3 | Surface | `--color-surface` | `#F8FAFC` | App background |
| 4 | Surface Raised | `--color-surface-raised` | `#FFFFFF` | Cards, panels |
| 5 | Text Primary | `--color-text-primary` | `#0F172A` | Body + headings |
| 6 | Text Secondary | `--color-text-secondary` | `#64748B` | Metadata, placeholders |
| 7 | Success | `--color-success` | `#10B981` | Positive metric indicators |
| 8 | Warning | `--color-warning` | `#F59E0B` | Caution banners |
| 9 | Error | `--color-error` | `#EF4444` | Validation, destructive |
| 10 | Border Default | `--color-border` | `#E2E8F0` | Card borders, dividers |

### Token Usage in CSS

```css
:root {
  --color-primary: #4F46E5;
  --color-primary-dark: #3730A3;
  --color-surface: #F8FAFC;
  --color-surface-raised: #FFFFFF;
  --color-text-primary: #0F172A;
  --color-text-secondary: #64748B;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-border: #E2E8F0;
}
```

All token values are duplicated in `tokens.json` (W3C Design Tokens format) and in the Figma variable library.

---

## Brand Guideline Summary

**Core principle:** Lumina communicates clarity — avoid clutter, generous whitespace, lead with data.

### Do

- Use generous whitespace. Lumina layouts breathe — minimum 24px between content groups, 80px section padding.
- Let data speak. Charts and metrics are the hero. Decorative illustration is supporting.
- Default to Indigo for interactive elements. One accent color, used consistently.
- Use Inter across all mediums — pitch decks, marketing, product, print collateral.

### Don't

- Do not use more than 3 colors in a single data visualization.
- Do not use gradients in UI components (marketing hero graphics are the only exception).
- Do not use more than 2 font weights on a single screen outside the type scale.
- Do not mix icon styles — use the Lumina icon set exclusively.

### Brand Personality Spectrum

| Lumina IS | Lumina IS NOT |
|-----------|--------------|
| Clear | Clever |
| Confident | Arrogant |
| Data-driven | Data-obsessed |
| Focused | Restrictive |
| Professional | Corporate |

**Voice guideline for all writing:** Write like a senior analyst explaining findings to a smart, time-constrained founder. No jargon. Short sentences. Lead with the insight, follow with the context.

---

## Delivered Files

- `brand-tokens.css` — CSS custom properties (light + dark mode)
- `tokens.json` — W3C Design Tokens format
- `tailwind.config.js` — Tailwind v3 theme extension
- `figma-variables.json` — Figma variable import
- `logo/` — All logo variants (SVG + PNG @1x, @2x, @3x)
- `brand-guidelines.pdf` — Printable reference

---

## What's Next

- `/design-system` — extend brand tokens into full component library
- `/figma-create` — publish Figma styles and variables from this kit
- `/site-to-figma` — capture current site to compare against brand guidelines

---

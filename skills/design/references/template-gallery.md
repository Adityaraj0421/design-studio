# Template Gallery

Reference for the `/design-template` command. Contains the design standards, component patterns, and quality benchmarks for the 10 template categories.

---

## Template Design Standards

Every template must meet these quality bars:

| Standard | Requirement |
|----------|-------------|
| Responsive | Works at 375px (mobile), 768px (tablet), 1280px (desktop) |
| Accessible | WCAG AA contrast (4.5:1 body, 3:1 large text), semantic HTML, ARIA labels |
| Interactive | All states: hover, focus, active on interactive elements |
| Dark mode | Either system-preference-based or class-based `.dark` |
| No dependencies | Vanilla HTML/CSS/JS — no framework, no CDN imports |
| Real copy | No Lorem Ipsum — benefit-driven product copy |
| CSS variables | Color system in `:root` for instant rebrand |

---

## Color System Pattern

Every template uses the same CSS variable structure:

```css
:root {
  /* Brand */
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-primary-light: #dbeafe;
  --color-primary-text: #ffffff;

  /* Neutral */
  --color-bg: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-surface: #ffffff;
  --color-border: #e5e7eb;
  --color-text: #111827;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9ca3af;

  /* Semantic */
  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-error: #dc2626;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 64px;
  --space-3xl: 96px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    --color-bg-secondary: #1e293b;
    --color-surface: #1e293b;
    --color-border: #334155;
    --color-text: #f8fafc;
    --color-text-secondary: #94a3b8;
    --color-text-muted: #64748b;
  }
}
```

---

## Component Library (Reusable Across Templates)

### Button Variants
```css
/* Primary */
.btn-primary {
  background: var(--color-primary);
  color: var(--color-primary-text);
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
}
.btn-primary:hover { background: var(--color-primary-dark); }
.btn-primary:active { transform: translateY(1px); }

/* Ghost */
.btn-ghost {
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.btn-ghost:hover { background: var(--color-primary-light); }

/* Text link button */
.btn-text {
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}
```

### Card Pattern
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### Badge/Tag
```css
.badge {
  display: inline-flex;
  align-items: center;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
}
```

### Form Input
```css
.input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--color-text);
  background: var(--color-bg);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  outline: none;
}
.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}
.input.error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.1);
}
```

---

## Layout Skeletons

### Standard Page Layout
```html
<body>
  <header class="header">...</header>
  <main>
    <section class="hero">...</section>
    <section class="features">...</section>
    <!-- etc -->
  </main>
  <footer class="footer">...</footer>
</body>
```

### Dashboard Layout
```html
<div class="app-shell">
  <aside class="sidebar" aria-label="Navigation">
    ...
  </aside>
  <div class="main-content">
    <header class="topbar">...</header>
    <main class="page-content">...</main>
  </div>
</div>
```
```css
.app-shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}
@media (max-width: 768px) {
  .app-shell { grid-template-columns: 1fr; }
  .sidebar { display: none; }
  .sidebar.open { display: block; position: fixed; inset: 0; z-index: 100; }
}
```

### Docs Layout
```html
<div class="docs-shell">
  <nav class="docs-sidebar" aria-label="Documentation">...</nav>
  <article class="docs-content">...</article>
  <nav class="docs-toc" aria-label="On this page">...</nav>
</div>
```
```css
.docs-shell {
  display: grid;
  grid-template-columns: 280px 1fr 240px;
  max-width: 1440px;
  margin: 0 auto;
}
@media (max-width: 1024px) {
  .docs-shell { grid-template-columns: 260px 1fr; }
  .docs-toc { display: none; }
}
```

---

## Style Variations

### Minimal
- Background: `#ffffff`, section dividers with subtle `#f9fafb` alternating
- Typography: system-ui or Inter, generous line height (1.7 body)
- Spacing: `--space-3xl` (96px) between major sections
- Borders: 1px `#e5e7eb`, no heavy shadows
- Buttons: flat fill, no shadows, medium border-radius

### Bold
- Strong visual weight: high-contrast hero with full-bleed color
- Tight letter spacing on headings (`letter-spacing: -0.02em`)
- Large headlines: 56–80px H1
- Thick borders: 2–3px accent lines
- Buttons: prominent with subtle shadow

### Corporate
- Serif accent font on headings (`Merriweather` or `Playfair Display`)
- Blue/navy primary, muted accents
- Structured grid layouts, less white space
- Professional imagery/illustrations (abstract geometric shapes)

### Playful
- Rounded corners everywhere (`--radius-lg: 20px`, `--radius-md: 12px`)
- Gradient CTAs: `linear-gradient(135deg, var(--color-primary), #a855f7)`
- Friendly copy tone, emoji usage
- Colorful section backgrounds (pastel tints)

### Dark Tech
- Background: `#030712` or `#0a0a0a`
- Accent: bright cyan/green (`#06b6d4`) or electric blue on dark
- Monospace font accents for technical content
- Terminal/code aesthetic: subtle grid patterns, scan-line effects

---

## Copy Templates by Category

### Landing Page
- H1: "[Product] makes [outcome] [10× easier/faster/cheaper]"
- Value prop: "Join [X,000]+ [audience] who [benefit achieved]"
- CTA: "Start free trial" + "Watch demo" (ghost)
- Feature headings: action-oriented ("Ship faster", "Scale confidently")

### SaaS
- H1: "The [adjective] way to [verb] [object]"
- Sub: "Trusted by [X,000]+ [company types] worldwide"
- Social proof: recognizable logo grid (6 well-known companies)
- Pricing CTA: "Start for free" (14-day trial, no credit card)

### Dashboard
- KPI labels: "Monthly Revenue", "Active Users", "Churn Rate", "MRR Growth"
- Positive trend: "+12.5% from last month" (green)
- Negative trend: "-3.2% from last month" (red)
- Table headers: Name, Status, Date, Amount, Actions

### Auth
- Login headline: "Welcome back"
- Login sub: "Sign in to your account to continue"
- CTA: "Sign in" / "Create account"
- Error: "The email or password you entered is incorrect"

---

## Responsive Breakpoints

```css
/* Mobile: 375–767px (default, no media query needed) */
/* Tablet: 768–1023px */
@media (min-width: 768px) { ... }
/* Desktop: 1024px+ */
@media (min-width: 1024px) { ... }
/* Wide: 1280px+ */
@media (min-width: 1280px) { ... }
```

Standard pattern:
- Mobile: single column, full-width
- Tablet: 2 columns for cards/grids
- Desktop: 3–4 columns, sidebar layouts

---

## QA Checklist

- [ ] Renders at 375px without horizontal overflow
- [ ] Renders at 768px and 1024px with correct grid reflow
- [ ] All interactive elements have `:hover` and `:focus` states
- [ ] Contrast passes WCAG AA (verify primary text, secondary text, CTA button text)
- [ ] Semantic HTML: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`
- [ ] `alt` text on all images/icon placeholders
- [ ] Dark mode renders correctly (no invisible text, no lost contrast)
- [ ] No Lorem Ipsum — all placeholder copy is realistic and category-appropriate
- [ ] CSS custom properties used for all colors (rebrand-ready)
- [ ] Mobile nav toggle works (hamburger opens/closes nav)
- [ ] All anchor links (`#section`) work for single-page scrolling
- [ ] No console errors in browser

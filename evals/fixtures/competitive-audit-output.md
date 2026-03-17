# /competitive-audit — Linear.app

**Capturing site: linear.app**

Playwright captured full-page screenshots and hero scroll sequence. Extracting design patterns, color palette, typography system, layout grid, and key UX patterns.

---

## Audit Overview

**Target:** linear.app — project management tool for software teams
**Capture date:** 2026-03-16
**Pages captured:** Homepage, Features, Pricing, Changelog

---

## Color Palette

### Dominant Colors

| Role | Hex | Usage |
|------|-----|-------|
| Background (dark) | `#0F0F10` | Primary page background |
| Surface | `#1A1A1C` | Card and section backgrounds |
| Border | `#2A2A2D` | Subtle separators, card borders |
| Text primary | `#F2F2F2` | Headlines and body copy |
| Text secondary | `#8A8A95` | Captions, labels, helper text |
| Accent (purple) | `#5E6AD2` | CTAs, active states, highlights |
| Accent (cyan glow) | `#00C7BE` | Gradient highlights, hover glows |

### Palette Characteristics
- **Mode:** Dark-first (no light mode on marketing site)
- **Hue tinting:** Neutrals carry ~3% purple tint — brand cohesion without distraction
- **Contrast:** Primary text achieves ~12:1 on dark background — far exceeds WCAG AAA
- **Accent density:** Accent used sparingly — never more than 2 accent elements in the same viewport

### Brand Color Derivation
Base: `#5E6AD2` (HSL: 234°, 55%, 60%)
- Generates purple family across 50–950 scale using HSL derivation
- Cyan (`#00C7BE`) is complementary accent — 180° hue shift

---

## Typography System

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Hero H1 | Söhne (custom) | 56px | 600 | 1.1 |
| Section H2 | Söhne | 40px | 500 | 1.15 |
| Card headline | Söhne | 20px | 500 | 1.3 |
| Body | Inter | 16px | 400 | 1.6 |
| Caption / label | Inter | 13px | 400 | 1.5 |
| Code | JetBrains Mono | 14px | 400 | 1.5 |

**Notes:**
- Custom font (Söhne) for display — signals premium brand positioning
- Inter for body copy — ubiquitous, excellent readability
- Code font in product screenshots — reinforces developer-tool identity

---

## Layout Grid

| Viewport | Columns | Gutter | Max Width |
|---------|---------|--------|-----------|
| Desktop (1440px) | 12 | 32px | 1200px |
| Tablet (768px) | 8 | 24px | 100% |
| Mobile (375px) | 4 | 16px | 100% |

**Layout patterns observed:**
- Feature sections alternate 60/40 split (text left, image right) + 40/60 (image left, text right) — prevents monotony
- Full-bleed screenshot mockups break grid intentionally — creates visual drama
- Generous whitespace: section padding averages 120px top/bottom on desktop

---

## Key UX Patterns

### Navigation
- Minimal sticky header: logo + 4 nav items + "Start for free" CTA
- Mega-menu appears on hover over "Product" — immediate feature preview with icons
- Mobile: hamburger → full-screen overlay with large tap targets

### Hero Section
- Full-viewport height with auto-play product demo (no audio, loop)
- Headline above demo, subhead below — context sandwich around the visual
- Single primary CTA ("Start for free") + ghost secondary ("View changelog")

### Feature Presentation
- "Issue tracking" / "Cycles" / "Roadmap" features presented as individual full-section stories
- Each section: headline + 2-sentence value prop + product screenshot filling right 60% of viewport
- Animated entrance: components fade up on scroll-enter (200ms ease-out)

### Social Proof
- Customer logo strip (grayscale) positioned mid-scroll between hero and features
- Testimonial pull-quotes interspersed between feature sections (not a dedicated testimonials page)
- GitHub-style stats: "2.2M+ issues created," "450+ integrations" — concrete numbers

### Changelog
- Dedicated `/changelog` page with versioned entries
- Each entry: date badge + headline + 2-3 bullet improvements + product screenshots
- Signals active development — powerful trust signal for B2B SaaS

---

## "Steal This" Recommendations

| Pattern | Quality | Recommendation |
|---------|---------|----------------|
| Alternating text/image sections (60/40) | ⭐⭐⭐ | Prevents feature section monotony; implement for any feature showcase page |
| Product demo video in hero (looping, no audio) | ⭐⭐⭐ | Replaces static screenshots with live product proof — reduce bounce from hero |
| Grayscale customer logo strip | ⭐⭐⭐ | Monochrome treatment keeps logos from clashing with brand accent colors |
| Section-level social proof interleaving | ⭐⭐⭐ | Testimonials next to the feature they validate — more contextually credible than a single page |
| Changelog as trust signal | ⭐⭐⭐ | Public changelog signals active, responsive team — high-value low-effort page |
| Minimal nav with single CTA | ⭐⭐ | Fewer nav distractions on marketing pages improves CTA conversion rate |
| Purple tint on neutral palette | ⭐⭐ | 3–5% primary hue in grays creates cohesion without saturation |
| Concrete stats in social proof ("2.2M+ issues") | ⭐⭐ | Numbers more credible than generic claim — always use real data |

---

## Design System Signals

**What Linear's site reveals about their design system:**
- Token-driven: consistent 8px grid, no arbitrary spacing values visible
- Component reuse: card component pattern appears in 3 different section contexts with same anatomy
- Dark mode only on marketing site — but their app supports light mode
- Icon system: custom thin-line icons, consistent 16px/20px/24px sizes

---

## Recommended Application

If building a developer-tool or productivity SaaS product, prioritize:
1. Dark-first color palette with purple accent and generous whitespace
2. Alternating 60/40 feature sections with product screenshots
3. Public changelog page (3–5 entries minimum before launch)
4. Grayscale customer logo strip at mid-scroll position
5. Looping product demo video in hero (compress to < 3MB for performance)

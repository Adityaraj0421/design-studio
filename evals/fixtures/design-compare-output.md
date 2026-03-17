# /design-compare — Stripe vs Paddle

**Capturing screenshots: stripe.com/pricing vs paddle.com/pricing**

Playwright captured full-page screenshots of both URLs. Running side-by-side visual analysis.

---

## Comparison Overview

| Dimension | stripe.com/pricing | paddle.com/pricing |
|-----------|-------------------|-------------------|
| **Layout** | 3-column card grid, sticky top nav | 2-column toggle layout, hero section |
| **Typography** | Inter — 48px headline, 16px body | Custom sans — 40px headline, 16px body |
| **Primary CTA** | Outlined "Start for free" + solid "Contact sales" | Solid "Get started" full-width on mobile |
| **Color palette** | White base, #635BFF accent, dark navy | White base, #06C5A0 accent, charcoal |
| **Navigation** | Fixed header with product nav mega-menu | Simple flat header, fewer links |
| **Social proof** | Customer logos above pricing cards | Testimonials inline with pricing tiers |

---

## Layout Patterns

### Stripe
- Consistent 24px card padding, 32px gap between tier cards
- Pricing highlighted with large type (36px), currency left-aligned
- Feature list uses custom check icons with indigo fill
- "Most popular" badge: absolute-positioned chip on Pro card
- Mobile: stacks to single column, CTA becomes full-width

### Paddle
- Toggle (monthly/annual) prominent above the fold — immediate discount visibility
- Comparison table below cards provides feature matrix for detail-oriented buyers
- Mobile: maintains 2-column layout until 480px breakpoint

---

## Typography Hierarchy

| Level | Stripe | Paddle |
|-------|--------|--------|
| Hero H1 | 48px/1.1 | 40px/1.15 |
| Card price | 36px bold | 32px bold |
| Card body | 16px/1.6 | 16px/1.5 |
| Feature list | 14px/1.5 | 15px/1.5 |

**Analysis:** Stripe's larger hero type creates stronger visual hierarchy. Both use 16px body — WCAG minimum met.

---

## Color Usage

| Role | Stripe | Paddle |
|------|--------|--------|
| Background | #FFFFFF | #FFFFFF |
| Primary accent | #635BFF (indigo) | #06C5A0 (teal) |
| CTA background | Outlined (primary), solid (secondary) | Solid teal |
| Recommended card | #F8F8FF subtle background | Border highlight only |

---

## UX Patterns

### Navigation
- **Stripe:** Mega-menu with product categories — high information density, suits a large product surface area
- **Paddle:** Simplified flat nav — fewer decisions, optimized for conversion

### Pricing presentation
- **Stripe:** Shows "per transaction" model inline — transparent about costs
- **Paddle:** Emphasizes "all-in" pricing — merchant of record framing prominent

### Trust signals
- **Stripe:** "Millions of companies" + enterprise logo row — authority play
- **Paddle:** Testimonial quotes with attribution — social proof play

---

## Steal This

| Pattern | Source | Quality | Recommendation |
|---------|--------|---------|----------------|
| Annual toggle above the fold | Paddle | ⭐⭐⭐ | Move pricing toggle above cards, not inline — increases annual plan conversion |
| Feature comparison table below cards | Paddle | ⭐⭐⭐ | Add a comparison table below the 3 pricing tiers for technical buyers |
| "Most popular" badge placement | Stripe | ⭐⭐⭐ | Absolute-positioned chip on recommended tier stands out without adding a column |
| Per-transaction pricing inline | Stripe | ⭐⭐ | Surface the true cost model clearly — builds trust with technical buyers |
| Logo row social proof | Stripe | ⭐⭐ | Enterprise logo strip above pricing anchors authority before price reveal |
| Minimal nav on pricing page | Paddle | ⭐⭐ | Reduce navigation options on pricing pages to lower exit rate |

---

## Relative Strengths

**Stripe pricing page strengths:**
- Stronger type hierarchy and visual polish
- More transparent pricing model
- Better enterprise credibility signals

**Paddle pricing page strengths:**
- More prominent annual toggle (conversion-optimized)
- Comparison table reduces support questions
- Simpler decision path

---

## Actionable Takeaways

1. **Layout:** Adopt Stripe's 3-column card grid but add Paddle's billing-cycle toggle above the fold
2. **Social proof:** Place logo strip above pricing, testimonials below — two layers of trust signals
3. **Comparison:** Add a feature matrix table below cards for plan differentiation clarity
4. **Typography:** Scale hero text to 48px+ — current 36px undersells the section hierarchy
5. **Mobile:** Full-width CTA on mobile (Stripe pattern) — apply to all pricing page CTAs

# /ab-variants — Lumina SaaS Pricing Page A/B Test

**Target:** Lumina SaaS pricing page — simplified 2-tier layout vs current 3-tier layout

---

## Test Overview

This document defines the A/B test for the Lumina SaaS pricing page redesign. The current pricing page presents three tiers and a monthly/annual billing toggle with a full feature comparison table. The treatment collapses the offering into two tiers with a recommended badge and a reduced feature list to lower cognitive load.

**Test name:** `pricing-variant-b`
**Feature flag:** `pricing-variant-b`
**Traffic split:** 50/50
**Run duration:** 2 weeks
**Statistical significance target:** 95%
**Primary decision metric:** trial signup conversion rate

---

## Control — Current Pricing Page

The control is the existing 3-tier pricing layout that has been live since Lumina v2.0.

### Tiers

| Tier | Price (monthly) | Price (annual) |
|------|----------------|----------------|
| Starter | $29/mo | $24/mo |
| Pro | $79/mo | $66/mo |
| Enterprise | Custom | Custom |

### Page Elements

- Monthly/annual billing toggle at top of section
- Full feature comparison table with 18 rows
- Tooltip on each feature label (opens on hover)
- "Contact sales" CTA for Enterprise tier
- FAQ accordion below pricing cards (6 items)

### Observed Behaviour

The control page shows strong SEO performance and familiarity with existing users. However, session recordings indicate a median scroll depth of 42% on mobile — most users never reach the comparison table. Heatmaps show that 38% of visitors click the toggle to switch between monthly and annual, then exit without selecting a plan. The primary conversion funnel shows that 29% of visitors who land on the pricing page start a trial.

The control establishes the baseline conversion rate of **29% trial signup** from the pricing page. Secondary baselines: average time-on-page 1m 42s; scroll depth 42% (mobile), 71% (desktop).

---

## Treatment — Variant B

The treatment introduces a 2-tier layout designed to reduce the number of decisions a visitor must make.

### Tiers

| Tier | Price (monthly) | Price (annual) |
|------|----------------|----------------|
| Core | $49/mo | $41/mo |
| Business | $99/mo | $83/mo |

### Page Elements

- No billing toggle on initial load; annual shown by default with a "save 17%" label; toggle is accessible via a small "switch to monthly" link
- "Recommended" badge on Business tier (amber, high contrast)
- Reduced feature list: 6 bullet points per tier (down from 18-row comparison table)
- Single CTA per tier: "Start free trial" (Core) and "Start free trial" (Business)
- Enterprise callout placed below as a secondary text link, not a card
- No FAQ accordion on this variant (moved to a separate support link)

### Visual Treatment

The variant card layout is wider (560px vs 420px per card on desktop) and uses a 2-column grid at ≥768px. Card elevation is higher on the Business tier to reinforce the recommendation. Feature bullets use checkmarks rather than a tabular comparison.

The hypothesis is that reducing the number of visible options and surfacing a clear recommendation will increase the proportion of visitors who begin a trial.

---

## Hypothesis

**Full hypothesis statement:**

Simplifying the pricing page from 3 tiers to 2 tiers, removing the feature comparison table, and adding a prominent recommended badge will reduce cognitive load for first-time visitors. This reduced cognitive load will lead to a higher trial signup conversion rate because visitors spend less time comparing and more time acting.

**Null hypothesis:** There is no statistically significant difference in trial signup conversion between the control 3-tier layout and the treatment 2-tier layout.

**Alternative hypothesis:** The treatment 2-tier layout produces a statistically significantly higher trial signup conversion rate than the control.

**Risk assumption:** Lowering the visible option count may reduce perceived value for enterprise-oriented visitors. The Enterprise callout remaining as a text link partially mitigates this. If Enterprise inbound requests drop by more than 10% during the test period, the test will be paused for review.

---

## Metrics & Measurement

### Primary Metric

| Metric | Control Baseline | Treatment Target | Minimum Detectable Effect |
|--------|-----------------|------------------|--------------------------|
| Trial signup conversion rate | 29% | 38% | +5pp at 95% confidence |

The primary metric is the proportion of pricing page visitors who complete a trial signup within the same session or within 24 hours via direct attribution.

### Secondary Metrics

| Metric | Measurement Method |
|--------|--------------------|
| Time-on-page | Median session duration on `/pricing` |
| Scroll depth | 50th and 90th percentile scroll depth |
| CTA click-through rate | Clicks on "Start free trial" / page views |
| Enterprise contact requests | Form submissions on `/contact-sales` |
| 7-day trial-to-paid conversion | Cohort tracked from trial start date |

### Instrumentation

Events are tracked via Lumina's internal analytics pipeline. The following events must be instrumented before the test launches:

- `pricing_page_view` — fires on page load, includes `variant` property (`control` | `variant-b`)
- `pricing_cta_click` — fires on CTA click, includes `tier` and `variant` properties
- `trial_signup_complete` — fires on successful trial activation
- `billing_toggle_interaction` — fires when the monthly/annual toggle is interacted with (control only)

### Decision Criteria

- Run for a minimum of 2 weeks regardless of early results to avoid peeking bias
- Declare a winner if the primary metric reaches 95% statistical significance and the effect size is ≥ 5pp
- If no significance is reached after 4 weeks, the test will be called a null result and the control will be retained
- If any secondary metric shows a statistically significant negative regression (e.g. Enterprise contacts fall more than 10%), the test will be paused for qualitative review

---

## Implementation Notes

### Feature Flag

The test is gated behind the feature flag `pricing-variant-b` managed in Lumina's LaunchDarkly workspace.

```
flag key:        pricing-variant-b
rollout:         50% control / 50% treatment
targeting rules: all authenticated and anonymous visitors to /pricing
environments:    production only (staging uses 100% control)
```

### Code References

- Pricing page component: `src/pages/pricing/PricingPage.tsx`
- Variant component: `src/pages/pricing/PricingPageVariantB.tsx`
- Flag evaluation: `src/hooks/useFeatureFlag.ts`
- Analytics events: `src/analytics/pricingEvents.ts`

### QA Checklist

- [ ] Variant B renders correctly at 375px, 768px, and 1280px
- [ ] Feature flag correctly assigns users to control or treatment on each page load
- [ ] `pricing_page_view` event fires with correct `variant` value
- [ ] `pricing_cta_click` event fires with correct `tier` and `variant` values
- [ ] Annual pricing is shown by default in treatment; toggle works correctly
- [ ] Enterprise text link in treatment routes to `/contact-sales`
- [ ] No flash of wrong variant on page load

### Rollback Plan

To revert to control immediately, set the `pricing-variant-b` flag to 100% control in LaunchDarkly. No code deployment required.

---

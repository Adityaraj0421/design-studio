# /presentation-design — Lumina SaaS Investor Pitch Deck (Series A)

**Inputs:** Brand "Lumina SaaS", purpose "Series A investor pitch", format "16:9 slide deck", export "Google Slides"

---

## Deck Overview

This is a 15-slide investor pitch deck for Lumina's Series A fundraising round. The deck is designed to be presented live (40-minute meeting with Q&A) and left behind as a standalone document.

**Deck specifications:**
- **Slide count:** 15 slides
- **Format:** 16:9 widescreen (1920×1080px)
- **Export format:** Google Slides (native), PDF (leave-behind version)
- **Primary font:** Inter (embedded)
- **Color scheme:** Lumina brand — Indigo `#4F46E5` + Slate neutral scale
- **Target audience:** Pre-qualified Series A investors (seed-stage SaaS focus)

**Design goals:**
1. Convey traction without burying the narrative
2. Show product clarity through deck clarity — design = product quality signal
3. Make every data point scannable in under 3 seconds

---

## Slide Structure

The 15-slide structure follows the standard Series A narrative arc, adapted for Lumina's no-paid-marketing, product-led growth story.

| # | Slide Title | Type | Key Element |
|---|------------|------|-------------|
| 1 | Cover | Title | "See what's really driving your MRR" tagline |
| 2 | The Problem | Narrative | 3-panel pain point — too complex / too simple / too slow |
| 3 | Our Solution | Narrative | One-line solution + 3 benefit pillars |
| 4 | Product — Dashboard | Demo screenshot | Live MRR dashboard with callouts |
| 5 | Product — Cohort Analysis | Demo screenshot | Cohort waterfall with insight card overlay |
| 6 | Product — Automated Insights | Demo screenshot | Insight card feed + Slack integration |
| 7 | Market Size | Data | TAM $4.2B / SAM $1.1B / SOM $85M — bubble chart |
| 8 | Business Model | Diagram | 3-tier pricing, expansion revenue mechanics |
| 9 | Traction | Data | $480K ARR, 1,200 customers, 18-month growth chart |
| 10 | Go-to-Market | Diagram | PLG funnel: free trial → activation → conversion → expansion |
| 11 | Team | Profiles | 4 founders + 2 advisors, photo + 1-line bio |
| 12 | Financials | Data | 3-year P&L summary, path to profitability |
| 13 | Use of Funds | Pie chart | $5M ask: 50% product, 30% GTM, 20% ops |
| 14 | The Ask | Narrative | $5M Series A, lead investor terms |
| 15 | Appendix / Backup | Data | Customer cohort detail, churn breakdown, key metrics |

---

## Narrative Arc

The deck tells a story in four acts. Every slide serves the narrative — data slides are introduced by a narrative context that tells the investor why the number matters before they see it.

### Act 1: The Problem (Slides 1–2)

> "SaaS teams are flying blind. Analytics tools are either too complex (requires a data team) or too simple (only revenue metrics). Neither helps a PM answer 'why did we churn 8% of customers last month?'"

Opens with the founder's personal experience — relatable to any operator-investor.

### Act 2: The Solution & Product (Slides 3–6)

> "Lumina makes product analytics accessible to any SaaS team — no analyst, no SQL, no week-long setup. Connect Segment + Stripe in 10 minutes and see your first insight."

Three product slides show the actual product — no mockups. Real data, real interface.

### Act 3: The Opportunity & Traction (Slides 7–9)

> "SaaS teams are flying blind — analytics tools are too complex or too simple. Lumina makes product analytics accessible. We've grown to $480K ARR in 18 months with no paid marketing."

Traction slide leads with ARR and customer count. Growth chart shows the inflection at month 12.

### Act 4: The Team & Ask (Slides 10–14)

> "We've built this before. We know what SaaS teams actually need. We're raising $5M to hire the team that will take Lumina to $5M ARR."

Ends with a clear, specific ask. No ambiguity about terms.

---

## Layout Specifications

Consistent layout across all 15 slides creates a professional, high-quality signal. Layouts fall into four templates.

### Global Layout Rules

| Property | Value |
|----------|-------|
| Canvas size | 1920×1080px |
| Margin (all sides) | 80px |
| Content width | 1760px (1920 − 2×80) |
| Safe zone for live presentation | 60px additional inset (1800px effective) |

### Template A: Narrative Slide (Slides 1, 2, 3, 14)

- Single-column, centered content
- Headline: Inter 64px Bold, centered, max 2 lines
- Subhead or single paragraph: Inter 24px Regular, max 3 lines, centered
- No more than 40 words total on narrative slides

### Template B: Two-Column Data Slide (Slides 7, 8, 12, 13)

- Left column (55%): Chart or diagram
- Right column (45%): Key metrics, callouts, or legend
- Column gap: 48px
- Both columns top-aligned to a shared 80px top baseline

### Template C: Full-Bleed Screenshot (Slides 4, 5, 6)

- Product screenshot fills 100% of canvas height, centered horizontally
- Dark overlay: `rgba(0, 0, 0, 0.35)` for legibility of any callout text
- Callout annotations: white text, 16px Inter SemiBold, with pointer lines

### Template D: Cover + Divider (Slides 1, 9 section break)

- Full-bleed Indigo `#4F46E5` background
- White text exclusively
- No photography — abstract geometric background illustration (Lumina illustration system)

---

## Typography & Visual System

### Slide Typography Scale

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Slide headline | 48–64px | Bold (700) | `#0F172A` on light; white on dark |
| Slide subheadline | 32px | SemiBold (600) | `#0F172A` or `#4F46E5` |
| Body / narrative copy | 20px | Regular (400) | `#0F172A` |
| Data labels | 14px | SemiBold (600) | Contextual — see chart spec |
| Footnotes / sources | 12px | Regular (400) | `#64748B` |

### Visual System

- **Primary accent:** Indigo `#4F46E5` — used for CTAs, active data series, highlighted metrics
- **Chart palette:** Indigo `#4F46E5` (primary series) + Slate `#94A3B8` (secondary series) + Success `#10B981` (positive trend)
- **Data emphasis:** Key numbers appear in Inter 80–96px Bold in Indigo on data-heavy slides
- **No photography:** All visuals are product screenshots, data charts, or brand illustrations
- **Icon usage:** 24px line icons from the Lumina icon set only. No emoji, no stock icons.

### Chart Specifications

- **Bar charts:** 8px border-radius on bars, Indigo fill, 32px bar width minimum
- **Line charts:** 2px stroke, Indigo, circular data point markers 6px diameter
- **Pie / donut charts:** 3 segments maximum; always include a legend
- **All charts:** Include data labels directly on chart elements — no separate legend tables for simple charts

---

## Design Notes

Notes for the designer preparing the final Google Slides file.

1. **Font embedding:** Inter must be embedded in the Google Slides file. Verify on export — if Inter substitutes to Arial, the deck is not ready.

2. **Slide numbers:** Display slide numbers bottom-right, 14px, `#CBD5E1`. Exclude from Cover slide.

3. **Logo placement:** Lumina icon-only mark top-left, 24px height, on all slides except Cover and full-bleed Demo slides.

4. **Animations:** No slide transitions. No build animations. Static deck only — investor's read it on their own time, not just during live presentation.

5. **PDF export:** Export at 1920×1080. Verify all fonts render correctly. Confirm all charts are vector (not raster screenshots of charts).

6. **Versions:** Maintain two versions — `deck-present.pdf` (14 slides, no appendix) and `deck-full.pdf` (15 slides, with appendix).

7. **Confidentiality footer:** All slides carry a 10px footer: "Confidential — Lumina Inc. — For investor review only" in `#CBD5E1`.

---

## Delivered Files

- `lumina-series-a-deck.gslides` — Google Slides source
- `lumina-series-a-present.pdf` — 14-slide presentation version
- `lumina-series-a-full.pdf` — 15-slide full version with appendix
- `slide-templates.figma` — Figma source for all 4 layout templates

---

## What's Next

- `/video-script` — create a 90-second product demo to embed in investor outreach emails
- `/brand-strategy` — ensure deck narrative aligns with updated positioning
- `/brand-kit` — verify all deck colors and typography match current brand tokens

---

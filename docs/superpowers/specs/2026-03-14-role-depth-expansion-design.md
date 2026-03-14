# Role Depth Expansion — Design Spec
**Date:** 2026-03-14
**Version target:** v3.2.0
**Status:** Approved

---

## Goal

Upgrade 10 role reference files from competent-but-generic (~200 lines avg) to genuinely senior-level knowledge (~450–500 lines avg). Each role currently gives correct but surface-level answers and misses systematic coverage of states, edge cases, and adjacent concerns. This spec defines exactly what gets added to each file.

---

## Problem Statement

Two root causes of shallow output:

1. **Generic** — Claude gives textbook answers ("use 4.5:1 contrast", "add hover states") instead of the senior-level nuance of *when* to break rules, *how* to handle conflicting constraints, and *what* separates a good decision from a correct one.

2. **Incomplete** — Roles cover the happy path of a domain but miss the full design space: component states, error conditions, empty states, edge cases, platform constraints, post-launch concerns.

---

## Approach: Layered Depth Model

Every role in scope gets the same upgrade pattern applied consistently:

```
[Existing content — untouched]
        ↓
## Advanced Patterns
  Senior techniques + decision frameworks
  "When X, do Y" rules for major judgment calls
  Things a junior knows exist but a senior knows when/how to use
        ↓
## Full Coverage
  Systematic map of the full design space for this domain
  All states, edge cases, adjacent concerns — nothing implied
```

**Existing content is preserved.** Both sections are appended. No rewrites.

---

## Scope: 10 Roles

| Role file | Current lines | Target lines | Delta |
|---|---|---|---|
| `ui-designer.md` | 246 | ~500 | +254 |
| `ux-designer.md` | 239 | ~500 | +261 |
| `product-designer.md` | 140 | ~450 | +310 |
| `content-designer.md` | 229 | ~450 | +221 |
| `data-viz-designer.md` | 237 | ~450 | +213 |
| `ux-researcher.md` | 257 | ~420 | +163 |
| `figma-workflow.md` | 246 | ~450 | +204 |
| `deployment.md` | 198 | ~400 | +202 |
| `email-copywriter.md` | 191 | ~400 | +209 |
| `social-media-designer.md` | 194 | ~400 | +206 |

**Total knowledge base:** ~6,000 lines → ~9,500 lines (+58%)

---

## Content Plan Per Role

### 1. `ui-designer.md`

**Advanced Patterns to add:**
- **Dark mode token strategy** — semantic tokens (not just color swaps), surface hierarchy in dark mode, elevation via lightness not shadows, inverted brand color handling
- **Component state taxonomy** — all 8 states as a system: default / hover / focus / active / disabled / loading / error / empty/skeleton. Decision guide: which states every interactive component must have vs. optional
- **Component API design** — when to split a component vs. keep it unified; prop explosion prevention; composition over configuration; the "island" pattern for isolated styling
- **Visual hierarchy decision tree** — when size, weight, color, spacing, and position each earn the job of creating hierarchy; what to do when two elements compete for primary
- **Density variants** — compact / default / comfortable; when each is appropriate (data-dense tools vs. consumer apps vs. marketing); how to implement via spacing tokens not separate components

**Full Coverage to add:**
- **Complete form design** — all input types (text, textarea, select, checkbox, radio, toggle, date, file, search, range) × all states (default, focus, filled, error, disabled, read-only, loading)
- **Navigation pattern decision guide** — sidebar vs. topbar vs. bottom nav vs. tabs vs. breadcrumbs: decision criteria based on depth, frequency, mobile vs. desktop, app type
- **Feedback pattern decision guide** — toast vs. modal vs. inline vs. banner vs. empty state: decision matrix by urgency, destructiveness, user action required, duration

---

### 2. `ux-designer.md`

**Advanced Patterns to add:**
- **Progressive disclosure framework** — levels of information revelation; always-visible vs. on-demand vs. contextual; accordion vs. tooltip vs. detail panel decision guide; when hiding information hurts more than helps
- **Cognitive load reduction** — chunking (max 7±2), defaults that serve most users, smart suggestions over blank inputs, recognition over recall, skeleton screens vs. spinners vs. optimistic UI
- **Modal vs. page vs. drawer decision guide** — decision matrix: does user need full context? Is the action reversible? Is it part of a flow or an interruption? How complex is the content?
- **Fitts's Law applied** — target size minimums by context (mobile: 44px, desktop: 32px), proximity of related actions, danger zone for destructive actions (far from primary), thumb zone for mobile
- **Error prevention > error recovery** — constraint design (disable invalid options, format inputs), confirmation for destructive actions (when to confirm vs. undo vs. neither), smart defaults
- **Undo vs. confirm patterns** — when to use confirm dialogs (irreversible, high stakes), when to use undo (reversible, low friction preferred), when to use neither (low stakes, easily corrected)

**Full Coverage to add:**
- **Empty state design** — 4 types: first-use (no data yet), no results (search/filter), error (something failed), offline (no connection). Each needs: illustration/icon, headline, explanation, primary action
- **Micro-interaction patterns** — feedback (confirm action happened), affordance (show what's interactive), status (show system state), transitions (spatial relationships); when animation adds value vs. noise
- **Edge case mapping methodology** — the 8 edge cases every flow needs: empty, one item, many items, long content, error, loading, offline, permission-denied. Template for documenting each

---

### 3. `product-designer.md`

**Advanced Patterns to add:**
- **Jobs-to-be-Done in practice** — the full JTBD interview question sequence; separating functional / emotional / social jobs; the "when / motivation / outcome" structure; how JTBD changes what you build vs. personas
- **Hypothesis-driven design** — assumption mapping (what must be true for this to work?); converting assumptions to testable hypotheses; minimum experiments to validate before building; how to design for learning not just shipping
- **Metrics ladder** — acquisition → activation → retention → revenue → referral; which metric to optimise at each product stage; leading indicators vs. lagging; when a metric improving is actually a warning sign
- **Scope negotiation tactics** — the "must/should/nice/out" framework in practice; how to push back on scope without saying no; trading scope for time vs. quality; what to cut when something must ship and it's not ready
- **Structured design critique** — critique format: what works / what questions does this raise / what would make it stronger (not "I like/don't like"); how to give feedback that improves the design not just satisfies the reviewer; separating taste from principles

**Full Coverage to add:**
- **Discovery phase checklist** — problem definition, user interviews, competitive audit, assumption inventory, success metrics defined, stakeholder alignment — what done looks like for each before design starts
- **Feature flag & rollout design** — designing for % rollout (what does the 10% see vs. 90%?); kill switch design; A/B variant design; what to measure during rollout to know if you should proceed
- **Post-launch iteration framework** — week 1 (watch for fires), week 2–4 (funnel analysis, drop-off identification), month 2 (qualitative follow-up), month 3 (iterate or kill decision)

---

### 4. `content-designer.md`

**Advanced Patterns to add:**
- **Voice vs. tone distinction** — voice is constant (who you are), tone is contextual (how you feel in this moment); tone spectrum: formal → conversational → playful; how to shift tone without losing voice; the tone matrix (situation × appropriate tone)
- **Error message formula** — 3-part structure: what happened (plain language, no jargon, no blame) + why it happened (if useful) + what to do next (specific, actionable). Anti-patterns: "Something went wrong", error codes, passive voice, blaming the user
- **Microcopy pattern library** — labels (noun not verb), placeholders (example not instruction), helper text (when to show, what it answers), button copy (verb + object), confirmation copy (restate the action), success copy (confirm + next step), empty state copy (context + CTA)
- **A/B testing copy** — what to test first (CTA > headline > body); how to write variants that test one variable; sample size requirements; when a copy test is actually a product test in disguise

**Full Coverage to add:**
- **Empty state copy patterns** — first-use (orient + motivate + CTA), no results (acknowledge + suggest alternatives + escape), error (acknowledge + explain + fix path), filtered-to-zero (show filter state + offer to clear)
- **Onboarding copy framework** — welcome message (orient, not celebrate), step labels (outcome not action), progress copy (encourage, not pressure), completion copy (celebrate + set up next step)
- **Notification copy** — email subject lines (specificity > cleverness, 40 char limit, preview text as second sentence), push notifications (front-load value, action verb, 60 char), in-app (dismissible vs. persistent decision, timing)
- **Legal/compliance copy** — how to make required legal copy readable; when to use plain-language summaries alongside legal text; privacy notice patterns; consent copy that actually informs

---

### 5. `data-viz-designer.md`

**Advanced Patterns to add:**
- **Chart type decision tree** — the four relationships: comparison (bar, column), distribution (histogram, box plot), composition (stacked bar, pie — and when pie is actually fine vs. when it's wrong), relationship (scatter, bubble, heatmap). Decision by: number of variables, time dimension, part-to-whole vs. ranking vs. trend
- **Color-blind safe strategies** — beyond palette swaps: shape + color redundancy, pattern fills for print, label-direct for clarity, the 3 types of colorblindness and what fails for each; tools to test
- **Annotation decision guide** — when to annotate (outliers, context, causation, reference lines) vs. when to let data speak; annotation placement rules; how annotations become noise if overused
- **Small multiples pattern** — when to use instead of one complex chart; layout rules (consistent scale, aligned axes, minimal chrome); how many is too many; interaction patterns for large sets

**Full Coverage to add:**
- **Chart type reference** — for every major chart type: best for / avoid when / common mistakes / accessibility notes: bar, column, grouped bar, stacked bar, line, area, scatter, bubble, pie, donut, heatmap, treemap, histogram, box plot, waterfall, funnel
- **Responsive chart adaptations** — what to do at mobile width: simplify (fewer data points, fewer labels), reorient (vertical bar → horizontal), truncate (scroll or paginate), summarise (chart → KPI card)
- **Real-time data patterns** — live update vs. user-triggered refresh; timestamp display; delta indicators (up/down arrows, color); auto-scroll vs. pause-on-hover for streaming data

---

### 6. `ux-researcher.md`

**Advanced Patterns to add:**
- **Qual vs. quant decision guide** — quant answers "how many / how often"; qual answers "why / how"; when to use each; when mixed methods; the danger of quant without qual (you know what, not why) and qual without quant (you know why, not how often)
- **Research prioritisation framework** — impact (how much would knowing this change the design?) × confidence (how well do we already know this?) × cost (how expensive is this to learn?); what to research vs. what to assume
- **Synthesis techniques** — affinity mapping (bottom-up clustering, how to avoid premature categorisation); opportunity trees (map insights to design opportunities to potential solutions); how to present findings that change decisions not just inform them
- **Communicating research** — the insight-implication-recommendation structure; how to make findings actionable; what to do when findings are inconclusive; stakeholder presentations that move people vs. just report

**Full Coverage to add:**
- **Research ops checklist** — participant recruitment, screener design, consent and recording setup, note-taking protocol, debrief process, storage and sharing of findings
- **Screener template** — inclusion/exclusion criteria structure, qualifying question patterns, red flags that indicate unsuitable participants
- **Bias identification guide** — confirmation bias (in research design), acquiescence bias (in surveys), social desirability bias (in interviews), recency bias (in synthesis); mitigation technique for each

---

### 7. `figma-workflow.md`

**Advanced Patterns to add:**
- **Component naming system** — category/subcategory/variant pattern; when to use variant properties vs. component names; naming for search discoverability; how to handle deprecated components; prefix conventions for WIP / reviewed / published
- **Auto-layout edge cases** — hug vs. fill vs. fixed decision guide; nested auto-layout patterns; when auto-layout breaks (absolute positioned elements, overlapping layers); resizing behaviour for text-heavy vs. icon-heavy components
- **Variable/token architecture decisions** — primitive tokens → semantic tokens → component tokens hierarchy; when to create a new token vs. reuse; scope decisions (local vs. published); multi-brand token structure
- **Large file organisation** — when to split into multiple files (team size, performance, logical separation); page organisation patterns (cover / components / patterns / screens / archive); layer naming discipline at scale
- **Branching strategy** — when to use branches (significant changes, experimental work, client review); branch naming conventions; review workflow; merge conflict resolution; when NOT to branch (quick fixes)

**Full Coverage to add:**
- **Component audit methodology** — how to audit an existing library: inventory (what exists), usage (what's actually used), quality (does it meet standards), gap (what's missing), debt (what needs fixing)
- **Design token migration** — how to migrate from hardcoded values to tokens; the "find all" workflow; which to migrate first (color > spacing > typography > elevation); how to validate completeness
- **Team library governance** — who can publish changes, review process for component changes, versioning and deprecation communication, how to handle breaking changes

---

### 8. `deployment.md`

**Advanced Patterns to add:**
- **LCP optimisation** — largest contentful paint: identify the LCP element (usually hero image or H1), preload it, avoid render-blocking resources above it, server-side render above-the-fold content, CDN for images
- **CLS optimisation** — cumulative layout shift: reserve space for images (width/height attributes), avoid inserting content above existing content, font fallback metrics matching (size-adjust), skeleton screens with correct dimensions
- **INP optimisation** — interaction to next paint: break up long tasks (yield to main thread), defer non-critical JS, use web workers for heavy computation, optimise event handler duration
- **Font loading strategy** — preconnect to font CDN, preload critical fonts, font-display: swap with fallback metrics, variable fonts over multiple weights, self-hosting vs. CDN trade-offs
- **Bundle splitting decisions** — route-based splitting (always), component-level splitting (for large components not needed on initial load), vendor chunk strategy, what NOT to split (creates too many requests)

**Full Coverage to add:**
- **Performance budget framework** — setting budgets (LCP < 2.5s, CLS < 0.1, INP < 200ms, total JS < 200kb gzipped), what to do when you're over budget, measuring in CI
- **Post-deploy monitoring checklist** — Core Web Vitals in production (CrUX vs. lab data), error rate baseline, API response times, 404s from external links, accessibility regression
- **A/B testing infrastructure** — feature flags vs. URL-based vs. cookie-based splitting; flicker prevention (server-side vs. edge vs. client); holdout groups; how to avoid variant pollution across sessions

---

### 9. `email-copywriter.md`

**Advanced Patterns to add:**
- **Subject line formula library** — 5 formulas with examples: specificity ("Your invoice for $240 is ready"), curiosity gap ("The one thing we changed"), urgency + specificity ("48 hours left: [benefit]"), social proof ("1,200 people signed up this week"), direct benefit ("[Name], here's your [thing]"). Anti-patterns: clickbait, ALL CAPS, excessive punctuation
- **Preview text strategy** — preview text is the second subject line; never repeat the subject; extend the thought or add a secondary hook; 40–90 characters; what it looks like when left blank (ugly partial body copy)
- **CTA copy decision guide** — verb + object + context ("Download your report" not "Click here"); single primary CTA per email; button vs. text link decision; above the fold + repeat at bottom for long emails; colour and size rules
- **Drip sequence psychology** — welcome (orient + deliver value immediately), nurture (teach before you sell), consideration (social proof + objection handling), conversion (clear offer + urgency), post-purchase (onboard + upsell), re-engagement (acknowledge inactivity + give reason to return)

**Full Coverage to add:**
- **Email type reference** — for each type: goal, sender, subject line approach, CTA, ideal length, send timing: welcome, product update, educational/newsletter, promotional, transactional (receipt/confirmation), re-engagement, win-back, milestone, survey
- **Segmentation copy adaptation** — how to write one email that reads differently for different segments using dynamic content blocks; when to send separate emails vs. personalise one; power users vs. new users vs. churned users tone differences
- **A/B testing email copy** — what to test in order: subject line (biggest impact) → CTA copy → headline → send time → length; how to read results (open rate for subject, click rate for body); minimum send volume per variant (1,000+)

---

### 10. `social-media-designer.md`

**Advanced Patterns to add:**
- **Platform-specific constraint guide** — safe zones, aspect ratios, text limits, and UI chrome overlay for: Instagram feed (1:1, 4:5, 1.91:1), Instagram Story/Reel (9:16, top/bottom 250px safe zone), LinkedIn (1200×628 feed, 1080×1080 square), TikTok (9:16, text safe zone), Twitter/X (16:9, 2:1)
- **Scroll-stopping visual techniques** — contrast first (dark on light or light on dark thumbnail), motion hint (suggest video with blur/arrow), curiosity gap (cut off something interesting), text-as-visual (large bold statement), human faces (eye contact)
- **Brand consistency across platform constraints** — the 3-tier system: fixed (logo, brand colours, typeface), flexible (layout, proportion, imagery style), adaptive (aspect ratio, text length, CTA format); how to brief this to a team
- **Template system design** — building templates that are: locked (brand-safe elements), flexible (content zones), foolproof (hard to break accidentally); layer naming for non-designers; how many templates is the right number (fewer is better)

**Full Coverage to add:**
- **Platform format reference** — for every format: dimensions, safe zone, file format/size limits, text limit, animation support, accessibility features: Instagram feed/story/reel/carousel, LinkedIn feed/story/article cover, TikTok, Twitter/X, Pinterest, YouTube thumbnail
- **Accessibility for social** — alt text best practices (describe for context, not just content), caption style guide (punctuation, speaker labels, accuracy), colour contrast on mobile screens (higher than web minimum due to ambient light), animated content (pause option, no flashing)
- **Cross-platform campaign coherence** — how to adapt one campaign idea across platforms without copy-pasting; the campaign brief format (idea → platform adaptations); visual consistency checklist for multi-platform launches

---

## Implementation Notes

- Each role is an independent task — no cross-dependencies
- Existing content must not be modified, only appended to
- Both sections (`## Advanced Patterns`, `## Full Coverage`) must be present in every upgraded role
- All 10 roles and all 10 eval cases must be completed before running evals or bumping the version — no partial states
- After all 10 roles are updated: bump `.claude-plugin/plugin.json` version to `3.2.0` and add `CHANGELOG.md` entry
- Evals: add 1 eval case per role testing depth (10 new cases, ids 32–41) — each eval should test that the role gives a *decision* not just a description
- New section headings must use `##` level (not `###`) to match the existing top-level section structure in each role file

---

## Success Criteria

1. Every upgraded role has both `## Advanced Patterns` and `## Full Coverage` sections (both at `##` heading level)
2. Each role meets its target: `ui-designer` and `ux-designer` ~500 lines; `product-designer`, `content-designer`, `data-viz-designer`, `figma-workflow` ~450 lines; `ux-researcher` ~420 lines; `deployment`, `email-copywriter`, `social-media-designer` ~400 lines
3. No existing content removed or rewritten
4. `.claude-plugin/plugin.json` at `3.2.0`, `CHANGELOG.md` updated
5. 10 new eval cases (ids 32–41) added to `evals/evals.json`
6. All evals pass: `bash scripts/run-evals.sh` — run only after all 10 roles and all 10 evals are complete

---
description: "Capture two websites with Playwright and produce a structured side-by-side design comparison — layout, color, typography, navigation, and 'steal this' recommendations."
argument-hint: "<url1> <url2>"
allowed-tools: ["Read", "mcp__plugin_playwright_playwright__*"]
---

# /design-compare

## Step 1 — Parse Arguments

`$ARGUMENTS` may be one of:
- Two bare domains: `stripe.com canva.com`
- Two full URLs: `https://stripe.com https://canva.com`
- Mixed: `stripe.com https://canva.com`
- One URL only → ask the user for the second before proceeding
- Empty → ask the user for both URLs before proceeding

Normalize each value: if it doesn't start with `http://` or `https://`, prepend `https://`.

Store as **URL1** and **URL2**.

---

## Step 2 — Capture Site 1 (URL1)

1. Resize viewport to **1440×900** (desktop):
   - `mcp__plugin_playwright_playwright__browser_resize` → width: 1440, height: 900

2. Navigate to URL1:
   - `mcp__plugin_playwright_playwright__browser_navigate` → url: URL1

3. Take desktop screenshot:
   - `mcp__plugin_playwright_playwright__browser_take_screenshot`
   - Label this: **site1-desktop**

4. Resize viewport to **390×844** (mobile):
   - `mcp__plugin_playwright_playwright__browser_resize` → width: 390, height: 844

5. Take mobile screenshot:
   - `mcp__plugin_playwright_playwright__browser_take_screenshot`
   - Label this: **site1-mobile**

6. Take accessibility snapshot (to read nav links, headings, landmark structure):
   - `mcp__plugin_playwright_playwright__browser_snapshot`
   - Label this: **site1-snapshot**

---

## Step 3 — Capture Site 2 (URL2)

Repeat the exact same sequence as Step 2 for URL2:

1. Resize to 1440×900
2. Navigate to URL2
3. Desktop screenshot → **site2-desktop**
4. Resize to 390×844
5. Mobile screenshot → **site2-mobile**
6. Accessibility snapshot → **site2-snapshot**

---

## Step 4 — Analyze with Vision

Examine all six captures (four screenshots + two snapshots). Evaluate each site across these dimensions:

**Layout & Grid**
- Header pattern (full-width / contained / transparent)
- Hero / above-the-fold treatment
- Content columns and card grid density
- Footer structure

**Color System**
- Primary brand color(s)
- Secondary / accent colors
- Background tone (stark white / off-white / dark / gradient)
- Text color hierarchy (H1 → body → muted)

**Typography**
- Heading size and weight
- Body text size, line height, readability
- Font personality (geometric / humanist / serif / system)

**Navigation**
- Top nav style: sticky, fixed, transparent, minimal
- Number of nav items and depth
- Primary CTA placement and style in nav

**Visual Hierarchy**
- How does the eye move through the page?
- What do they want you to do first?

**Unique Design Choices**
- 2–3 distinctive or memorable patterns per site

---

## Step 5 — Output: Structured Comparison Report

Produce the following report in full. Replace all placeholders with actual findings.

```markdown
# Design Comparison: {URL1} vs {URL2}

## At a Glance

| Dimension       | {Site 1}  | {Site 2}  |
|-----------------|-----------|-----------|
| Layout style    | …         | …         |
| Color mood      | …         | …         |
| Typography      | …         | …         |
| Nav pattern     | …         | …         |
| Whitespace      | …         | …         |

## Deep Dive

### Layout & Grid
[3–5 sentences comparing the two layouts — column structure, density, use of negative space, how each arranges content above the fold.]

### Color & Mood
[3–5 sentences comparing color strategy — palette size, emotional tone, contrast ratios, use of gradients or photography.]

### Typography
[3–5 sentences comparing type choices — font personality, heading scale, body readability, whether they use a type system or ad-hoc sizing.]

### Navigation & CTAs
[3–5 sentences comparing nav patterns — sticky vs static, CTA prominence, mobile nav approach, link count and labeling.]

### Visual Hierarchy
[3–5 sentences comparing how each site guides attention — F-pattern vs Z-pattern, focal points, progressive disclosure, scroll incentives.]

## Steal This ✦

| Pattern | From | Why It Works |
|---------|------|--------------|
| [pattern 1] | {Site} | [reason] |
| [pattern 2] | {Site} | [reason] |
| [pattern 3] | {Site} | [reason] |
| [pattern 4] | {Site} | [reason] |
| [pattern 5] | {Site} | [reason] |

## Verdict

**Winner by category:**
- Layout: {site} — because [reason]
- Color: {site} — because [reason]
- Typography: {site} — because [reason]
- Overall: {site} — [2-sentence summary of which site is stronger overall and why]
```

---

## If Playwright Is Unavailable

If browser tools are unavailable:

1. Take screenshots of both sites manually (full-page if possible, at 1440px wide).
2. Share them in the chat: `/design-compare site1.png site2.png`
3. Or describe both sites in detail and I'll analyze based on your description — include notes on colors, fonts, layout structure, and navigation pattern.

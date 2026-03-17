---
description: "Capture a competitor website with Playwright and extract its color system, typography, layout patterns, and 'steal this' recommendations."
argument-hint: "<competitor-url>"
allowed-tools: ["Read", "mcp__plugin_playwright_playwright__*"]
---

# /competitive-audit

You are running a competitive design audit. Capture a competitor's website and extract actionable design intelligence across 8 categories.

Input: **$ARGUMENTS**

## Step 1 — Parse URL

Extract the URL from `$ARGUMENTS`.

- If a bare domain is given (e.g., `stripe.com`), prepend `https://`.
- If no URL is given, ask: "Please provide a competitor URL (e.g., `stripe.com`)."

Set `TARGET_URL` to the resolved URL.

## Step 2 — Capture Sequence

Run all three captures in order.

### Desktop Capture
1. Resize browser to **1440×900**.
2. Navigate to `TARGET_URL`.
3. Take a screenshot — label it `desktop-above-fold`.
4. Take an accessibility snapshot to extract text, roles, and structure.

### Mid-Page Capture
1. Keep the browser at 1440×900.
2. Navigate to `TARGET_URL#main-content` to simulate a scroll (best-effort).
   - If the anchor doesn't exist, note "first viewport only" and skip this screenshot.
3. Take a screenshot — label it `desktop-mid-page`.

### Mobile Capture
1. Resize browser to **390×844**.
2. Navigate to `TARGET_URL`.
3. Take a screenshot — label it `mobile-above-fold`.

## Step 3 — Extract Design Intelligence

Analyze all screenshots and the accessibility snapshot. Extract findings across all 8 categories below. Use the snapshot text to extract actual values where possible (font names, hex codes in inline styles, etc.).

### 1. Color System
Extract primary, secondary, accent, background, and text colors. Report actual hex codes if visible in the snapshot or source. If not extractable, describe visually (e.g., "deep navy blue", "warm off-white").

### 2. Typography
Identify heading font family, size, weight, and body font family, size. Note if a variable font or system font stack is used. Assess line-height style (tight / normal / loose).

### 3. Layout Grid
Estimate column count, max-width (px), gutter approach (tight/spacious), and how the layout shifts at mobile breakpoint.

### 4. Navigation
Identify the top-nav pattern: transparent/solid/sticky/minimal. Note logo placement (left/center), primary CTA style in nav, and mobile nav pattern (hamburger/drawer/tabs).

### 5. Hero / Above Fold
Classify the hero pattern: split-screen / full-bleed image / centered text / video background / illustrated. Note headline approach (benefit-led / curiosity-led / feature-led) and CTA position.

### 6. Social Proof
Identify how trust is established: customer logos, testimonials (avatar + quote / card / carousel), star ratings, numbers/stats, certifications, press mentions.

### 7. CTAs & Conversion
Describe primary CTA: style (filled/outline/ghost), color, copy pattern (verb-first / outcome-first). Note secondary CTA and any urgency/scarcity signals.

### 8. Unique Patterns
List 3–5 distinctive design decisions not commonly seen — micro-interactions hinted in the snapshot, unusual layout choices, unexpected color pairings, scroll storytelling, etc.

## Step 4 — Output Report

Produce the full report in this exact format:

---

# Competitive Audit: {TARGET_URL}

**Captured:** {today's date} | Desktop (1440×900) + Mobile (390×844)

## Design System Extract

### Colors
| Role | Value | Usage |
|------|-------|-------|
| Primary | #… | Buttons, links |
| Secondary | #… | Accents |
| Background | #… | Page base |
| Text | #… | Body copy |
| Accent | #… | Highlights |

### Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| Heading 1 | … | … | … |
| Heading 2 | … | … | … |
| Body | … | … | … |
| Caption / Small | … | … | … |

### Layout
- Max width: …px
- Grid: … columns
- Gutter: …px (tight / comfortable / spacious)
- Responsive behavior: [description of how layout changes at mobile]

## Pattern Library

### Navigation
[Pattern description + why it works / what it signals to users]

### Hero / Above Fold
[Pattern description + why it works / what it signals to users]

### Social Proof
[Pattern description + why it works / what it signals to users]

### CTAs & Conversion
[Pattern description + why it works / what it signals to users]

### Unique Patterns
1. [Pattern] — [why it's notable]
2. [Pattern] — [why it's notable]
3. [Pattern] — [why it's notable]

## Steal This ✦✦✦

| Rating | Pattern | What to Take | Implementation Hint |
|--------|---------|--------------|---------------------|
| ⭐⭐⭐ | [best-in-class pattern] | [what to copy] | [how to build it] |
| ⭐⭐⭐ | … | … | … |
| ⭐⭐ | [good pattern] | … | … |
| ⭐⭐ | … | … | … |
| ⭐ | [interesting but lower priority] | … | … |

## What to Watch
[2–3 things this competitor does that may hurt them — design risks, friction points, or weaknesses a challenger could exploit]

## Next Steps
- `/design [brief based on insights above]` — apply what you learned immediately
- `/design-compare {TARGET_URL} [your-site.com]` — compare against your own site

---

## MCP Fallback

If Playwright tools are unavailable or navigation fails:

> "Playwright is unavailable. You can still get a competitive audit — share a screenshot of the competitor site and I'll analyze it directly. Or describe the site and I'll build a qualitative audit from your description."

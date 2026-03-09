<div align="center">

```
     ____            _                ____  _             _ _
    |  _ \  ___  ___(_) __ _ _ __   / ___|| |_ _   _  __| (_) ___
    | | | |/ _ \/ __| |/ _` | '_ \  \___ \| __| | | |/ _` | |/ _ \
    | |_| |  __/\__ \ | (_| | | | |  ___) | |_| |_| | (_| | | (_) |
    |____/ \___||___/_|\__, |_| |_| |____/ \__|\__,_|\__,_|_|\___/
                       |___/
```

### A Virtual Design Team for Claude Code

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Plugin-blueviolet)](https://claude.ai/claude-code)
[![Roles](https://img.shields.io/badge/Specialist_Roles-10-orange)]()
[![Commands](https://img.shields.io/badge/Slash_Commands-16-green)]()
[![Design Knowledge](https://img.shields.io/badge/Design_Knowledge-7500%2B_lines-ff69b4)]()

**Instead of generic AI design help, Design Studio assembles the right specialists for each task — just like a real design studio would staff a project.**

**Now with 16 commands** — full design workflows, Figma-native creation, brand kits, A/B variants, design sprints, prototyping, responsive variants, component docs, developer handoff, design-code sync, and more.

[Installation](#-installation) · [Commands](#-commands) · [The Team](#-the-team) · [How It Works](#-how-it-works)

</div>

---

## Quick Start

```bash
claude plugin add https://github.com/Adityaraj0421/design-studio.git
```

Then try:
```
/design Build a landing page for a SaaS analytics product
```

---

## The Team

<table>
<tr>
<td align="center" width="14%">

**Design Manager**

Orchestrates

</td>
<td align="center" width="14%">

**Creative Director**

Vision

</td>
<td align="center" width="14%">

**Product Designer**

Strategy

</td>
<td align="center" width="14%">

**UX Designer**

Flows

</td>
<td align="center" width="14%">

**UI Designer**

Visual

</td>
<td align="center" width="14%">

**UX Researcher**

Insights

</td>
<td align="center" width="14%">

**Content Designer**

Copy

</td>
</tr>
<tr>
<td align="center">

**Design System Lead**

Tokens

</td>
<td align="center">

**Motion Designer**

Animation

</td>
<td align="center">

**Figma Creator**

Figma Native

</td>
<td align="center" colspan="4">

_The Design Manager picks only the roles your task actually needs_

</td>
</tr>
</table>

---

## Commands

### `/design <task>` — Full Design Workflow

Assembles the right specialists and runs the complete workflow:

```
/design Create a 3-tier pricing page with monthly/annual toggle
/design Redesign the onboarding flow for better conversion
/design Build a real-time analytics dashboard
```

### `/design-review <file>` — Quality Audit

Runs a structured 5-point audit on existing designs:

```
/design-review ./src/pages/checkout.html
```

Checks: Accessibility (WCAG AA) · Usability Heuristics · Visual Consistency · Content Quality · Motion Design

### `/design-system` — Token Generation

Generate, extract, or audit design tokens:

```
/design-system Generate tokens from brand color #2563eb
/design-system Extract tokens from this Figma file
/design-system Audit existing code for hardcoded values
```

### `/figma <URL>` — Figma to Code

Convert Figma designs to production-ready code:

```
/figma https://figma.com/design/abc123/MyApp?node-id=1-2
```

### `/figma-create <task>` — Create Designs in Figma

Build pages, wireframes, components, and design systems directly inside Figma via the Desktop Bridge:

```
/figma-create Build a 3-screen wireframe for a saved content feature
/figma-create Set up a design system with color tokens and type scale
/figma-create Create a component set for Button with 4 variants
```

Requires the [Figma Desktop Bridge](https://www.figma.com/community/plugin/figma-desktop-bridge) plugin running in Figma Desktop.

### `/ux-audit <brief>` — Audit Against a Design Brief

Audit a Figma file for compliance against a design brief — checks page structure, frame naming, sizes, styles, components, and content:

```
/ux-audit Check the Miles UX Design Challenge submission against the brief
/ux-audit Verify all required screens are present at 1440×900
```

### `/design-handoff` — Developer Handoff Docs

Generate a complete developer handoff document from a Figma file — token maps, spacing specs, component APIs, and production-ready code snippets:

```
/design-handoff Generate handoff for the current Figma file
/design-handoff Export tokens as CSS variables and Tailwind config
```

Outputs: Markdown docs, CSS custom properties, Tailwind config, TypeScript types.

### `/figma-responsive <frame>` — Responsive Variants

Generate mobile (375×812) and tablet (768×1024) variants from a desktop Figma frame:

```
/figma-responsive S3-A / Saved Redesigned
/figma-responsive Create mobile and tablet versions of the dashboard
```

Clones the source frame, adapts layout (grid reflow, sidebar collapse, nav simplification), and validates each breakpoint with screenshots.

### `/figma-sync` — Design-Code Sync

Detect drift between Figma designs and code implementation — compare color tokens, typography, spacing, and components:

```
/figma-sync Check if Figma tokens match our Tailwind config
/figma-sync Compare design system styles against CSS custom properties
```

Outputs a sync report with drift score, per-token comparison tables, and optional patches for both Figma and code.

### `/design-present <type>` — Design Presentation

Generate an interactive HTML presentation from Figma screens:

```
/design-present Create a walkthrough presentation of the dashboard screens
/design-present Build a pitch deck from the product mockups
/design-present Generate a case study presentation
```

Features: keyboard navigation, progress bar, annotations, zoom, dark/light mode, fullscreen.

### `/brand-kit <color> [mood]` — Brand Kit Generation

Generate a complete brand kit from 1-2 colors and a mood:

```
/brand-kit #6366f1 premium
/brand-kit Generate a warm brand from #f59e0b
```

Outputs: 10-shade color palettes, secondary/accent colors, type scale, spacing scale, CSS custom properties, Tailwind config, JSON tokens, Figma styles, and a visual HTML reference page.

### `/component-docs` — Component Documentation

Auto-generate Storybook-style documentation from Figma component sets:

```
/component-docs Document all components in the current Figma file
/component-docs Generate docs for the Button component set
```

Outputs: prop tables, variant grids, usage guidelines, code examples (HTML/React), rendered screenshots.

### `/figma-prototype` — Prototype Connections

Create interactive prototype connections between Figma frames:

```
/figma-prototype Connect all screens in the onboarding flow
/figma-prototype Auto-detect buttons and link them to target screens
```

Supports transition presets: slide, dissolve, move-in. Auto-detects interactive elements (buttons, links, nav items, cards).

### `/site-to-figma <URL>` — Website to Figma

Capture a live website and recreate it as an editable Figma design:

```
/site-to-figma https://example.com
/site-to-figma Capture the hero section of stripe.com
```

Extracts color palette, typography, section structure via Playwright, then rebuilds as auto-layout Figma frames with Paint/Text Styles.

### `/ab-variants <frame> [dimension]` — A/B Test Variants

Generate A/B test design variants from an existing Figma screen:

```
/ab-variants Hero Section layout
/ab-variants Pricing Page cta
/ab-variants Landing Page all
```

Creates control + test variants with layout, CTA, copy, or color changes. Includes testing recommendations (sample size, duration, success metrics).

### `/design-sprint <problem>` — Design Sprint

Guided 5-phase design sprint methodology:

```
/design-sprint Improve signup conversion for our SaaS product
/design-sprint Redesign the checkout experience to reduce abandonment
```

Phases: Understand (problem mapping) → Diverge (8 solution ideas) → Decide (weighted matrix) → Prototype (build testable solution) → Validate (test script + success metrics).

---

## Agents

| Agent | What It Does | Runs In |
|-------|-------------|---------|
| **accessibility-auditor** | Comprehensive WCAG AA compliance audit with specific code fixes | Background |
| **design-qa** | Visual QA at 3 breakpoints, token compliance scoring, interaction state check | Background |
| **figma-creator** | Creates pages, frames, components, and styles directly in Figma via Desktop Bridge | Foreground |
| **design-critique** | Automated UX heuristic review — Nielsen's 10 heuristics, visual audit, interaction states | Foreground |
| **design-lint** | Scans Figma files for orphan colors, non-standard spacing, low contrast, missing auto-layout | Foreground |

Background agents run in parallel with your main work. Foreground agents run interactively.

---

## How It Works

```
                    Your Request
                         │
                         ▼
               ┌─────────────────┐
               │  Design Manager  │ ← Analyzes task
               └────────┬────────┘
                         │
                         ▼
              ┌──────────────────┐
              │ Creative Director │ ← Sets visual direction
              └────────┬─────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ Research │ │ Strategy │ │ Creative │ ← Only needed roles
    └────┬─────┘ └────┬─────┘ └────┬─────┘   are activated
         │            │            │
         └────────────┼────────────┘
                      │
              ┌───────┴───────┐
              │ Figma Creation │ ← Build in Figma (optional)
              └───────┬───────┘
                      ▼
              ┌───────────────┐
              │  Polish Phase  │ ← Motion + consistency
              └───────┬───────┘
                      ▼
              ┌───────────────┐
              │   Delivery     │ ← Build, preview, deploy
              └───────────────┘
```

**Adaptive staffing:** A simple button redesign activates 1-2 roles. A full product feature activates 4-7 roles with the complete workflow.

---

## Auto-Detection

The plugin automatically detects your project context at session start:

| Detects | How |
|---------|-----|
| CSS Framework | Tailwind config, Bootstrap in package.json |
| JS Framework | React, Vue, Svelte, Next.js |
| Design Tokens | `.tokens.json`, `tokens.css`, CSS custom properties |
| Figma | `.figmarc`, Code Connect config |
| Deployment | `firebase.json` |

Recommendations adapt to match your stack — no manual configuration needed.

---

## What's Inside

```
design-studio/
├── .claude-plugin/plugin.json          # Plugin manifest (v2.0.0)
├── skills/design/
│   ├── SKILL.md                        # Design Manager orchestration
│   ├── settings.local.md              # User-configurable preferences
│   └── references/
│       ├── product-designer.md         # End-to-end UX, feature scoping
│       ├── ux-designer.md              # Flows, wireframes, IA
│       ├── ui-designer.md              # Color, typography, layout, components
│       ├── ux-researcher.md            # Heuristics, accessibility, edge cases
│       ├── content-designer.md         # Microcopy, errors, tone of voice
│       ├── design-system-lead.md       # 3-tier tokens, theming, dark mode, Figma styles
│       ├── motion-designer.md          # Timing, easing, micro-interactions
│       ├── figma-workflow.md           # Figma MCP tools, design-to-code + creation
│       ├── figma-creation.md           # Figma API patterns via Desktop Bridge
│       └── deployment.md              # Preview server, Firebase Hosting
├── commands/                           # 16 slash commands
│   ├── design.md                      # Full design workflow
│   ├── design-review.md               # Quality audit
│   ├── design-system.md               # Token generation
│   ├── figma.md                       # Figma to code
│   ├── figma-create.md                # Create designs in Figma
│   ├── ux-audit.md                    # Audit against brief
│   ├── design-handoff.md             # Developer handoff docs
│   ├── figma-responsive.md           # Responsive variant generation
│   ├── figma-sync.md                  # Design-code drift detection
│   ├── design-present.md             # HTML presentation from Figma
│   ├── brand-kit.md                   # Brand kit generation
│   ├── component-docs.md             # Storybook-style docs
│   ├── figma-prototype.md            # Prototype connections
│   ├── site-to-figma.md              # Website to Figma capture
│   ├── ab-variants.md                # A/B test variants
│   └── design-sprint.md              # 5-phase design sprint
├── agents/                             # 5 specialist agents
│   ├── accessibility-auditor.md       # WCAG AA compliance
│   ├── design-qa.md                   # Visual QA
│   ├── figma-creator.md              # Figma-native creation
│   ├── design-critique.md            # UX heuristic review
│   └── design-lint.md                # Design file linting
├── hooks/hooks.json                    # SessionStart auto-detection
├── scripts/
│   ├── detect-design-context.sh        # Project stack detection
│   └── generate-tokens.sh             # CSS token template generator
├── evals/evals.json                    # 12 test cases with assertions
└── CONTRIBUTING.md                    # Contributor guide
```

<details>
<summary><b>Design knowledge breakdown (7,500+ lines)</b></summary>

| File | Lines | Covers |
|------|-------|--------|
| **figma-creation.md** | **693** | **Figma Desktop Bridge API, async patterns, auto-layout, component sets, paint/text styles, variables, wireframe patterns, annotations, screenshot validation** |
| design-system-lead.md | 427 | 3-tier tokens, theming, dark mode, Figma paint/text style creation, component sets |
| motion-designer.md | 360 | Timing, easing functions, transitions, micro-interactions, reduced motion |
| **design-lint.md** | **335** | **6 lint rule categories, orphan colors, contrast, non-standard spacing, auto-layout quality, component hygiene, scored reports** |
| **design-sprint.md** | **327** | **5-phase sprint: Understand, Diverge, Decide, Prototype, Validate — problem framing, ideation, decision matrix, test plans** |
| **site-to-figma.md** | **310** | **Website capture via Playwright, style extraction, Figma recreation as auto-layout frames with Paint/Text Styles** |
| **brand-kit.md** | **301** | **HSL shade generation, secondary color derivation, type scale, spacing scale, CSS/Tailwind/JSON/Figma outputs** |
| **figma-responsive.md** | **298** | **Responsive variant generation, layout analysis, breakpoint adaptation, grid reflow, sidebar collapse** |
| **design-handoff.md** | **278** | **Developer handoff docs, token maps, spacing specs, component APIs, CSS/Tailwind/TypeScript exports** |
| SKILL.md | 265 | Design Manager orchestration, team assembly, workflow phases, output formats |
| **design-critique.md** | **263** | **UX heuristic review, Nielsen's 10 heuristics, visual audit, interaction states, critique reporting** |
| **component-docs.md** | **262** | **Auto-generated Storybook-style docs, prop tables, variant grids, usage guidelines, code examples** |
| **figma-prototype.md** | **258** | **Prototype connections, interactive element detection, transition presets, flow specification** |
| **figma-sync.md** | **252** | **Design-code drift detection, token comparison, typography/spacing sync, patch generation** |
| **ab-variants.md** | **248** | **A/B test variant generation, layout/CTA/copy/color changes, testing recommendations** |
| figma-workflow.md | 246 | Figma MCP tools, design-to-code, Figma-native creation workflow |
| ui-designer.md | 243 | Color theory, type scale, grid, components, responsive patterns |
| ux-designer.md | 239 | User flows, IA, wireframing, interaction design, usability |
| **design-present.md** | **233** | **Interactive HTML presentations, keyboard nav, annotations, walkthrough/pitch/case-study types** |
| content-designer.md | 229 | Microcopy, error formulas, empty states, tone, number formatting |
| ux-audit.md | 213 | Figma file compliance auditing, brief parsing, structural/style/component checks |
| ux-researcher.md | 207 | Nielsen's heuristics, WCAG AA checklist, mental models, edge cases |
| deployment.md | 198 | Preview server, Firebase Hosting, image/CSS/font optimization |
| figma-create.md | 142 | Create designs in Figma command — pages, wireframes, components, design systems |
| figma-creator.md | 142 | Figma creation specialist agent — layout building, component creation, validation |
| product-designer.md | 140 | Feature scoping, user outcomes, business alignment, design patterns |
| design-qa.md | 127 | Visual QA at 3 breakpoints, token compliance, interaction states |
| accessibility-auditor.md | 105 | WCAG AA compliance, color contrast, semantic HTML, keyboard nav |

</details>

---

## Tech Stack Defaults

| Category | Default | Why |
|----------|---------|-----|
| Styling | Tailwind CSS | Utility-first, rapid iteration |
| Icons | Lucide | Clean, consistent, tree-shakeable |
| Fonts | Inter | Optimized for UI, great readability |
| Charts | Chart.js / SVG | Lightweight, no heavy deps |
| Animations | CSS transitions | No JS libraries for simple motion |
| Preview | Claude Preview MCP | Live results in your editor |
| Deployment | Firebase Hosting | One-command deploy |

All defaults adapt when the plugin detects your project uses a different stack.

---

## Installation

### One-liner

```bash
claude plugin add https://github.com/Adityaraj0421/design-studio.git
```

### Manual

```bash
git clone https://github.com/Adityaraj0421/design-studio.git ~/.claude/plugins/design-studio
```

Restart Claude Code to load the plugin.

---

## Requirements

- [Claude Code](https://claude.ai/claude-code) CLI
- No additional dependencies

---

<div align="center">

**Built with Claude Code**

[Report Issues](https://github.com/Adityaraj0421/design-studio/issues) · [MIT License](LICENSE)

</div>

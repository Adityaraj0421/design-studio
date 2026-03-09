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
[![Roles](https://img.shields.io/badge/Specialist_Roles-7-orange)]()
[![Commands](https://img.shields.io/badge/Slash_Commands-4-green)]()
[![Design Knowledge](https://img.shields.io/badge/Design_Knowledge-2300%2B_lines-ff69b4)]()

**Instead of generic AI design help, Design Studio assembles the right specialists for each task — just like a real design studio would staff a project.**

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
<td align="center" colspan="5">

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

---

## Agents

| Agent | What It Does | Runs In |
|-------|-------------|---------|
| **accessibility-auditor** | Comprehensive WCAG AA compliance audit with specific code fixes | Background |
| **design-qa** | Visual QA at 3 breakpoints, token compliance scoring, interaction state check | Background |

Both agents run in parallel with your main work — no waiting around.

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
├── .claude-plugin/plugin.json          # Plugin manifest
├── skills/design/
│   ├── SKILL.md                        # Design Manager orchestration (216 lines)
│   └── references/
│       ├── product-designer.md         # End-to-end UX, feature scoping
│       ├── ux-designer.md              # Flows, wireframes, IA
│       ├── ui-designer.md              # Color, typography, layout, components
│       ├── ux-researcher.md            # Heuristics, accessibility, edge cases
│       ├── content-designer.md         # Microcopy, errors, tone of voice
│       ├── design-system-lead.md       # 3-tier tokens, theming, dark mode
│       ├── motion-designer.md          # Timing, easing, micro-interactions
│       ├── figma-workflow.md           # Figma MCP tools, design-to-code
│       └── deployment.md              # Preview server, Firebase Hosting
├── commands/                           # 4 slash commands
├── agents/                             # 2 specialist agents
├── hooks/hooks.json                    # SessionStart auto-detection
├── scripts/
│   ├── detect-design-context.sh        # Project stack detection
│   └── generate-tokens.sh             # CSS token template generator
└── evals/evals.json                    # 3 test cases with assertions
```

<details>
<summary><b>Design knowledge breakdown (2,300+ lines)</b></summary>

| Reference | Lines | Covers |
|-----------|-------|--------|
| motion-designer.md | 361 | Timing, easing functions, transitions, micro-interactions, reduced motion |
| design-system-lead.md | 301 | 3-tier tokens (primitives/semantic/component), theming, dark mode |
| ui-designer.md | 244 | Color theory, type scale, grid, components, responsive patterns |
| ux-designer.md | 240 | User flows, IA, wireframing, interaction design, usability |
| content-designer.md | 230 | Microcopy, error formulas, empty states, tone, number formatting |
| ux-researcher.md | 208 | Nielsen's heuristics, WCAG AA checklist, mental models, edge cases |
| deployment.md | 199 | Preview server, Firebase Hosting, image/CSS/font optimization |
| figma-workflow.md | 189 | Figma MCP tools, URL parsing, design-to-code translation |
| product-designer.md | 141 | Feature scoping, user outcomes, business alignment, design patterns |

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

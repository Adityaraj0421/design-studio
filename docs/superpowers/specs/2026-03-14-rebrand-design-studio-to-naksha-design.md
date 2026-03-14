# Rebrand: design-studio → naksha

**Date:** 2026-03-14
**Version:** v3.2.0 → v3.3.0
**Type:** Brand identity change — no functional changes

---

## Overview

The `design-studio` Claude Code plugin is being rebranded to `naksha` — the same brand as the Naksha SaaS workspace (naksha.ai). The plugin becomes the Claude Code surface of the Naksha product family. The two products share a name, visual identity, and tagline while remaining separate GitHub repositories.

---

## Decisions Made

| Decision | Choice | Rationale |
|---|---|---|
| Plugin name | `naksha` | Same name as the SaaS — maximum brand unity |
| GitHub repo name | `naksha-studio` | `naksha` is taken by the SaaS repo; this distinguishes surface |
| Plugin install path | `~/.claude/plugins/naksha` | Internal name is `naksha`, repo name is `naksha-studio` |
| Tagline | "Your agency's design brain. Always on, always yours." | Exact Naksha tagline — no plugin-specific variation |
| Repo structure | Keep separate repos | Monorepo rejected: install would clone full Next.js SaaS |
| Version bump | 3.2.0 → 3.3.0 | Minor bump: identity change, no breaking changes |

---

## Scope

### What Changes

1. **`.claude-plugin/plugin.json`**
   - `name`: `"design-studio"` → `"naksha"`
   - `description`: Rewritten to match Naksha tone and positioning

2. **`README.md`**
   - Full header rewrite: Naksha logo mark (3×3 circle grid) + wordmark
   - Color palette: dark background `#1A1A2E`, orange accent `#E8633A`
   - Font reference: Inter
   - Tagline: "Your agency's design brain. Always on, always yours."
   - Badges: retain role/command/knowledge counts, update styling to Naksha identity
   - Install command updated to reference `naksha-studio` repo
   - Cross-link to naksha.ai added in intro

3. **`assets/social-preview.svg`**
   - Regenerate with Naksha visual identity
   - Dark background `#1A1A2E`, orange `#E8633A`, naksha wordmark + circle mark
   - Stats: 13 roles, 27 commands, 9500+ lines

4. **`assets/social-preview.html`**
   - Update repo URL: `github.com/Adityaraj0421/design-studio` → `github.com/Adityaraj0421/naksha-studio`
   - Used as source for regenerating the SVG — must stay in sync

5. **`assets/demo.svg`**
   - Update plugin name reference from "design-studio" to "naksha"
   - Update version label to v3.3.0

6. **`skills/design/SKILL.md`**
   - Line 81: `**design-studio** plugin` → `**naksha** plugin`
   - Only this single prose reference changes; all orchestration logic is unchanged

7. **`CONTRIBUTING.md`**
   - Install path: `cp -r . ~/.claude/plugins/design-studio/` → `cp -r . ~/.claude/plugins/naksha/`
   - Directory tree label: `design-studio/` → `naksha/`

8. **`.github/workflows/design-check.yml`**
   - PR comment URL: `https://github.com/Adityaraj0421/design-studio` → `https://github.com/Adityaraj0421/naksha-studio`
   - PR comment link text: `Design Studio` → `Naksha`

9. **`CHANGELOG.md`**
   - Prepend new v3.3.0 entry (rebrand notes)

10. **GitHub repository**
    - Rename: `Adityaraj0421/design-studio` → `Adityaraj0421/naksha-studio`
    - Update About description and topics to reflect naksha identity
    - Create v3.3.0 release with rebrand notes

### What Does NOT Change

- All 27 slash commands (`/design`, `/wireframe`, `/brand-kit`, etc.)
- All 13 specialist role reference files in `skills/design/references/`
- All 5 agents in `agents/`
- Hooks (`hooks/hooks.json`)
- Evals (`evals/evals.json`) — 42 test cases
- Any functional behaviour of the plugin
- Scripts (`scripts/`) — internal code comments referencing "design-studio" are not updated; they are developer-facing only and do not affect users

---

## Naksha Brand Identity Reference

| Token | Value |
|---|---|
| Primary | `#E8633A` |
| Primary hover | `#C4522E` |
| Primary light | `#FFF0EB` |
| Ink (text) | `#1A1A2E` |
| Canvas (bg) | `#FAFAF8` |
| Surface | `#F5F0EB` |
| Border | `#E8DDD4` |
| Font | Inter (700 weight for logo, variable for body) |
| Logo mark | 3×3 grid of circles — corners + center at full opacity, edges at 12–45% |
| Wordmark | "naksha" lowercase, letter-spacing −0.08em |

---

## README Structure (Post-Rebrand)

```
<div align="center">
  [Naksha circle mark SVG inline]
  naksha wordmark
  "Your agency's design brain. Always on, always yours."
  [Badges: roles / commands / knowledge lines / MIT / Claude Code Plugin]
  [Nav: Quick Start · Commands · The Team · How It Works · Changelog]
</div>

---

## Quick Start
git clone https://github.com/Adityaraj0421/naksha-studio ~/.claude/plugins/naksha

## Demo
[demo.svg — updated with naksha branding]

## Commands (unchanged)
...

## The Team (unchanged)
...
```

---

## plugin.json Description (Draft)

```
A virtual design team for Claude Code, powered by Naksha. Assembles specialist roles — UI designer, UX researcher, content designer, Figma expert, data viz, email, social, and more — for any design task. 13 roles, 27 commands, 9,500+ lines of expert design knowledge. Your agency's design brain, inside your terminal.
```

---

## CHANGELOG Entry (v3.3.0)

```markdown
## [3.3.0] — 2026-03-14

Rebrand — design-studio becomes naksha.

### Changed

- Plugin renamed from `design-studio` to `naksha`
- Visual identity updated to match Naksha brand (#E8633A, #1A1A2E, Inter, circle mark)
- README header rewritten with Naksha logo, tagline, and dark/orange palette
- `assets/social-preview.svg` regenerated with Naksha identity
- `assets/demo.svg` updated with naksha name and v3.3.0 label
- GitHub repository renamed: `design-studio` → `naksha-studio`
- plugin.json description rewritten to Naksha tone

No functional changes — all 27 commands, 13 roles, agents, hooks, and evals are unchanged.
```

---

## GitHub Release Notes (v3.3.0)

**Title:** `v3.3.0 — naksha`

**Body:**
```
design-studio is now naksha — the Claude Code surface of the Naksha design workspace.

## What Changed
- Plugin renamed to `naksha` (install path: `~/.claude/plugins/naksha`)
- Visual identity: Naksha brand colors, logo mark, and tagline
- GitHub repo renamed to `naksha-studio`
- README and assets fully rebranded

## What Didn't Change
All 27 commands, 13 specialist roles, agents, hooks, and evals are untouched. Zero functional changes.

## Install
git clone https://github.com/Adityaraj0421/naksha-studio ~/.claude/plugins/naksha
```

---

## Out of Scope

- Merging design-studio and naksha repos (rejected — install experience)
- Renaming the SaaS `naksha` repo
- Adding new features or commands
- Changing any role file content
- Splitting or reorganising the directory structure

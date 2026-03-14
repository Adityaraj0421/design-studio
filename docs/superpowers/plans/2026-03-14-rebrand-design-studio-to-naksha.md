# Rebrand design-studio → naksha Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the `design-studio` Claude Code plugin to `naksha`, adopting the Naksha SaaS brand identity (orange `#E8633A`, dark `#1A1A2E`, Inter font, 3×3 circle mark) across all 10 affected files.

**Architecture:** Pure content/identity change — no functional code changes. 10 files get text/SVG edits; all 27 commands, 13 roles, agents, hooks, and evals are untouched. Version bumps from 3.2.0 → 3.3.0.

**Tech Stack:** SVG, Markdown, JSON, bash (grep for verification)

**Spec:** `docs/superpowers/specs/2026-03-14-rebrand-design-studio-to-naksha-design.md`

---

## Chunk 1: Metadata + Text File Edits

Four small text changes, each a single Edit tool call. Fast to do, easy to verify with grep.

**Files:**
- Modify: `.claude-plugin/plugin.json`
- Modify: `skills/design/SKILL.md` (line 81 only)
- Modify: `CONTRIBUTING.md` (lines 8 and 139)
- Modify: `.github/workflows/design-check.yml` (line 93 only)

---

### Task 1: plugin.json — name, description, version

- [ ] **Step 1: Apply the edit**

  In `.claude-plugin/plugin.json`, make three changes:

  Change `"name"` field:
  ```
  "name": "design-studio"
  →
  "name": "naksha"
  ```

  Change `"version"` field:
  ```
  "version": "3.2.0"
  →
  "version": "3.3.0"
  ```

  Change `"description"` field to:
  ```
  "description": "A virtual design team for Claude Code, powered by Naksha. Assembles specialist roles — UI designer, UX researcher, content designer, Figma expert, data viz, email, social, and more — for any design task. 13 roles, 27 commands, 9,500+ lines of expert design knowledge. Your agency's design brain, inside your terminal."
  ```

- [ ] **Step 2: Verify**

  Run: `grep -E '"name"|"version"|"description"' .claude-plugin/plugin.json`

  Expected output contains:
  ```
  "name": "naksha"
  "version": "3.3.0"
  "description": "A virtual design team for Claude Code, powered by Naksha...
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add .claude-plugin/plugin.json
  git commit -m "chore: bump version to 3.3.0, rename plugin to naksha"
  ```

---

### Task 2: SKILL.md — single prose reference

- [ ] **Step 1: Apply the edit**

  In `skills/design/SKILL.md`, line 81, change:
  ```
  This skill is part of the **design-studio** plugin. For focused workflows, use these commands:
  ```
  to:
  ```
  This skill is part of the **naksha** plugin. For focused workflows, use these commands:
  ```

- [ ] **Step 2: Verify**

  Run: `grep -n "design-studio\|naksha" skills/design/SKILL.md | head -5`

  Expected: no `design-studio` hits, `naksha` present on line 81.

- [ ] **Step 3: Commit**

  ```bash
  git add skills/design/SKILL.md
  git commit -m "chore: update plugin name reference in SKILL.md"
  ```

---

### Task 3: CONTRIBUTING.md — install path and directory label

- [ ] **Step 1: Apply edit to line 8 (directory tree label)**

  In `CONTRIBUTING.md` line 8, change:
  ```
  design-studio/
  ```
  to:
  ```
  naksha/
  ```

- [ ] **Step 2: Apply edit to line 139 (install command)**

  In `CONTRIBUTING.md` line 139, change:
  ```
  cp -r . ~/.claude/plugins/design-studio/
  ```
  to:
  ```
  cp -r . ~/.claude/plugins/naksha/
  ```

- [ ] **Step 3: Verify**

  Run: `grep -n "design-studio" CONTRIBUTING.md`

  Expected: no output (zero matches).

- [ ] **Step 4: Commit**

  ```bash
  git add CONTRIBUTING.md
  git commit -m "chore: update install path in CONTRIBUTING.md"
  ```

---

### Task 4: design-check.yml — PR comment URL and link text

- [ ] **Step 1: Apply the edit**

  In `.github/workflows/design-check.yml`, line 93, change:
  ```
  body += `\n> Powered by [Design Studio](https://github.com/Adityaraj0421/design-studio) · [Configure](.design-lint.json)`;
  ```
  to:
  ```
  body += `\n> Powered by [Naksha](https://github.com/Adityaraj0421/naksha-studio) · [Configure](.design-lint.json)`;
  ```

- [ ] **Step 2: Verify**

  Run: `grep -n "Design Studio\|design-studio\|naksha" .github/workflows/design-check.yml`

  Expected: no `design-studio` or `Design Studio` hits; `naksha-studio` present on line 93.

- [ ] **Step 3: Commit**

  ```bash
  git add .github/workflows/design-check.yml
  git commit -m "chore: update repo URL and link text in design-check workflow"
  ```

---

## Chunk 2: README.md + CHANGELOG.md

The two most visible user-facing text files. README gets a targeted header rewrite + URL updates throughout; CHANGELOG gets a new entry prepended.

**Files:**
- Modify: `README.md` (header block lines 1–17, install command lines 24 and 806, directory label line 715, footer line 824)
- Modify: `CHANGELOG.md` (prepend new entry)

---

### Task 5: README.md — header block

- [ ] **Step 1: Replace lines 1–17 (the `<div align="center">` block)**

  Replace the entire opening `<div align="center">...</div>` block with:

  ```markdown
  <div align="center">

  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="#E8633A"/><circle cx="26" cy="10" r="8" fill="#E8633A" fill-opacity="0.12"/><circle cx="42" cy="10" r="8" fill="#E8633A"/><circle cx="10" cy="26" r="8" fill="#E8633A" fill-opacity="0.12"/><circle cx="26" cy="26" r="8" fill="#E8633A" fill-opacity="0.45"/><circle cx="42" cy="26" r="8" fill="#E8633A" fill-opacity="0.12"/><circle cx="10" cy="42" r="8" fill="#E8633A"/><circle cx="26" cy="42" r="8" fill="#E8633A" fill-opacity="0.12"/><circle cx="42" cy="42" r="8" fill="#E8633A"/></svg>

  # naksha

  **Your agency's design brain. Always on, always yours.**

  *The Naksha design team, inside your terminal — 13 specialist roles activate automatically based on what you're building. Also available as a web workspace at [naksha.ai](https://naksha.ai).*

  <br>

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Claude Code](https://img.shields.io/badge/Claude_Code-Plugin-blueviolet)](https://claude.ai/claude-code)
  [![Roles](https://img.shields.io/badge/Specialist_Roles-13-orange)]()
  [![Commands](https://img.shields.io/badge/Slash_Commands-27-green)]()
  [![Design Knowledge](https://img.shields.io/badge/Design_Knowledge-9500%2B_lines-E8633A)]()

  [Quick Start](#-quick-start) · [Commands](#-commands) · [The Team](#-the-team) · [How It Works](#-how-it-works) · [Changelog](CHANGELOG.md)

  </div>
  ```

- [ ] **Step 2: Verify header**

  Run: `head -30 README.md`

  Expected: SVG circle mark, `# naksha`, tagline, badges with 13 roles and E8633A color.

---

### Task 6: README.md — install commands and repo URLs

Four occurrences of `design-studio` remain in the body of README after the header is replaced.

- [ ] **Step 1: Line 24 — Quick Start install command**

  Change:
  ```
  git clone https://github.com/Adityaraj0421/design-studio.git ~/.claude/plugins/design-studio
  ```
  to:
  ```
  git clone https://github.com/Adityaraj0421/naksha-studio.git ~/.claude/plugins/naksha
  ```

- [ ] **Step 2: Line ~715 — directory tree label in plugin structure section**

  Change:
  ```
  design-studio/
  ```
  to:
  ```
  naksha/
  ```

  (This is the directory tree label — only change this exact standalone line, not others.)

- [ ] **Step 3: Line ~806 — second install command (Contributing / Development section)**

  Change:
  ```
  git clone https://github.com/Adityaraj0421/design-studio.git ~/.claude/plugins/design-studio
  ```
  to:
  ```
  git clone https://github.com/Adityaraj0421/naksha-studio.git ~/.claude/plugins/naksha
  ```

- [ ] **Step 4: Line ~824 — footer report issues link**

  Change:
  ```
  [Report Issues](https://github.com/Adityaraj0421/design-studio/issues) · [Changelog](CHANGELOG.md) · [MIT License](LICENSE)
  ```
  to:
  ```
  [Report Issues](https://github.com/Adityaraj0421/naksha-studio/issues) · [Changelog](CHANGELOG.md) · [MIT License](LICENSE)
  ```

- [ ] **Step 5: Verify — no design-studio references remain**

  Run: `grep -n "design-studio" README.md`

  Expected: **no output** (zero matches).

- [ ] **Step 6: Commit**

  ```bash
  git add README.md
  git commit -m "docs: rebrand README to naksha identity"
  ```

---

### Task 7: CHANGELOG.md — prepend v3.3.0 entry

- [ ] **Step 1: Prepend new entry before the existing `## [3.2.0]` line**

  The file currently starts with:
  ```
  # Changelog

  All notable changes to Design Studio are documented here.

  ## [3.2.0] — 2026-03-14
  ```

  Change it to:
  ```
  # Changelog

  All notable changes to naksha are documented here.

  ## [3.3.0] — 2026-03-14

  Rebrand — design-studio becomes naksha.

  ### Changed

  - Plugin renamed from `design-studio` to `naksha`
  - Visual identity updated to Naksha brand (`#E8633A`, `#1A1A2E`, Inter, 3×3 circle mark)
  - README header rewritten with Naksha logo mark, wordmark, and tagline
  - `assets/social-preview.svg` regenerated with Naksha dark/orange identity
  - `assets/social-preview.html` source updated with Naksha identity
  - `assets/demo.svg` updated with naksha name and v3.3.0 label
  - `skills/design/SKILL.md` prose reference updated
  - `CONTRIBUTING.md` install path updated
  - `.github/workflows/design-check.yml` PR comment URL updated
  - GitHub repository renamed: `design-studio` → `naksha-studio`

  No functional changes — all 27 commands, 13 roles, agents, hooks, and evals are unchanged.

  ---

  ## [3.2.0] — 2026-03-14
  ```

- [ ] **Step 2: Verify**

  Run: `head -35 CHANGELOG.md`

  Expected: `## [3.3.0]` appears before `## [3.2.0]`. "naksha" in the changelog header line.

- [ ] **Step 3: Commit**

  ```bash
  git add CHANGELOG.md
  git commit -m "docs: add v3.3.0 changelog entry for naksha rebrand"
  ```

---

## Chunk 3: Asset Regeneration + GitHub

Rebuild the three visual assets with Naksha's identity, then complete the GitHub rename and release.

**Files:**
- Rewrite: `assets/social-preview.html`
- Rewrite: `assets/social-preview.svg`
- Modify: `assets/demo.svg` (text node updates only)
- GitHub: repo rename → `naksha-studio`, About update, v3.3.0 release

---

### Task 8: assets/social-preview.html — full identity rewrite

This file is the HTML source used to generate the social preview image. Rewrite it completely to use the Naksha visual identity.

- [ ] **Step 1: Overwrite the file**

  Replace the full contents of `assets/social-preview.html` with:

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1280, height=640">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1280px;
      height: 640px;
      overflow: hidden;
      font-family: 'Inter', system-ui, sans-serif;
      background: #1A1A2E;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      color: #fff;
    }

    .glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 900px;
      height: 500px;
      background: radial-gradient(ellipse, rgba(232,99,58,0.06) 0%, transparent 70%);
      pointer-events: none;
    }

    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }

    .logo-mark {
      display: grid;
      grid-template-columns: repeat(3, 16px);
      gap: 7px;
      margin-bottom: 20px;
    }

    .dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #E8633A;
    }
    .dot.ghost { background: rgba(232,99,58,0.12); }
    .dot.mid   { background: rgba(232,99,58,0.45); }

    .wordmark {
      font-size: 88px;
      font-weight: 700;
      letter-spacing: -0.08em;
      color: #ffffff;
      line-height: 1;
      margin-bottom: 18px;
    }

    .tagline {
      font-size: 21px;
      font-weight: 400;
      color: rgba(255,255,255,0.42);
      margin-bottom: 36px;
      letter-spacing: 0;
    }

    .divider {
      width: 120px;
      height: 1px;
      background: rgba(232,99,58,0.28);
      margin-bottom: 36px;
    }

    .stats {
      display: flex;
      align-items: center;
      gap: 0;
    }

    .stat {
      text-align: center;
      padding: 0 48px;
    }

    .stat + .stat {
      border-left: 1px solid rgba(255,255,255,0.08);
    }

    .stat-number {
      font-size: 32px;
      font-weight: 700;
      color: #E8633A;
      line-height: 1.1;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 11px;
      font-weight: 600;
      color: rgba(255,255,255,0.3);
      text-transform: uppercase;
      letter-spacing: 2.5px;
    }

    .footer {
      position: absolute;
      bottom: 28px;
      left: 60px;
      right: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-url {
      font-size: 13px;
      font-weight: 500;
      color: rgba(255,255,255,0.2);
      letter-spacing: 0.2px;
    }

    .footer-license {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: rgba(232,99,58,0.5);
    }
  </style>
  </head>
  <body>
    <div class="glow"></div>
    <div class="content">
      <div class="logo-mark">
        <div class="dot"></div>
        <div class="dot ghost"></div>
        <div class="dot"></div>
        <div class="dot ghost"></div>
        <div class="dot mid"></div>
        <div class="dot ghost"></div>
        <div class="dot"></div>
        <div class="dot ghost"></div>
        <div class="dot"></div>
      </div>
      <div class="wordmark">naksha</div>
      <div class="tagline">Your agency's design brain. Always on, always yours.</div>
      <div class="divider"></div>
      <div class="stats">
        <div class="stat">
          <div class="stat-number">13</div>
          <div class="stat-label">Roles</div>
        </div>
        <div class="stat">
          <div class="stat-number">27</div>
          <div class="stat-label">Commands</div>
        </div>
        <div class="stat">
          <div class="stat-number">9,500+</div>
          <div class="stat-label">Lines</div>
        </div>
        <div class="stat">
          <div class="stat-number">5</div>
          <div class="stat-label">Agents</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span class="footer-url">github.com/Adityaraj0421/naksha-studio</span>
      <span class="footer-license">MIT License</span>
    </div>
  </body>
  </html>
  ```

- [ ] **Step 2: Verify**

  Run: `grep -c "naksha\|E8633A\|1A1A2E" assets/social-preview.html`

  Expected: output ≥ 10 (multiple brand references present).

  Run: `grep "design-studio\|Design Studio\|DM Serif\|0D9668\|F5F0E8" assets/social-preview.html`

  Expected: **no output** (all old brand tokens removed).

- [ ] **Step 3: Commit**

  ```bash
  git add assets/social-preview.html
  git commit -m "assets: rewrite social-preview.html with Naksha identity"
  ```

---

### Task 9: assets/social-preview.svg — full SVG rewrite

The SVG is what GitHub and the README display. Rewrite it to match the new HTML source.

- [ ] **Step 1: Overwrite the file with the new SVG**

  Replace the full contents of `assets/social-preview.svg` with:

  ```svg
  <svg width="1280" height="640" viewBox="0 0 1280 640" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="1280" height="640" fill="#1A1A2E"/>
    <!-- Centre glow -->
    <ellipse cx="640" cy="310" rx="560" ry="300" fill="#E8633A" fill-opacity="0.04"/>

    <!-- Logo mark: 3×3 circle grid, r=8, spacing=22, centred at x=640 -->
    <!-- Col centres: 618, 640, 662 | Row centres: 208, 230, 252 -->
    <circle cx="618" cy="208" r="8" fill="#E8633A"/>
    <circle cx="640" cy="208" r="8" fill="#E8633A" fill-opacity="0.12"/>
    <circle cx="662" cy="208" r="8" fill="#E8633A"/>
    <circle cx="618" cy="230" r="8" fill="#E8633A" fill-opacity="0.12"/>
    <circle cx="640" cy="230" r="8" fill="#E8633A" fill-opacity="0.45"/>
    <circle cx="662" cy="230" r="8" fill="#E8633A" fill-opacity="0.12"/>
    <circle cx="618" cy="252" r="8" fill="#E8633A"/>
    <circle cx="640" cy="252" r="8" fill="#E8633A" fill-opacity="0.12"/>
    <circle cx="662" cy="252" r="8" fill="#E8633A"/>

    <!-- Wordmark "naksha" -->
    <text x="640" y="350"
      text-anchor="middle"
      font-family="Inter, system-ui, -apple-system, sans-serif"
      font-size="82"
      font-weight="700"
      fill="#FFFFFF"
      letter-spacing="-6">naksha</text>

    <!-- Tagline -->
    <text x="640" y="397"
      text-anchor="middle"
      font-family="Inter, system-ui, -apple-system, sans-serif"
      font-size="20"
      font-weight="400"
      fill="rgba(255,255,255,0.4)">Your agency&#8217;s design brain. Always on, always yours.</text>

    <!-- Divider -->
    <line x1="580" y1="426" x2="700" y2="426" stroke="rgba(232,99,58,0.28)" stroke-width="1"/>

    <!-- Stats — 4 items centred around x=640 -->
    <!-- Items at x: 420, 560, 720, 860 | Dividers at 490, 640, 790 -->

    <text x="420" y="470" text-anchor="middle"
      font-family="Inter, system-ui, sans-serif" font-size="30" font-weight="700" fill="#E8633A">13</text>
    <text x="420" y="493" text-anchor="middle"
      font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600"
      fill="rgba(255,255,255,0.3)" letter-spacing="2">ROLES</text>

    <line x1="490" y1="450" x2="490" y2="497" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

    <text x="572" y="470" text-anchor="middle"
      font-family="Inter, system-ui, sans-serif" font-size="30" font-weight="700" fill="#E8633A">27</text>
    <text x="572" y="493" text-anchor="middle"
      font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600"
      fill="rgba(255,255,255,0.3)" letter-spacing="2">COMMANDS</text>

    <line x1="648" y1="450" x2="648" y2="497" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

    <text x="736" y="470" text-anchor="middle"
      font-family="Inter, system-ui, sans-serif" font-size="30" font-weight="700" fill="#E8633A">9,500+</text>
    <text x="736" y="493" text-anchor="middle"
      font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600"
      fill="rgba(255,255,255,0.3)" letter-spacing="2">LINES</text>

    <line x1="820" y1="450" x2="820" y2="497" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

    <text x="880" y="470" text-anchor="middle"
      font-family="Inter, system-ui, sans-serif" font-size="30" font-weight="700" fill="#E8633A">5</text>
    <text x="880" y="493" text-anchor="middle"
      font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600"
      fill="rgba(255,255,255,0.3)" letter-spacing="2">AGENTS</text>

    <!-- Footer -->
    <text x="60" y="612"
      font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500"
      fill="rgba(255,255,255,0.2)">github.com/Adityaraj0421/naksha-studio</text>
    <text x="1220" y="612" text-anchor="end"
      font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600"
      fill="rgba(232,99,58,0.5)" letter-spacing="3">MIT LICENSE</text>
  </svg>
  ```

- [ ] **Step 2: Verify**

  Run: `grep "naksha\|E8633A\|1A1A2E" assets/social-preview.svg | wc -l`

  Expected: ≥ 15 lines matched.

  Run: `grep "design-studio\|Design Studio\|DM Serif\|0D9668" assets/social-preview.svg`

  Expected: **no output**.

- [ ] **Step 3: Commit**

  ```bash
  git add assets/social-preview.svg
  git commit -m "assets: regenerate social-preview.svg with Naksha identity"
  ```

---

### Task 10: assets/demo.svg — name and version label

The demo SVG shows a terminal-like screenshot. Only update text nodes that reference the plugin name or version — do not change the layout.

- [ ] **Step 1: Find the design-studio references**

  Run: `grep -n "design-studio\|Design Studio\|v3\." assets/demo.svg`

  Note the exact line numbers and content before editing.

- [ ] **Step 2: Replace each occurrence**

  For every occurrence of `design-studio` → `naksha`
  For every occurrence of `v3.2.0` → `v3.3.0`
  For every occurrence of `Design Studio` → `naksha`

  Use the Edit tool for each distinct change (do not use replace_all if surrounding context differs).

- [ ] **Step 3: Verify**

  Run: `grep -n "design-studio\|Design Studio\|v3\.2\.0" assets/demo.svg`

  Expected: **no output**.

  Run: `grep -n "naksha\|v3\.3\.0" assets/demo.svg | head -5`

  Expected: matches present.

- [ ] **Step 4: Commit**

  ```bash
  git add assets/demo.svg
  git commit -m "assets: update demo.svg with naksha name and v3.3.0 label"
  ```

---

### Task 11: GitHub — repo rename, About update, v3.3.0 release

These are browser/GitHub UI actions. Do them in order — rename first (so URLs are correct in the release).

- [ ] **Step 1: Rename the GitHub repo**

  Navigate to: `https://github.com/Adityaraj0421/design-studio/settings`

  In the "Repository name" field, change `design-studio` → `naksha-studio`. Click "Rename".

  GitHub will redirect to `https://github.com/Adityaraj0421/naksha-studio`. Verify the new URL loads.

- [ ] **Step 2: Update remote URL in local git**

  Run:
  ```bash
  git remote set-url origin https://github.com/Adityaraj0421/naksha-studio.git
  git remote -v
  ```

  Expected: both fetch and push now point to `naksha-studio.git`.

- [ ] **Step 3: Push everything**

  Run:
  ```bash
  git push origin main
  ```

  Expected: push succeeds to `naksha-studio`.

- [ ] **Step 4: Update GitHub About (description + topics)**

  On `https://github.com/Adityaraj0421/naksha-studio`, click the ⚙️ gear next to "About".

  Set description to:
  ```
  Your agency's design brain, inside Claude Code. 13 specialist roles · 27 commands · 9,500+ lines of design knowledge.
  ```

  Set website to: `https://naksha.ai`

  Set topics to: `claude-code`, `claude-code-plugin`, `naksha`, `design`, `ai-design`, `design-system`, `figma`, `ux`

  Click Save.

- [ ] **Step 5: Create GitHub release v3.3.0**

  Navigate to: `https://github.com/Adityaraj0421/naksha-studio/releases/new`

  - Tag: `v3.3.0` (create new tag on publish)
  - Title: `v3.3.0 — naksha`
  - Body:
    ```
    design-studio is now naksha — the Claude Code surface of the Naksha design workspace.

    ## What Changed
    - Plugin renamed to `naksha` (install path: `~/.claude/plugins/naksha`)
    - Visual identity: Naksha brand colors (#E8633A), logo mark, Inter font, tagline
    - GitHub repo renamed to `naksha-studio`
    - README and all assets fully rebranded

    ## What Didn't Change
    All 27 commands, 13 specialist roles, agents, hooks, and evals are untouched. Zero functional changes.

    ## Install
    ```bash
    git clone https://github.com/Adityaraj0421/naksha-studio.git ~/.claude/plugins/naksha
    ```
    ```

  Click **Publish release**.

- [ ] **Step 6: Final verification**

  Run: `grep -r "design-studio" . --include="*.md" --include="*.json" --include="*.html" --include="*.svg" --include="*.yml" --exclude-dir=.git | grep -v "docs/superpowers/specs\|docs/superpowers/plans\|.superpowers"`

  Expected: **no output**. If anything appears, fix it before calling done.

---

## Done

All 10 files updated, committed, pushed. GitHub repo renamed to `naksha-studio`, About updated, v3.3.0 release published. The plugin is now `naksha`.

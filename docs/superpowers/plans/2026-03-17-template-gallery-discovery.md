# Template Gallery Discovery Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/design-template` show a rich catalog of all 10 template categories when called with no arguments, so users can browse before committing to a specific template.

**Architecture:** Add a no-args branch at the top of `commands/design-template.md` that outputs a formatted gallery of all 10 categories (name, sections, best-for, example command). Add 5 discovery trigger phrases to the SKILL.md routing table. Add a smoke fixture and 2 evals to verify the new behavior. Bump all version files to v3.17.0.

**Tech Stack:** Markdown prompt files (plugin commands), bash smoke script, JSON evals.

**Spec:** `docs/superpowers/specs/2026-03-17-template-gallery-discovery-design.md`

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `commands/design-template.md` | Modify (prepend no-args branch) | New gallery mode output when no category given |
| `skills/design/SKILL.md` | Modify (add 5 rows to trigger table) | Route discovery phrases to /design-template gallery |
| `evals/fixtures/template-gallery-output.md` | Create | Smoke fixture for gallery output |
| `scripts/behavioral-smoke.sh` | Modify (append 1 check_fixture call) | Smoke validation for new fixture |
| `evals/evals.json` | Modify (append 2 entries) | Behavioral evals ids 118–119 |
| `.claude-plugin/plugin.json` | Modify | Version 3.17.0 + description drift fix |
| `.claude-plugin/marketplace.json` | Modify | Version 3.17.0 |
| `meta/stats.json` | Modify | Version 3.17.0 |
| `CHANGELOG.md` | Modify | v3.17.0 entry |
| `README.md` | Modify | Version badge/mention 3.17.0 |
| `docs/plugin-directory-submission.md` | Modify | Version 3.17.0 |
| `docs/MCP-SETUP.md` | Modify | Version 3.17.0 |
| `CONTRIBUTING.md` | Modify | Version 3.17.0 |

---

## Chunk 1: Core Feature

### Task 1: Add no-args gallery branch to design-template.md

**Context:** The plugin is at `/Users/adityaraj0421/FMG-Design/naksha-studio/`. The file `commands/design-template.md` is a prompt instruction file — when the user invokes `/design-template`, Claude reads this file and follows its instructions. The file currently starts with a frontmatter block and then `# /design-template $ARGUMENTS`. We need to insert a new routing branch right after the heading line that intercepts the no-args case before the normal category-based processing begins.

**Files:**
- Modify: `commands/design-template.md` (after line 7, the `# /design-template $ARGUMENTS` heading)

- [ ] **Step 1: Read the current file to confirm insertion point**

  Read `commands/design-template.md`. Confirm line 7 is `# /design-template $ARGUMENTS` and line 9 is the blank line before `You are activating...`. The insertion goes between lines 7 and 9.

- [ ] **Step 2: Insert the no-args gallery branch**

  After line 7 (`# /design-template $ARGUMENTS`), add the following block. It must come BEFORE the `You are activating...` line so it intercepts first:

  ```markdown

  ## Gallery Mode (No Arguments)

  If `$ARGUMENTS` is empty, or the user has not specified a template category, or the message contains only discovery phrases ("show me templates", "what templates are available", "browse templates", "template list", "available templates", "what templates", "show templates") — output the following gallery and stop. Do not proceed to category generation.

  ```
  📐 Design Template Gallery — 10 categories available

  landing-page    Hero section, feature grid, social proof, CTA
                  Best for: SaaS launches, product pages, waitlists
                  Sections: Hero · Features · Testimonials · Pricing · CTA
                  Try: /design-template landing-page --style minimal

  dashboard       KPI cards, data tables, charts, sidebar nav
                  Best for: Admin tools, analytics, monitoring dashboards
                  Sections: Sidebar · Header · KPI Cards · Chart Area · Table
                  Try: /design-template dashboard --style dark-tech

  pricing         Pricing tiers, feature comparison table, FAQ, CTA
                  Best for: SaaS plans, subscription products
                  Sections: Hero · Tiers · Feature Table · FAQ · CTA
                  Try: /design-template pricing --style corporate

  auth            Sign-in, sign-up, forgot password, OTP flows
                  Best for: Login screens, onboarding entry points
                  Sections: Form · Social Auth · Error States · Recovery Flow
                  Try: /design-template auth --style minimal

  blog            Article layout, category nav, author bio, related posts
                  Best for: Content sites, documentation blogs, newsletters
                  Sections: Header · Article · Sidebar · Author · Related
                  Try: /design-template blog --style bold

  ecommerce       Product grid, filters, product detail, cart, checkout
                  Best for: Shops, marketplaces, product catalogs
                  Sections: Grid · Filters · Product Card · Cart · Checkout
                  Try: /design-template ecommerce --style playful

  portfolio       Work grid, case study, about, contact
                  Best for: Designer/developer portfolios, agency sites
                  Sections: Hero · Work Grid · Case Study · About · Contact
                  Try: /design-template portfolio --style minimal

  docs            Navigation sidebar, content area, search, code blocks
                  Best for: Developer docs, API references, knowledge bases
                  Sections: Sidebar Nav · Content · Search · Code Block · Footer
                  Try: /design-template docs --style corporate

  saas            Feature showcase, demo CTA, integrations, testimonials
                  Best for: B2B SaaS marketing pages, product-led growth
                  Sections: Hero · Features · Integrations · Social Proof · CTA
                  Try: /design-template saas --style bold

  onboarding      Welcome screen, progress steps, empty state, success
                  Best for: New user flows, setup wizards, activation sequences
                  Sections: Welcome · Steps · Progress · Empty State · Success
                  Try: /design-template onboarding --style minimal

  ─────────────────────────────────────────────────────────────────────
  Usage:  /design-template <category>
          /design-template <category> --style minimal|bold|corporate|playful|dark-tech
          /design-template <category> brand="Name" colors="#hex1,#hex2"
  ```

  After outputting the gallery, ask: "Which category would you like to generate? You can also specify a style (e.g., `/design-template landing-page --style bold`) or brand colors."

  ---

  ```

  ⚠️ Important: Keep the triple-backtick fence around the gallery output block. The outer fence (three backticks before `📐` and after the `Usage:` line) is part of the instruction to Claude to output that literal text block. The inner `---` separator is part of the gallery content.

- [ ] **Step 3: Verify the file looks correct**

  Read the modified `commands/design-template.md` lines 1–55 and confirm:
  - The `## Gallery Mode (No Arguments)` section appears immediately after `# /design-template $ARGUMENTS`
  - The `You are activating the **Design Template Gallery**` line still exists (unchanged, now further down)
  - The gallery block contains all 10 categories
  - The closing `---` before the existing `## Template Categories` section is still present

- [ ] **Step 4: Commit**

  ```bash
  cd /Users/adityaraj0421/FMG-Design/naksha-studio
  git add commands/design-template.md
  git commit -m "feat(template): add no-args gallery mode to /design-template"
  ```

---

### Task 2: Add 5 discovery trigger phrases to SKILL.md

**Context:** `skills/design/SKILL.md` contains a routing table. Around lines 368–371 there are example trigger phrases that route to `/design-template`. We add 5 new rows to that group for discovery-oriented phrases.

**Files:**
- Modify: `skills/design/SKILL.md` (after line 371, the "Build a portfolio site" row)

- [ ] **Step 1: Find the exact insertion point**

  Read `skills/design/SKILL.md` lines 368–378. Confirm the block looks like:
  ```
  | "Build a landing page template" | ... + `/design-template landing-page` |
  | "Create a dashboard template" | ... + `/design-template dashboard` |
  | "Generate a SaaS pricing page" | ... + `/design-template pricing` |
  | "Build a portfolio site" | ... + `/design-template portfolio` |
  | "Design a bar chart for monthly revenue" | ...  ← next section
  ```
  The 5 new rows go immediately after the "Build a portfolio site" row.

- [ ] **Step 2: Insert the 5 discovery rows**

  After the `| "Build a portfolio site" | UI Designer, Content Designer + \`/design-template portfolio\` |` line, add:

  ```markdown
  | "Browse available templates" | UI Designer + `/design-template` (gallery mode — shows all 10 categories) |
  | "What templates are available?" | UI Designer + `/design-template` (gallery mode — shows all 10 categories) |
  | "Show me template options" | UI Designer + `/design-template` (gallery mode — shows all 10 categories) |
  | "Template list" | UI Designer + `/design-template` (gallery mode — shows all 10 categories) |
  | "Available templates" | UI Designer + `/design-template` (gallery mode — shows all 10 categories) |
  ```

- [ ] **Step 3: Verify**

  Read `skills/design/SKILL.md` lines 368–385. Confirm all 5 new rows appear after "Build a portfolio site" and before "Design a bar chart...".

- [ ] **Step 4: Commit**

  ```bash
  cd /Users/adityaraj0421/FMG-Design/naksha-studio
  git add skills/design/SKILL.md
  git commit -m "feat(skill): add 5 template gallery discovery keywords to SKILL.md"
  ```

---

### Task 3: Create smoke fixture

**Context:** The `evals/fixtures/` directory holds pre-captured output files. The smoke script (`scripts/behavioral-smoke.sh`) reads these files and checks for keyword presence, minimum headers, and minimum character count. We create a new fixture representing what the gallery mode outputs, then add a `check_fixture` call to the smoke script.

**Files:**
- Create: `evals/fixtures/template-gallery-output.md`
- Modify: `scripts/behavioral-smoke.sh` (append 1 `check_fixture` call)

- [ ] **Step 1: Create the fixture file**

  Create `evals/fixtures/template-gallery-output.md` with this exact content (this simulates a real gallery response):

  ```markdown
  # /design-template — Template Gallery

  ## Available Templates

  📐 Design Template Gallery — 10 categories available

  landing-page    Hero section, feature grid, social proof, CTA
                  Best for: SaaS launches, product pages, waitlists
                  Sections: Hero · Features · Testimonials · Pricing · CTA
                  Try: /design-template landing-page --style minimal

  dashboard       KPI cards, data tables, charts, sidebar nav
                  Best for: Admin tools, analytics, monitoring dashboards
                  Sections: Sidebar · Header · KPI Cards · Chart Area · Table
                  Try: /design-template dashboard --style dark-tech

  pricing         Pricing tiers, feature comparison table, FAQ, CTA
                  Best for: SaaS plans, subscription products
                  Sections: Hero · Tiers · Feature Table · FAQ · CTA
                  Try: /design-template pricing --style corporate

  auth            Sign-in, sign-up, forgot password, OTP flows
                  Best for: Login screens, onboarding entry points
                  Sections: Form · Social Auth · Error States · Recovery Flow
                  Try: /design-template auth --style minimal

  blog            Article layout, category nav, author bio, related posts
                  Best for: Content sites, documentation blogs, newsletters
                  Sections: Header · Article · Sidebar · Author · Related
                  Try: /design-template blog --style bold

  ecommerce       Product grid, filters, product detail, cart, checkout
                  Best for: Shops, marketplaces, product catalogs
                  Sections: Grid · Filters · Product Card · Cart · Checkout
                  Try: /design-template ecommerce --style playful

  portfolio       Work grid, case study, about, contact
                  Best for: Designer/developer portfolios, agency sites
                  Sections: Hero · Work Grid · Case Study · About · Contact
                  Try: /design-template portfolio --style minimal

  docs            Navigation sidebar, content area, search, code blocks
                  Best for: Developer docs, API references, knowledge bases
                  Sections: Sidebar Nav · Content · Search · Code Block · Footer
                  Try: /design-template docs --style corporate

  saas            Feature showcase, demo CTA, integrations, testimonials
                  Best for: B2B SaaS marketing pages, product-led growth
                  Sections: Hero · Features · Integrations · Social Proof · CTA
                  Try: /design-template saas --style bold

  onboarding      Welcome screen, progress steps, empty state, success
                  Best for: New user flows, setup wizards, activation sequences
                  Sections: Welcome · Steps · Progress · Empty State · Success
                  Try: /design-template onboarding --style minimal

  ## Usage

  /design-template <category>
  /design-template <category> --style minimal|bold|corporate|playful|dark-tech
  /design-template <category> brand="Name" colors="#hex1,#hex2"

  Which category would you like to generate?
  ```

- [ ] **Step 2: Append check_fixture call to smoke script**

  Read `scripts/behavioral-smoke.sh` to find the last `check_fixture` call (currently `check_fixture "accessibility-audit-output.md" ...`). Append the new call immediately after it, before the `echo ""` separator line:

  ```bash
  check_fixture "template-gallery-output.md"        "landing-page,dashboard,pricing,ecommerce,Try:"                     2    200
  ```

  ⚠️ The arguments are positional: `(filename, keywords_csv, min_headers, min_chars)`. Use 2 headers (not 3) because the fixture has `## Available Templates` and `## Usage`. Use 200 min chars (the fixture is well over 200 but keeps the threshold modest for future real output variation).

- [ ] **Step 3: Run the smoke script to verify it passes**

  ```bash
  cd /Users/adityaraj0421/FMG-Design/naksha-studio
  bash scripts/behavioral-smoke.sh
  ```

  Expected output includes:
  ```
    Checking: template-gallery-output.md
  ```
  And the final line: `behavioral-smoke: PASS`

  If it fails, check: (a) keyword spelling matches fixture content, (b) header count is correct, (c) file path is right.

- [ ] **Step 4: Commit**

  ```bash
  cd /Users/adityaraj0421/FMG-Design/naksha-studio
  git add evals/fixtures/template-gallery-output.md scripts/behavioral-smoke.sh
  git commit -m "test(smoke): add template-gallery fixture and smoke check"
  ```

---

### Task 4: Add behavioral evals (ids 118–119)

**Context:** `evals/evals.json` is a JSON array of eval objects. The current last entry has `"id": 117`. We append two new entries. Each entry has: `id`, `name`, `command`, `role`, `prompt`, `assertions` (array of `{name, description}` objects).

**Files:**
- Modify: `evals/evals.json` (append 2 entries before the closing `]`)

- [ ] **Step 1: Read the end of the evals file to get exact format**

  Run:
  ```bash
  tail -20 /Users/adityaraj0421/FMG-Design/naksha-studio/evals/evals.json
  ```
  Confirm id 117 is the last entry. Note the exact JSON structure — every entry ends with `}` and is separated by a comma from the next.

- [ ] **Step 2: Append the two new eval entries**

  The actual file structure is `{"skill_name": "design", "evals": [...]}`. The file ends with the id 117 entry closing `}`, then `  ]`, then `}`. Replace the final `  }\n  ]\n}` with:

  ```json
      },
      {
        "id": 118,
        "name": "template-gallery-noargs",
        "command": "/design-template",
        "role": "UI Designer",
        "prompt": "/design-template",
        "assertions": [
          {"name": "shows-all-10-categories", "description": "Gallery output includes all 10 categories: landing-page, dashboard, pricing, auth, blog, ecommerce, portfolio, docs, saas, onboarding"},
          {"name": "includes-sections-per-category", "description": "Each category entry lists its key sections (e.g. Hero · Features · CTA for landing-page)"},
          {"name": "includes-best-for-tags", "description": "Each category entry includes a Best for tag describing the ideal use case"},
          {"name": "includes-try-example", "description": "Each category entry includes a Try: example command with a style flag"}
        ]
      },
      {
        "id": 119,
        "name": "template-gallery-discovery-phrase",
        "command": "/design-template",
        "role": "UI Designer",
        "prompt": "what templates are available in naksha?",
        "assertions": [
          {"name": "routes-to-gallery-mode", "description": "Discovery phrase triggers the gallery mode, not a template generation attempt"},
          {"name": "shows-all-10-categories", "description": "Gallery output includes all 10 template categories"},
          {"name": "includes-usage-hint", "description": "Response ends with a usage hint or invitation to specify a category"}
        ]
      }
    ]
  }
  ```

- [ ] **Step 3: Validate JSON is well-formed**

  ```bash
  cd /Users/adityaraj0421/FMG-Design/naksha-studio
  python3 -c "import json; data=json.load(open('evals/evals.json')); print(f'Valid JSON — {len(data[\"evals\"])} evals')"
  ```

  If that fails, try:
  ```bash
  python3 -c "import json; data=json.load(open('evals/evals.json')); print(list(data.keys()))"
  ```
  The top-level structure is `{"skill_name": "design", "evals": [...]}` — both keys are present.

  Expected: no error, and the count should be 120 (or the total with both new entries).

- [ ] **Step 4: Commit**

  ```bash
  cd /Users/adityaraj0421/FMG-Design/naksha-studio
  git add evals/evals.json
  git commit -m "test(evals): add template-gallery-noargs and discovery-phrase evals (ids 118-119)"
  ```

---

## Chunk 2: Version Bump

### Task 5: Bump all 8 files to v3.17.0

**Context:** Every release updates 8 files in sync. The current version is 3.16.0. This task also fixes the long-standing description drift in `plugin.json` (says "42 commands, 11,000+ lines" — should be "46 commands, 12,500+ lines").

**Files:**
- Modify: `.claude-plugin/plugin.json`
- Modify: `.claude-plugin/marketplace.json`
- Modify: `meta/stats.json`
- Modify: `CHANGELOG.md`
- Modify: `README.md`
- Modify: `docs/plugin-directory-submission.md`
- Modify: `docs/MCP-SETUP.md`
- Modify: `CONTRIBUTING.md`

- [ ] **Step 1: Update meta/stats.json**

  Current content: `{"version":"3.16.0","roles":23,"commands":46,"knowledge_lines":12545,"reference_files":29}`

  New content (only version changes — no count changes in this release):
  ```json
  {"version":"3.17.0","roles":23,"commands":46,"knowledge_lines":12545,"reference_files":29}
  ```

- [ ] **Step 2: Update .claude-plugin/plugin.json**

  Two changes:
  1. `"version": "3.16.0"` → `"version": "3.17.0"`
  2. In the `"description"` field, find `"23 roles, 42 commands, 11,000+ lines"` and replace with `"23 roles, 46 commands, 12,500+ lines"`

  Verify the description now reads correctly before moving on.

- [ ] **Step 3: Update .claude-plugin/marketplace.json**

  Change `"version": "3.16.0"` → `"version": "3.17.0"`. No other changes needed.

- [ ] **Step 4: Prepend CHANGELOG.md entry**

  Add this block at the very top of `CHANGELOG.md` (before the existing `## v3.16.0` entry):

  ```markdown
  ## v3.17.0 (2026-03-17)

  ### Added
  - **Template Gallery**: `/design-template` with no arguments now shows a rich catalog of all 10 template categories — each with name, section breakdown, best-for tags, and an example command with style flags
  - 5 new SKILL.md discovery trigger phrases (`Browse available templates`, `What templates are available?`, `Show me template options`, `Template list`, `Available templates`)
  - 2 new behavioral evals (ids 118–119): `template-gallery-noargs`, `template-gallery-discovery-phrase`. Total: 120 evals
  - 1 new smoke fixture (`template-gallery-output`). Total: 49 fixtures

  ### Fixed
  - `plugin.json` description corrected from "42 commands, 11,000+ lines" to "46 commands, 12,500+ lines"

  ---

  ```

- [ ] **Step 5: Update README.md**

  Search for `3.16.0` in `README.md`. Replace all occurrences with `3.17.0`. Also search for `"42 commands"` or `"46 commands"` — if README mentions command count, confirm it says 46 (no change needed if already correct).

  ```bash
  grep -n "3\.16\.0\|42 commands\|11,000" /Users/adityaraj0421/FMG-Design/naksha-studio/README.md
  ```

  Replace each `3.16.0` occurrence with `3.17.0`.

- [ ] **Step 6: Update docs/plugin-directory-submission.md**

  ```bash
  grep -n "3\.16\.0\|version" /Users/adityaraj0421/FMG-Design/naksha-studio/docs/plugin-directory-submission.md | head -10
  ```

  Replace `3.16.0` with `3.17.0` wherever it appears.

- [ ] **Step 7: Update docs/MCP-SETUP.md**

  ```bash
  grep -n "3\.16\.0" /Users/adityaraj0421/FMG-Design/naksha-studio/docs/MCP-SETUP.md | head -5
  ```

  Replace `3.16.0` with `3.17.0` wherever it appears.

- [ ] **Step 8: Update CONTRIBUTING.md**

  ```bash
  grep -n "3\.16\.0" /Users/adityaraj0421/FMG-Design/naksha-studio/CONTRIBUTING.md | head -5
  ```

  Replace `3.16.0` with `3.17.0` wherever it appears.

- [ ] **Step 9: Verify all 8 files are updated**

  ```bash
  grep -r "3\.16\.0" /Users/adityaraj0421/FMG-Design/naksha-studio/.claude-plugin/ /Users/adityaraj0421/FMG-Design/naksha-studio/meta/ /Users/adityaraj0421/FMG-Design/naksha-studio/CHANGELOG.md /Users/adityaraj0421/FMG-Design/naksha-studio/README.md /Users/adityaraj0421/FMG-Design/naksha-studio/docs/plugin-directory-submission.md /Users/adityaraj0421/FMG-Design/naksha-studio/docs/MCP-SETUP.md /Users/adityaraj0421/FMG-Design/naksha-studio/CONTRIBUTING.md
  ```

  Expected: no output (no remaining `3.16.0` references in any of these files).

- [ ] **Step 10: Run smoke script one final time**

  ```bash
  cd /Users/adityaraj0421/FMG-Design/naksha-studio
  bash scripts/behavioral-smoke.sh
  ```

  Expected: `behavioral-smoke: PASS` with 49 fixtures checked, 0 failures.

- [ ] **Step 11: Commit the version bump**

  ```bash
  cd /Users/adityaraj0421/FMG-Design/naksha-studio
  git add .claude-plugin/plugin.json .claude-plugin/marketplace.json meta/stats.json CHANGELOG.md README.md docs/plugin-directory-submission.md docs/MCP-SETUP.md CONTRIBUTING.md
  git commit -m "chore: bump version to 3.17.0; fix plugin.json description drift"
  ```

---

### Task 6: Tag and publish GitHub release

**Context:** After the version bump commit is on `main`, create a git tag and a GitHub release.

- [ ] **Step 1: Push all commits to main**

  ```bash
  cd /Users/adityaraj0421/FMG-Design/naksha-studio
  git push origin main
  ```

  Confirm: no errors, all 4 commits from this plan are pushed.

- [ ] **Step 2: Create the git tag**

  ```bash
  git tag v3.17.0
  git push origin v3.17.0
  ```

- [ ] **Step 3: Create the GitHub release**

  ```bash
  gh release create v3.17.0 \
    --title "v3.17.0 — Template Gallery Discovery" \
    --notes "$(cat <<'EOF'
  ## What's new

  ### Template Gallery mode
  `/design-template` with no arguments now shows a rich catalog of all 10 template categories — each with name, key sections, best-for tags, and a ready-to-run example command:

  \`\`\`
  /design-template          ← shows the gallery
  /design-template landing-page --style minimal   ← generates the template
  \`\`\`

  ### 5 new discovery keywords
  Phrases like "what templates are available?", "browse available templates", and "template list" now route to the gallery.

  ### Fixes
  - `plugin.json` description corrected to "46 commands, 12,500+ lines"

  ---
  **Stats:** 23 roles · 46 commands · 12,545 knowledge lines · 120 evals · 49 smoke fixtures
  EOF
  )"
  ```

- [ ] **Step 4: Confirm release is live**

  ```bash
  gh release view v3.17.0
  ```

  Expected: Shows the release title, notes, and tag `v3.17.0`.

---

## Summary

| Task | Files | Commits |
|------|-------|---------|
| 1. Gallery mode | `commands/design-template.md` | 1 |
| 2. SKILL.md keywords | `skills/design/SKILL.md` | 1 |
| 3. Smoke fixture + script | `evals/fixtures/template-gallery-output.md`, `scripts/behavioral-smoke.sh` | 1 |
| 4. Behavioral evals | `evals/evals.json` | 1 |
| 5. Version bump | 8 files | 1 |
| 6. Tag + release | GitHub | — |
| **Total** | **12 files** | **5 commits** |

# Repository Review (No Sugar Coating)

## What is strong

1. **Positioning is clear and differentiated.** The project consistently frames itself as a design-team plugin with multi-platform support (Claude Code, Cursor, Windsurf, Gemini, Copilot), and the README is compelling.
2. **Command surface is broad.** You have 32 command docs and they cover product design, social, email, data viz, Figma, and brand workflows.
3. **Basic quality rails exist.** There is an eval validator and a design linter script, which is better than many prompt/plugin repos that ship with zero checks.

---

## Where you can improve (high impact)

### 1) Your role-count messaging is inconsistent
You currently claim "18 specialist roles" in multiple places, but your own team table and routing now include more roles than that.

**Why this matters:** It weakens trust. People notice when numbers don't line up.

**Fix:** Decide on one canonical count and update all user-facing docs + metadata in one sweep.

---

### 2) Testing is mostly structural, not behavioral
`run-evals.sh` validates JSON shape and fixture references, but it does **not** execute assertions against model outputs.

**Why this matters:** You can regress output quality while still showing green checks.

**Fix:** Add a lightweight scoring harness that runs a subset of evals against generated outputs (even if heuristic). Keep structural checks, but add at least one behavioral gate in CI.

---

### 3) `design-lint` has config knobs that are not wired
The linter exposes config fields like `warnOnTokens`, `checkContrast`, `checkSemantic`, and `ignorePatterns`, but those settings are effectively unused in check execution.

**Why this matters:** Config promises behavior that the code doesn't deliver; this is confusing for contributors.

**Fix:** Either wire each option into check registration/execution, or remove the unused options to avoid false expectations.

---

### 4) Rebrand cleanup is incomplete
There are still references to "design-studio" in scripts/comments despite rebranding to Naksha.

**Why this matters:** Looks unfinished and increases cognitive overhead when debugging or onboarding.

**Fix:** Run a targeted string cleanup (`design-studio` → `naksha` where appropriate) across scripts/docs.

---

## Medium-priority improvements

1. **Create one source-of-truth metadata file** (roles count, command count, reference count, version facts), then generate badges/snippets from it.
2. **Add a docs consistency CI check** to compare declared counts in README/plugin/changelog against actual filesystem counts.
3. **Improve linter CLI UX** (`--help`, `--config`, `--threshold`, non-zero exit behavior docs) so contributors understand how to use it locally.
4. **Introduce a minimal smoke test matrix** for key workflows (`/design`, `/design-review`, `/figma`, `/design-system`) to catch accidental command drift.

---

## Practical 7-day cleanup plan

### Day 1
- Lock canonical counts and update all public claims.

### Day 2
- Remove/rewrite stale `design-studio` references.

### Day 3-4
- Wire linter config flags or trim unused flags.

### Day 5
- Add docs consistency script + CI job.

### Day 6
- Add one behavioral eval smoke runner.

### Day 7
- Publish a "quality status" section in README (what is enforced vs aspirational).

---

## Blunt assessment

You have **strong product framing and breadth**, but quality assurance is currently **documentation-heavy and enforcement-light**. The fastest credibility gain is to make the repo self-consistent (counts/branding) and tighten one real behavioral quality gate in CI.

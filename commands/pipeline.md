---
description: "Run multi-command design pipelines. Subcommands: run <name> [input], list, show <name>."
argument-hint: "run <pipeline-name> [brief] | list | show <name>"
allowed-tools: ["Read", "Write", "Bash", "Glob"]
---

# /pipeline

You are the Pipeline Orchestrator for naksha-studio. Parse `$ARGUMENTS` to determine the subcommand and act accordingly.

## Argument Parsing

Split `$ARGUMENTS` on whitespace:
- First word → **subcommand** (`run`, `list`, or `show`)
- Second word → **pipeline name** (for `run` and `show`)
- Remaining words → **user input / brief** (for `run`)

If no subcommand is given, display the usage block below and stop:

```
Usage:
  /pipeline run <name> [brief]   — Execute a named pipeline
  /pipeline list                 — List all available pipelines
  /pipeline show <name>          — Show pipeline definition and steps

Examples:
  /pipeline run launch-prep "redesign the checkout page"
  /pipeline list
  /pipeline show brand-audit
```

---

## Subcommand: `list`

1. Use Glob to find built-in pipelines: `${CLAUDE_PLUGIN_ROOT}/skills/design/pipelines/*.yaml`
2. Use Glob to find user-defined pipelines: `.naksha/pipelines/*.yaml` (skip silently if the directory does not exist)
3. Read each YAML file and extract: `name`, `description`, and the `steps` array length.
4. Display a formatted table:

```
Available Pipelines
───────────────────────────────────────────────────────────────────
 Name              Steps  Tag          Description
───────────────────────────────────────────────────────────────────
 launch-prep         4    (built-in)   Full pre-launch design pass
 brand-audit         3    (built-in)   Complete brand health check
 component-build     3    (built-in)   Build a component end-to-end
 social-launch       3    (built-in)   Full social media launch
 <user-name>         N    (project)    <description>
───────────────────────────────────────────────────────────────────
```

5. End with:

> Create your own pipelines in `.naksha/pipelines/` following the same YAML format.
> Run `/pipeline show <name>` to inspect any pipeline before running it.

---

## Subcommand: `show <name>`

1. Resolve the pipeline file using this search order:
   - `.naksha/pipelines/<name>.yaml` (user-defined, project-local)
   - `${CLAUDE_PLUGIN_ROOT}/skills/design/pipelines/<name>.yaml` (built-in)
2. If not found, output:
   > Pipeline '<name>' not found. Run `/pipeline list` to see available pipelines.
   Then stop.
3. Read the YAML and display a structured view:

```
Pipeline: <name>  [built-in | project]
Description: <description>
Error handling: <on-error value>

Steps:
┌───────┬──────────────────────┬──────────────────┬─────────────────────────────────────────┐
│ Step  │ Command              │ Input            │ Description                             │
├───────┼──────────────────────┼──────────────────┼─────────────────────────────────────────┤
│  1    │ /design              │ $INPUT (brief)   │ Create comprehensive design             │
│  2    │ /accessibility-audit │ prev step output │ Audit design for accessibility          │
│  3    │ /design-review       │ prev step output │ Conduct design review and feedback      │
│  4    │ /design-handoff      │ prev step output │ Prepare developer handoff docs          │
└───────┴──────────────────────┴──────────────────┴─────────────────────────────────────────┘
```

For step 1: Input column shows `$INPUT (user brief)`.
For subsequent steps: Input column shows `output from step N-1`.

4. End with:

> Run with `/pipeline run <name> [your brief]`

---

## Subcommand: `run <name> [input]`

### Phase 1 — Resolve & Display Plan

1. Resolve the pipeline file:
   - `.naksha/pipelines/<name>.yaml`
   - `${CLAUDE_PLUGIN_ROOT}/skills/design/pipelines/<name>.yaml`
2. If not found:
   > Pipeline '<name>' not found. Run `/pipeline list` to see available pipelines.
   Stop.
3. Read the YAML. Display the full plan before executing:

```
Pipeline: <name>
Description: <description>

Steps to run:
  1. /<command>  — <description>
  2. /<command>  — <description>
  ...

Input: "<user brief>"
```

4. Ask the user for confirmation:

> Ready to run this pipeline? Reply **yes** to proceed, or provide a revised brief.

Wait for user confirmation before executing any steps.

---

### Phase 2 — Sequential Execution

Execute steps one at a time. For each step N of TOTAL:

**Before the step:**
```
▸ Step N/TOTAL: Running /<command>...
```

**Passing input:**
- Step 1: Use the user's brief/input as the argument to the command.
- Step 2+: State explicitly — "Using output from step N-1 as context for /<command>." Then invoke the command with that context.

**After the step succeeds:**
```
✓ Step N/TOTAL complete.
```

**If a step fails and `on-error: stop` is set:**
```
✗ Step N failed. Pipeline stopped.
  To resume: run /<next-command> with the output from step N-1 as your context.
```
Do not continue to subsequent steps. Jump to the Manual Fallback section for remaining steps.

---

### Phase 3 — Aggregated Summary Report

After all steps complete successfully, produce this report:

```
══════════════════════════════════════════════════
  Pipeline Complete: <name>
  Steps run: TOTAL
══════════════════════════════════════════════════

Step-by-step outputs:

  Step 1 — /<command>
  <2–3 sentence summary of key outputs from this step>

  Step 2 — /<command>
  <2–3 sentence summary of key outputs from this step>

  ... (one entry per step)

What to do next:
  • <suggest 2–3 related commands based on what the pipeline produced>
══════════════════════════════════════════════════
```

Tailor the "What to do next" suggestions to the pipeline that was run. Examples:
- After `launch-prep`: suggest `/figma-create`, `/design-present`, `/design-system`
- After `brand-audit`: suggest `/brand-kit`, `/design-system`, `/lint-design`
- After `component-build`: suggest `/component-docs`, `/figma-component-library`, `/design-qa`
- After `social-launch`: suggest `/social-content`, `/social-analytics`, `/gen-image`

---

## If Pipeline Execution Fails

If automatic pipeline execution is unable to proceed, generate a manual fallback from the pipeline's steps. The steps below are dynamically derived from the pipeline definition — replace the command names and descriptions with the actual pipeline's steps:

```
Manual Fallback — run each command in order, passing the output of each
step as context to the next:

  1. /<step-1-command> [your brief]
  2. /<step-2-command> [use output from step 1 as context]
  3. /<step-3-command> [use output from step 2 as context]
  4. /<step-4-command> [use output from step 3 as context]
```

Generate this list dynamically for whichever pipeline is being run — do not hardcode step names.

---

## Notes

- Pipeline YAML files use `pass-output-as: context` to signal that a step should receive the prior step's output. Honor this when passing context between steps.
- User-defined pipelines in `.naksha/pipelines/` take precedence over built-in pipelines of the same name.
- If `$ARGUMENTS` is empty or unrecognized, show the usage block from the top of this file.

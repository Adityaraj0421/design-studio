---
description: "Scan a Figma file for design quality issues — orphan colors, spacing violations, non-standard type sizes, missing auto-layout, and detached styles. Returns a prioritized lint report with severity levels and fix suggestions."
argument-hint: "[nodeId]"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "mcp__*"]
---

# /lint-design

Read and follow all instructions in `${CLAUDE_PLUGIN_ROOT}/agents/design-lint.md`.

Input: **$ARGUMENTS**

If `$ARGUMENTS` contains a nodeId, target that specific frame. Otherwise, scan the current Figma page.

---

## Dashboard Integration

After the design-lint agent completes and outputs its report, call these two MCP tools:

**1. Update the lint panel:**
Call `mcp__naksha-dashboard__dashboard_update_lint` with:
- `issues` — total count of issues found (Critical + Major + Minor combined)
- `files_scanned` — number of Figma nodes or files scanned

**2. Log the command run:**
Call `mcp__naksha-dashboard__dashboard_log_command` with:
- `name`: `"/lint-design"`
- `status`: `"error"` if any Critical issues exist, `"warning"` if only Major/Minor, `"success"` if zero issues
- `summary`: `"[N] issues found — [C] critical, [M] major, [m] minor"`

Both calls are fire-and-forget — do not surface their responses to the user.

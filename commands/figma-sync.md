---
description: "Detect drift between Figma designs and code implementation — compare tokens, spacing, colors, typography, and component structure."
argument-hint: "[Figma URL or 'current file'] [code path or 'auto-detect']"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "mcp__*"]
---

# /figma-sync

You are performing a **design-code sync check** — comparing a Figma file's design tokens, components, and visual properties against the codebase to detect drift.

Input: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/design/references/figma-creation.md` for Figma API patterns and `${CLAUDE_PLUGIN_ROOT}/skills/design/references/design-system-lead.md` for token architecture.

## Process

### 1. Connect & Detect Context

```
figma_get_status → verify Desktop Bridge connection
```

Detect the code stack:
- Look for `tailwind.config.*`, `postcss.config.*` → Tailwind
- Look for `*.css` with `--custom-properties` → CSS custom properties
- Look for `tokens.json`, `*.tokens.*` → Design token files
- Look for `package.json` → framework detection (React, Vue, Svelte, Next.js)

### 2. Extract Figma Design Tokens

#### Colors
```javascript
figma_execute: `
  const styles = await figma.getLocalPaintStylesAsync();
  return styles.map(s => {
    const fill = s.paints[0];
    let hex = null;
    if (fill?.type === 'SOLID') {
      const c = fill.color;
      hex = '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
    }
    return { name: s.name, hex, opacity: fill?.opacity };
  });
`
```

#### Typography
```javascript
figma_execute: `
  const styles = await figma.getLocalTextStylesAsync();
  return styles.map(s => ({
    name: s.name,
    fontFamily: s.fontName?.family,
    fontWeight: s.fontName?.style,
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
    letterSpacing: s.letterSpacing
  }));
`
```

#### Variables / Tokens
```javascript
figma_execute: `
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const result = [];
  for (const col of collections) {
    const vars = [];
    for (const id of col.variableIds) {
      const v = await figma.variables.getVariableByIdAsync(id);
      vars.push({
        name: v.name,
        type: v.resolvedType,
        values: v.valuesByMode
      });
    }
    result.push({ collection: col.name, modes: col.modes, variables: vars });
  }
  return result;
`
```

#### Spacing Patterns
```javascript
figma_execute: `
  const page = figma.currentPage;
  const spacings = new Set();
  function collect(node) {
    if (node.itemSpacing != null && node.itemSpacing > 0) spacings.add(node.itemSpacing);
    if (node.paddingLeft != null) {
      [node.paddingLeft, node.paddingRight, node.paddingTop, node.paddingBottom]
        .filter(v => v > 0).forEach(v => spacings.add(v));
    }
    if ('children' in node) node.children.forEach(collect);
  }
  page.children.forEach(collect);
  return [...spacings].sort((a, b) => a - b);
`
```

### 3. Extract Code Tokens

#### From Tailwind Config
```bash
# Find tailwind config
glob: tailwind.config.{js,ts,mjs,cjs}

# Read and extract theme values
read the config file → parse colors, spacing, fontSize, fontFamily
```

#### From CSS Custom Properties
```bash
# Find CSS files with custom properties
grep: --pattern="--[a-z]" --glob="*.css"

# Extract all custom property definitions
grep: --pattern="^\s*--[^:]+:" --glob="*.css" --output_mode="content"
```

#### From Token Files
```bash
# Find token files
glob: **/*.tokens.{json,js,ts}
glob: **/tokens.{json,css,scss}

# Read and parse token definitions
```

### 4. Compare & Detect Drift

For each category, compare Figma source vs code implementation:

#### Color Drift
```
For each Figma paint style:
  1. Normalize the style name → expected CSS variable name
     e.g., "Brand/Primary" → "--color-brand-primary" or "brand-primary"
  2. Search code for matching variable/class
  3. Compare hex values (case-insensitive)
  4. Flag: MISSING (in Figma but not in code), MISMATCH (different values), EXTRA (in code but not in Figma)
```

#### Typography Drift
```
For each Figma text style:
  1. Map to expected CSS class or utility
  2. Compare: fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
  3. Flag differences with specific values
```

#### Spacing Drift
```
Compare Figma spacing scale vs code spacing scale:
  - Figma spacings: extracted from auto-layout gaps and padding
  - Code spacings: from Tailwind theme.spacing or CSS variables
  - Flag any Figma spacings not in the code scale
```

#### Component Drift
```
For each Figma component set:
  1. Map to expected code component
  2. Compare variant names vs component props/variants
  3. Check property names match (Figma "Size" → code "size" prop)
  4. Flag missing variants or extra props
```

### 5. Generate Sync Report

```markdown
# Design-Code Sync Report

**File**: [Figma file name]
**Codebase**: [detected stack]
**Date**: [timestamp]

## Sync Score: [X]%

| Category | Figma | Code | Synced | Drifted | Missing |
|----------|-------|------|--------|---------|---------|
| Colors | 16 | 14 | 12 | 2 | 2 |
| Typography | 4 | 4 | 3 | 1 | 0 |
| Spacing | 8 | 10 | 8 | 0 | 0 |
| Components | 3 | 5 | 2 | 1 | 0 |

## Color Drift

### Mismatches
| Token | Figma | Code | Delta |
|-------|-------|------|-------|
| Brand/Primary | #2F49D8 | #2563eb | Different hue |

### Missing in Code
| Token | Figma Value | Suggested CSS |
|-------|-------------|---------------|
| Brand/Accent | #F59E0B | `--color-brand-accent: #F59E0B;` |

## Typography Drift
[similar table]

## Spacing Drift
[similar table]

## Component Drift
[similar table]

## Recommended Patches

### Option A: Update Code to Match Figma (Design is source of truth)
```css
/* Add these to your CSS */
--color-brand-primary: #2F49D8; /* was #2563eb */
--color-brand-accent: #F59E0B; /* new */
```

### Option B: Update Figma to Match Code (Code is source of truth)
```
Update Figma style "Brand/Primary" from #2F49D8 → #2563eb
```
```

### 6. Optional: Apply Patches

If the user wants to fix drift:

#### Patch Code (Figma → Code)
- Generate CSS variable updates
- Generate Tailwind config patches
- Generate token file updates

#### Patch Figma (Code → Figma)
```javascript
// Update Figma paint style to match code
figma_execute: `
  const styles = await figma.getLocalPaintStylesAsync();
  const style = styles.find(s => s.name === 'Brand/Primary');
  if (style) {
    const paints = [...style.paints];
    paints[0] = { type: 'SOLID', color: { r: 0.146, g: 0.388, b: 0.922 } };
    style.paints = paints;
  }
  return 'Updated';
`
```

## Notes

- **Naming conventions matter** — the sync relies on mapping Figma style names to code variable names. Document the naming convention in the report.
- **Tolerance** — color comparisons use a delta threshold (hex values within ±2 per channel are considered "close enough" but flagged as "near match")
- **Direction** — always ask which is the source of truth (Figma or code) before applying patches
- **Non-destructive** — never auto-apply patches without user confirmation

## MCP Fallback

If Figma Desktop Bridge is unavailable:
- Ask the user for exported token JSON (variables, styles) from Figma
- Compare against code tokens using the provided export

If code project is unavailable:
- Ask the user to paste their CSS custom properties or Tailwind config
- Compare against Figma tokens from the provided input

## What's Next

After a sync check:
- `/design-handoff` — regenerate handoff docs if drift was found and fixed
- `/design-system` — update code tokens to match Figma (if Figma is source of truth)
- `/figma-create` — update Figma styles to match code (if code is source of truth)
- `/design-review` — audit the code implementation for quality

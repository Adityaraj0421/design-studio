---
description: "Generate a developer handoff document from a Figma file — spacing specs, token maps, component APIs, and production-ready code snippets."
argument-hint: "[Figma URL or 'current file']"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "mcp__*"]
---

# /design-handoff

You are generating a **developer handoff document** from a Figma file. This bridges the gap between design and engineering by extracting everything a developer needs to implement the design accurately.

Input: **$ARGUMENTS**

## Process

### 1. Connect & Identify Target

```
figma_get_status → verify connection
figma_get_file_data(depth: 1, verbosity: 'summary') → get file overview
```

If the user provided a Figma URL, parse the file key and node ID. If they said "current file", use the active file. If not connected, guide Desktop Bridge setup.

Identify which screens/pages to generate handoff for. If unspecified, generate for all hi-fi screens.

### 2. Extract Design System Foundations

#### Color Tokens

```javascript
figma_execute: `
  const paintStyles = (await figma.getLocalPaintStylesAsync()).map(s => {
    const paint = s.paints[0];
    let hex = '';
    if (paint?.type === 'SOLID') {
      const c = paint.color;
      hex = '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
    }
    return { name: s.name, hex, opacity: paint?.opacity ?? 1 };
  });
  return paintStyles;
`
```

Map each token to CSS custom property format:
```css
--color-primary: #2f49d8;
--color-primary-light: #eef1fb;
--color-background: #fffcf7;
--color-surface: #ffffff;
--color-text-primary: #0a1020;
```

#### Typography Scale

```javascript
figma_execute: `
  const textStyles = (await figma.getLocalTextStylesAsync()).map(s => ({
    name: s.name,
    fontFamily: s.fontName.family,
    fontWeight: s.fontName.style,
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
    letterSpacing: s.letterSpacing
  }));
  return textStyles;
`
```

Map to CSS/Tailwind:
```css
/* Heading/L */
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;
font-size: 24px;
line-height: 32px;
```

### 3. Extract Component Specifications

For each component set in the file:

```javascript
figma_execute: `
  await figma.loadAllPagesAsync();
  const sets = figma.root.findAllWithCriteria({ types: ['COMPONENT_SET'] });
  return sets.map(cs => ({
    name: cs.name,
    id: cs.id,
    variants: cs.children.map(v => ({
      name: v.name,
      width: v.width,
      height: v.height,
      padding: { top: v.paddingTop, right: v.paddingRight, bottom: v.paddingBottom, left: v.paddingLeft },
      itemSpacing: v.itemSpacing,
      cornerRadius: v.cornerRadius,
      layoutMode: v.layoutMode
    }))
  }));
`
```

For each component, document:
- **Props/Variants**: What properties control which states
- **Dimensions**: Width, height, padding, spacing, border radius
- **Responsive behavior**: Fixed vs. fill vs. hug sizing
- **Interactive states**: Default, hover, active, disabled, focus

Take a screenshot of each component set:
```
figma_get_component_image(nodeId) → visual reference
```

### 4. Extract Screen Layouts

For each target screen:

```javascript
figma_execute: `
  const frame = await figma.getNodeByIdAsync('FRAME_ID');
  // Get direct children structure
  const layout = frame.children.map(c => ({
    name: c.name,
    type: c.type,
    x: c.x, y: c.y,
    width: c.width, height: c.height,
    layoutMode: c.layoutMode,
    itemSpacing: c.itemSpacing,
    padding: { top: c.paddingTop, right: c.paddingRight, bottom: c.paddingBottom, left: c.paddingLeft },
    fills: c.fills?.filter(f => f.type === 'SOLID').map(f => {
      const c2 = f.color;
      return '#' + [c2.r, c2.g, c2.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
    })
  }));
  return { name: frame.name, width: frame.width, height: frame.height, children: layout };
`
```

Take a full screenshot:
```
figma_capture_screenshot(frameNodeId) → visual reference
```

### 5. Extract Spacing & Layout Metrics

Document the spacing system used across screens:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Icon padding, tight gaps |
| `--space-sm` | 8px | Inline element spacing |
| `--space-md` | 16px | Component internal padding |
| `--space-lg` | 24px | Section padding |
| `--space-xl` | 32px | Section separation |
| `--space-2xl` | 48px | Page-level spacing |

### 6. Generate Handoff Document

Write a structured markdown document. Use this format:

```markdown
# Design Handoff: [Project Name]

Generated from Figma file: [file name]
Date: [date]

---

## 1. Design Tokens

### Colors
| Token | Hex | Usage |
|-------|-----|-------|

### Typography
| Style | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|

### Spacing
| Token | Value | Usage |
|-------|-------|-------|

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|

---

## 2. Components

### [Component Name]
**Variants:** Default, Hover, Disabled
**Props:**
| Prop | Type | Default | Options |
|------|------|---------|---------|

**Dimensions:**
- Width: [fixed/fill]
- Height: [value]
- Padding: [top right bottom left]
- Border radius: [value]

**CSS/Tailwind:**
```css
.component-name {
  /* token-backed styles */
}
```

[Screenshot]

---

## 3. Screen Layouts

### [Screen Name]
**Dimensions:** [width × height]
**Layout:** [vertical auto-layout, spacing]

[Annotated screenshot]

**Section breakdown:**
| Section | Position | Dimensions | Notes |
|---------|----------|------------|-------|

---

## 4. Interactive States

| Element | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|

---

## 5. Responsive Notes

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Desktop | 1440px | Full layout |
| Tablet | 768px | [changes] |
| Mobile | 375px | [changes] |

---

## 6. Assets

| Asset | Format | Location |
|-------|--------|----------|
```

### 7. Output Options

Based on user preference, generate the handoff as:

| Format | How |
|--------|-----|
| **Markdown file** | Write to `./design-handoff.md` in the project |
| **HTML page** | Create a styled, browsable handoff page with embedded screenshots |
| **Tailwind config** | Generate `tailwind.config.js` extension with design tokens |
| **CSS variables** | Generate `:root { --token: value }` stylesheet |
| **TypeScript types** | Generate typed token definitions |

If the user doesn't specify, default to **Markdown + CSS variables** as the most universally useful combination.

### 8. Validate

- Cross-check that every color used in screens has a matching token
- Flag any hardcoded values that don't map to a token (potential inconsistencies)
- Verify component measurements match between Figma and the documented specs
- Highlight any elements that appear to use non-standard spacing

## Notes

- Use `figma_get_design_system_kit` for comprehensive extraction when available
- Use `figma_get_component_for_development` for implementation-ready component data
- Always include visual references (screenshots) alongside measurements
- Token names should follow the pattern used in the Figma file's style naming
- If the design system has variables with modes (Light/Dark), document both modes

## MCP Fallback

If Figma Desktop Bridge is unavailable:
- Ask the user for screenshots of screens and exported token data (styles, variables)
- Generate handoff documentation from the provided materials
- Output CSS variables, spacing specs, and component tables from available info

## What's Next

After generating handoff docs:
- `/figma-sync` — monitor design-code drift over time
- `/component-docs` — generate detailed component API documentation
- `/figma` — implement the design in code using the handoff specs
- `/design-system` — extract reusable tokens for the codebase

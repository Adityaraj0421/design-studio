---
description: "Generate mobile and tablet variants from a desktop Figma wireframe — adapts layout, reflowing content for smaller breakpoints."
argument-hint: "[frame name or node ID] [breakpoints: mobile, tablet, or both]"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "mcp__*"]
---

# /figma-responsive

You are generating **responsive breakpoint variants** from an existing desktop Figma frame. This takes a 1440px (or similar) desktop design and creates mobile (375×812) and/or tablet (768×1024) adaptations directly in Figma.

Input: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/design/references/figma-creation.md` for the Figma API patterns and `${CLAUDE_PLUGIN_ROOT}/skills/design/references/ui-designer.md` for responsive design principles.

## Process

### 1. Connect & Identify Source Frame

```
figma_get_status → verify Desktop Bridge connection
```

Find the source desktop frame:
- If user gave a node ID: `figma.getNodeByIdAsync(id)`
- If user gave a frame name: search for it
- If neither: ask which frame to adapt

```javascript
figma_execute: `
  const frame = await figma.getNodeByIdAsync('SOURCE_ID');
  return {
    name: frame.name,
    width: frame.width,
    height: frame.height,
    layoutMode: frame.layoutMode,
    childCount: frame.children.length,
    children: frame.children.map(c => ({
      name: c.name,
      type: c.type,
      width: c.width,
      height: c.height,
      layoutMode: c.layoutMode,
      layoutSizingH: c.layoutSizingHorizontal,
      layoutSizingV: c.layoutSizingVertical
    }))
  };
`
```

Screenshot the source for reference:
```
figma_capture_screenshot(sourceFrameId) → desktop reference
```

### 2. Analyze Layout Structure

Map the source frame's layout hierarchy to understand what needs to adapt:

```javascript
figma_execute: `
  async function mapLayout(node, depth = 0) {
    const info = {
      name: node.name,
      type: node.type,
      layout: node.layoutMode || 'NONE',
      sizing: { h: node.layoutSizingHorizontal, v: node.layoutSizingVertical },
      dimensions: { w: Math.round(node.width), h: Math.round(node.height) },
      spacing: node.itemSpacing,
      padding: node.paddingLeft ? { l: node.paddingLeft, r: node.paddingRight, t: node.paddingTop, b: node.paddingBottom } : null,
      childCount: node.children?.length || 0,
      children: []
    };
    if ('children' in node && depth < 3) {
      for (const child of node.children) {
        info.children.push(await mapLayout(child, depth + 1));
      }
    }
    return info;
  }
  const source = await figma.getNodeByIdAsync('SOURCE_ID');
  return await mapLayout(source);
`
```

### 3. Plan Responsive Adaptations

Based on the layout analysis, plan how each section adapts:

#### Common Responsive Patterns

| Desktop Pattern | Mobile Adaptation | Tablet Adaptation |
|----------------|-------------------|-------------------|
| **Multi-column grid** (3-col) | Single column, stacked | 2-column grid |
| **Sidebar + content** | Sidebar collapses to top tabs or hidden | Narrower sidebar or collapsible |
| **Horizontal nav** | Hamburger menu or bottom tab bar | Horizontal nav (may truncate) |
| **Large hero text** | Scale down 60-70% | Scale down 80-85% |
| **Card grid** (3-col, 440px) | Single card, full width | 2-col grid |
| **Side-by-side panels** | Stacked vertically | Stacked or 60/40 split |
| **Fixed-width elements** | Switch to FILL container | Keep fixed or switch to FILL |
| **Horizontal filter row** | Wrap or horizontal scroll | Wrap to 2 rows |
| **Action button row** | Stack vertically or full-width | Keep horizontal |

State the adaptation plan before building.

### 4. Define Breakpoints

| Breakpoint | Frame Size | Name Suffix |
|------------|-----------|-------------|
| Desktop (source) | 1440×900 | (already exists) |
| Tablet | 768×1024 | `[name] / Tablet` |
| Mobile | 375×812 | `[name] / Mobile` |

### 5. Build Tablet Variant (768×1024)

```javascript
figma_execute: `
  const source = await figma.getNodeByIdAsync('SOURCE_ID');
  const parent = source.parent;

  // Clone the desktop frame
  const tablet = source.clone();
  tablet.name = source.name.replace(/\s*\/?\s*$/, '') + ' / Tablet';

  // Position next to source
  tablet.x = source.x + source.width + 80;
  tablet.y = source.y;

  // Resize to tablet
  tablet.resize(768, 1024);

  return { id: tablet.id, name: tablet.name, width: tablet.width, height: tablet.height };
`
```

Then adapt the layout:
- Reduce multi-column grids from 3→2 columns
- Shrink sidebar widths (e.g., 400→280px)
- Reduce horizontal padding (40→24px)
- Scale down spacing proportionally
- Adjust font sizes for heading levels if needed
- Switch FIXED-width children to FILL where appropriate

Validate with screenshot after each major change.

### 6. Build Mobile Variant (375×812)

```javascript
figma_execute: `
  const source = await figma.getNodeByIdAsync('SOURCE_ID');

  // Clone
  const mobile = source.clone();
  mobile.name = source.name.replace(/\s*\/?\s*$/, '') + ' / Mobile';

  // Position next to tablet (or source if no tablet)
  mobile.x = source.x + source.width + 80 + 768 + 80;
  mobile.y = source.y;

  // Resize to mobile
  mobile.resize(375, 812);

  return { id: mobile.id, name: mobile.name, width: mobile.width, height: mobile.height };
`
```

Mobile-specific adaptations:
- **All grids → single column** (stack vertically)
- **Sidebar → collapsed** (hidden or moved to top as tabs/accordion)
- **Navigation → simplified** (hamburger, bottom bar, or simplified header)
- **Padding → 16px** (standard mobile padding)
- **Font scale down**: Heading/L 24→20px, Heading/S 16→14px, Body stays 14px
- **Cards → full width** (`layoutSizingHorizontal = 'FILL'`)
- **Buttons → full width** (touch-friendly, 48px min height)
- **Remove or stack horizontal layouts** that don't fit 375px
- **Truncate long text** where needed

### 7. Responsive-Specific Element Handling

#### Navigation
```javascript
// Desktop: full nav bar
// Mobile: simplified — keep logo + hamburger icon placeholder
figma_execute: `
  const nav = mobileFrame.findOne(n => n.name === 'Navigation' || n.name === 'Header');
  if (nav) {
    // Hide items that don't fit, add hamburger placeholder
    nav.resize(375, 56);
    nav.layoutMode = 'HORIZONTAL';
    nav.primaryAxisAlignItems = 'SPACE_BETWEEN';
    nav.paddingLeft = 16;
    nav.paddingRight = 16;
    // Hide mid-nav items on mobile (keep first item like logo and last item like menu icon)
    // Adjust this heuristic to match your layer names if needed
    const navChildren = [...nav.children];
    for (let i = 1; i < navChildren.length - 1; i++) {
      navChildren[i].visible = false;
    }
  }
`
```

#### Card Grids
```javascript
// Desktop: 3-col WRAP → Mobile: single column
figma_execute: `
  const cardContainer = mobileFrame.findOne(n => n.name.includes('Card'));
  if (cardContainer && cardContainer.layoutWrap === 'WRAP') {
    // Switch to vertical stack
    cardContainer.layoutMode = 'VERTICAL';
    cardContainer.layoutWrap = 'NO_WRAP';
    // Cards fill full width
    for (const card of cardContainer.children) {
      card.layoutSizingHorizontal = 'FILL';
    }
  }
`
```

#### Action Buttons
```javascript
// Desktop: horizontal row → Mobile: full-width stacked
figma_execute: `
  const buttonRow = mobileFrame.findOne(n => n.name.includes('Actions') || n.name.includes('Button'));
  if (buttonRow && buttonRow.layoutMode === 'HORIZONTAL') {
    buttonRow.layoutMode = 'VERTICAL';
    buttonRow.itemSpacing = 8;
    for (const btn of buttonRow.children) {
      btn.layoutSizingHorizontal = 'FILL';
      btn.resize(btn.width, Math.max(btn.height, 48)); // min touch target
    }
  }
`
```

### 8. Label & Organize

Add breakpoint labels above each variant:

```javascript
figma_execute: `
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  const label = figma.createText();
  label.characters = 'Tablet — 768×1024';
  label.fontSize = 14;
  label.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }];
  label.x = tabletFrame.x;
  label.y = tabletFrame.y - 28;
  tabletFrame.parent.appendChild(label);
`
```

### 9. Validate All Variants

Take screenshots of all three breakpoints side by side:

```
figma_capture_screenshot(desktopId)  → verify original intact
figma_capture_screenshot(tabletId)   → check tablet layout
figma_capture_screenshot(mobileId)   → check mobile layout
```

Check for:
- [ ] No overflowing content
- [ ] Text is readable (min 14px body, 12px caption)
- [ ] Touch targets are 48px minimum (mobile)
- [ ] Padding is consistent within each breakpoint
- [ ] Visual hierarchy preserved across breakpoints
- [ ] No elements clipped or hidden unintentionally
- [ ] Buttons are finger-friendly on mobile (full width or large enough)

### 10. Report

Summarize what was created:

```markdown
## Responsive Variants Generated

| Breakpoint | Frame | Size | Key Changes |
|------------|-------|------|-------------|
| Desktop | [name] | 1440×900 | Original (unchanged) |
| Tablet | [name] / Tablet | 768×1024 | [list changes] |
| Mobile | [name] / Mobile | 375×812 | [list changes] |

### Adaptation Summary
- Grid: 3-col → 2-col (tablet) → 1-col (mobile)
- Sidebar: [what happened]
- Navigation: [what happened]
- Typography: [scale adjustments]
```

## Notes

- **Clone first, modify after** — never modify the source desktop frame
- **Auto-layout is your friend** — frames with auto-layout reflow naturally when resized; manual-layout frames need more work
- **FILL in WRAP caveat** — if desktop uses `layoutWrap: 'WRAP'`, mobile should switch to `layoutWrap: 'NO_WRAP'` with VERTICAL stacking to avoid the FILL-in-WRAP collapse issue
- **Font loading** — always `await figma.loadFontAsync()` before any text property changes
- **Iteration budget** — max 3 fix iterations per breakpoint, then report remaining issues
- **Design system consistency** — use the same token-linked styles on responsive variants (don't break style references)

## MCP Fallback

If Figma Desktop Bridge is unavailable:
- Output the responsive adaptation plan as a markdown spec
- Include layout changes per breakpoint (desktop, tablet, mobile) with specific dimensions, stacking rules, and typography adjustments

## What's Next

After generating responsive variants:
- `/figma-prototype` — add prototype connections between breakpoint variants
- `/ux-audit` — audit all breakpoints against the design brief
- `/design-handoff` — generate handoff docs including responsive specs
- `/figma` — implement the responsive design in code

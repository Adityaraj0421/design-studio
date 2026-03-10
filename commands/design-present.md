---
description: "Generate an interactive HTML presentation from Figma screens — annotated walkthrough with transitions, speaker notes, and keyboard navigation."
argument-hint: "[Figma URL or 'current file'] [presentation style: walkthrough, pitch, case-study]"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "mcp__*"]
---

# /design-present

You are generating an **interactive HTML presentation** from Figma designs. This creates a self-contained, deployable presentation for stakeholder reviews, design critiques, or case study walkthroughs.

Input: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/design/references/ui-designer.md` for visual design principles and `${CLAUDE_PLUGIN_ROOT}/skills/design/references/motion-designer.md` for animation guidance.

## Process

### 1. Connect & Extract Screens

```
figma_get_status → verify connection
```

Get the file structure to identify presentable screens:
```javascript
figma_execute: `
  await figma.loadAllPagesAsync();
  const pages = figma.root.children.map(p => ({
    name: p.name,
    frames: p.children
      .filter(c => c.type === 'FRAME' || c.type === 'SECTION')
      .map(f => ({
        id: f.id,
        name: f.name,
        width: Math.round(f.width),
        height: Math.round(f.height),
        childCount: f.children?.length || 0
      }))
  }));
  return pages;
`
```

### 2. Determine Presentation Structure

Based on the Figma file structure and user intent, plan the slide deck:

**Presentation Types:**

| Type | Structure | Best For |
|------|-----------|----------|
| **Walkthrough** | Screen-by-screen with annotations, flow arrows | Design review, team feedback |
| **Pitch** | Problem → Solution → Features → Impact | Stakeholder buy-in, client presentations |
| **Case Study** | Challenge → Process → Solution → Results | Portfolio, design challenges |

Default to **walkthrough** if not specified.

### 3. Capture Screenshots

For each screen to present:
```
figma_capture_screenshot(frameId) → save as slide image
```

Or use REST API for cloud-state images:
```
figma_get_component_image(nodeId, format='png', scale=2)
```

### 4. Extract Design Metadata

For each screen, extract contextual information:

```javascript
figma_execute: `
  const frame = await figma.getNodeByIdAsync('FRAME_ID');
  const texts = frame.findAllWithCriteria({ types: ['TEXT'] });
  const headings = texts
    .filter(t => t.fontSize >= 20)
    .map(t => ({ text: t.characters, size: t.fontSize }))
    .sort((a, b) => b.size - a.size);

  const colors = new Set();
  function collectColors(node) {
    if (node.fills?.length && node.fills[0]?.type === 'SOLID') {
      const c = node.fills[0].color;
      colors.add('#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join(''));
    }
    if ('children' in node) node.children.forEach(collectColors);
  }
  collectColors(frame);

  return {
    name: frame.name,
    dimensions: { w: Math.round(frame.width), h: Math.round(frame.height) },
    headings: headings.slice(0, 3),
    colorPalette: [...colors].slice(0, 8),
    componentCount: frame.findAllWithCriteria({ types: ['INSTANCE'] }).length,
    textNodeCount: texts.length
  };
`
```

### 5. Build HTML Presentation

Generate a single-file HTML presentation with:

#### Slide Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Project Name] — Design Presentation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Slide transitions */
    .slide { opacity: 0; transform: translateX(40px); transition: all 0.5s ease; }
    .slide.active { opacity: 1; transform: translateX(0); }
    .slide.prev { opacity: 0; transform: translateX(-40px); }

    /* Presenter controls */
    .progress-bar { transition: width 0.3s ease; }
    .slide-counter { font-variant-numeric: tabular-nums; }
  </style>
</head>
```

#### Features to Include
- **Keyboard navigation**: Left/Right arrows, Space, Escape
- **Progress bar**: Shows position in deck
- **Slide counter**: "3 / 12"
- **Speaker notes panel**: Toggle with 'N' key
- **Annotations overlay**: Toggle with 'A' key — highlight design decisions
- **Zoom mode**: Click image to zoom, click again to dismiss
- **Dark/light mode**: Toggle presentation background
- **Fullscreen**: F11 or button

#### Slide Types

**Title Slide**
```
Project name, subtitle, date, team
Dark gradient background with accent color from design
```

**Screen Slide**
```
Screenshot (centered, max 80vh)
Screen name as heading
2-3 annotation callouts pointing to key decisions
Optional speaker notes below
```

**Comparison Slide**
```
Before/After or two variants side by side
Labels and change description
```

**Flow Slide**
```
Multiple screens connected by arrows
Step numbers and flow description
```

**Spec Slide**
```
Design token summary — colors, typography, spacing
Visual swatches with values
```

**Summary Slide**
```
Key decisions recap
Next steps
```

### 6. Add Annotations

For each screen slide, generate 2-4 annotation callouts that highlight:
- Key design decisions ("Used 8px grid throughout")
- UX rationale ("Progressive disclosure — details on demand")
- Technical notes ("Component uses auto-layout for responsiveness")
- Accessibility wins ("4.5:1 contrast ratio on all body text")

Annotations use numbered badges that correspond to notes below the image.

### 7. Preview & Validate

Use the preview server to verify the presentation:

```
preview_start → launch dev server
preview_screenshot → capture the result
preview_snapshot → verify slide structure and navigation
```

Test:
- [ ] All slides render correctly
- [ ] Keyboard navigation works (← → Space)
- [ ] Images load and display at correct size
- [ ] Progress bar updates
- [ ] Annotations toggle on/off
- [ ] Mobile responsive (slides scale down)

### 8. Output

Deliver the presentation as a single HTML file:

```
./[project-name]-presentation.html
```

Also offer:
- **Deploy to Firebase** if the user wants a shareable URL
- **Export as PDF** via browser print (Ctrl+P → Save as PDF)

## Presentation Design Principles

1. **One idea per slide** — don't crowd multiple concepts
2. **Show, don't tell** — screenshots > bullet points
3. **Consistent pacing** — similar slide duration expectations
4. **Clear hierarchy** — heading > subheading > body > caption per slide
5. **Purposeful animation** — transitions guide attention, not distract
6. **Accessible** — keyboard navigable, sufficient contrast, screen reader friendly

## Notes

- Images are embedded as base64 data URIs for single-file portability
- If images are too large (>5MB total), use external URLs from Figma REST API instead
- Speaker notes are hidden by default, shown only in presenter view
- The presentation adapts to the dominant color palette from the Figma file

## MCP Fallback

If Figma Desktop Bridge is unavailable:
- Ask the user for screenshots of the screens to present
- Build the HTML presentation from provided images and user-described annotations

If Preview server is unavailable:
- Write the presentation HTML file to disk for manual browser viewing

## What's Next

After creating a presentation:
- `/design-review` — audit the presentation for accessibility and quality
- `/design` — build any additional screens or components discussed during review
- `/figma-create` — update Figma designs based on stakeholder feedback
